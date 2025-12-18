import os
from supabase import create_client
from dotenv import load_dotenv
from datetime import date
#conectando a poha toda
load_dotenv()
url = os.getenv("URL_SUPABASE")
key = os.getenv("KEY_SUPABASE")
supabase = create_client(url, key)

#removendo expirados
def remover_expirados():
    hoje = date.today().isoformat()
    supabase.table("emails") \
        .delete() \
        .lte("validade", hoje) \
        .execute()
    
#inserindo email e data
def inserir_email_validade(email, validade):
    supabase.table("emails").insert({
        "email": email,
        "validade": validade
    }).execute()
    remover_expirados()
    print('inserido com sucesso')


#adiciona o cliente a lista de bloqueados
def adicionar_bloqueado(telefone):
    supabase.table("bloqueados").insert({
        "telefone": telefone
    }).execute()
    remover_expirados()


def buscar_pedidos_suporte():
    response = supabase.table("suporte_princesa") \
        .select("email, telefone, mensagem, created_at") \
        .order("created_at", desc=True) \
        .execute()

    if not response.data:
        return []

    pedidos = []

    for item in response.data:
        pedidos.append({
            "email": item.get("email"),
            "telefone": item.get("telefone"),
            "mensagem": item.get("mensagem"),
            "horario": item.get("created_at")
        })

    return pedidos


def buscar_todos_dados():
    response = supabase.table("dados_clientes").select("*").execute()
    if not response.data:
        return []

    return [
        {
            "email": item.get("email"),
            "telefone": item.get("telefone"),
            "criado_em": item.get("created_at")
        }
        for item in response.data
    ]