import os
from supabase import create_client
from dotenv import load_dotenv
from datetime import date
from funcoes_cod import *
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
    
#salvando dados dos clientes
def guardar_dados(email, telefone):
    response = supabase.table("dados_clientes") \
        .select("id") \
        .eq("telefone", telefone) \
        .limit(1) \
        .execute()
    if response.data:
        return False
    supabase.table("dados_clientes").insert({
        "email": email,
        "telefone": telefone
    }).execute()

    remover_expirados()
    return True


def pedir_suporte_princesa(email, telefone, mensagem):
    supabase.table("suporte_princesa").insert({
        "email": email,
        "telefone": telefone,
        "mensagem": mensagem
    }).execute()


def email_existe(email):
    response = supabase.table("emails") \
        .select("id") \
        .eq("email", email) \
        .limit(1) \
        .execute()

    if response.data:
        return True
    else:
        return False


#verifica de o cliente está bloqueado antes de liberar o código
def buscar_bloqueados(telefone: str) -> bool:
    res = (
        supabase
        .table("bloqueados")
        .select("telefone")
        .eq("telefone", telefone)
        .limit(1)
        .execute()
    )

    if res.data and len(res.data) > 0:
        return False
    else:
        return True