from banco_painel import *
from banco_site import *
from funcoes_cod import *
from flask import Flask, render_template, request, jsonify, session
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    print("\n" + "="*50)
    print("🔔 NOVA REQUISIÇÃO RECEBIDA!")
    print("="*50)
    
    try:
        # Tentar pegar dados como JSON primeiro, depois como form
        if request.is_json:
            data = request.get_json()
            plataforma = data.get('plataforma')
            email = data.get('email')
            telefone = data.get('telefone')
            print("📦 Dados recebidos via JSON")
        else:
            plataforma = request.form.get('plataforma')
            email = request.form.get('email')
            telefone = request.form.get('telefone')
            print("📦 Dados recebidos via FORM")
        
        # DEBUG: Mostrar dados recebidos
        print(f"\n📱 PLATAFORMA: {plataforma}")
        print(f"📧 EMAIL: {email}")
        print(f"📞 TELEFONE: {telefone}")
        print("-"*50)
        
        # Validar dados obrigatórios
        if not plataforma or not email or not telefone:
            print("❌ ERRO: Campos obrigatórios não preenchidos!")
            return jsonify({
                'success': False, 
                'message': 'Preencha todos os campos obrigatórios.'
            }), 400
        
        # Armazenar dados na sessão
        session['plataforma'] = plataforma
        session['email'] = email
        session['telefone'] = telefone
        
        # Verificar se usuário está bloqueado
        print(f"\n🔍 Verificando se telefone {telefone} está bloqueado...")
        usuario_liberado = buscar_bloqueados(telefone)
        print(f"✅ Usuário liberado: {usuario_liberado}")
        
        if not usuario_liberado:
            print("🚫 USUÁRIO BLOQUEADO!")
            return jsonify({
                'success': False,
                'message': 'Usuário bloqueado no sistema.'
            }), 403
        
        # Guardar dados do cliente
        print(f"\n💾 Guardando dados do cliente...")
        guardar_dados(email, telefone)
        print("✅ Dados guardados!")
        
        # Verificar se email existe no sistema
        print(f"\n🔍 Verificando se email {email} existe...")
        email_cadastrado = email_existe(email)
        print(f"✅ Email existe: {email_cadastrado}")
        
        if not email_cadastrado:
            print("❌ EMAIL NÃO CADASTRADO!")
            return jsonify({
                'success': False,
                'message': 'Este email não está cadastrado no sistema.'
            }), 404
        
        # Buscar código baseado na plataforma
        print(f"\n🔑 Buscando código para plataforma: {plataforma}")
        codigo = None
        
        if plataforma == 'max':
            print("📺 Executando: extrair_codigo_hbomax()")
            codigo = extrair_codigo_hbomax(email)
        elif plataforma == 'disneyplus':
            print("🏰 Executando: pegar_codigo_email_disney()")
            codigo = pegar_codigo_email_disney(email)
        elif plataforma == 'globoplay':
            print("📺 Executando: pegar_codigo_globoplay()")
            codigo = pegar_codigo_globoplay(email)
        elif plataforma == 'globo_atualizar':
            print("executando: atualizar_codigo_globo()")
            codigo = codigo_atualiza_globo(email)
        else:
            print(f"❌ PLATAFORMA INVÁLIDA: {plataforma}")
            return jsonify({
                'success': False,
                'message': 'Plataforma inválida.'
            }), 400
        
        print(f"\n🎯 CÓDIGO ENCONTRADO: {codigo}")
        print("="*50 + "\n")
        
        # Retornar resultado
        if codigo and codigo != "❌ Código não encontrado.":
            return jsonify({
                'success': True,
                'message': 'Código encontrado!',
                'codigo': codigo
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Código não encontrado. Solicite um novo código na plataforma e tente novamente.'
            }), 404
            
    except Exception as e:
        print(f"\n💥 ERRO EXCEPTION: {e}")
        print("="*50 + "\n")
        return jsonify({
            'success': False,
            'message': 'Erro interno do servidor. Tente novamente.'
        }), 500

if __name__ == '__main__':
    print("\n🚀 Servidor iniciado!")
    print("📍 Acesse: http://127.0.0.1:5000\n")
    app.run(debug=True)
