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
        # O frontend envia JSON
        if request.is_json:
            data = request.get_json()
            plataforma = data.get('plataforma')
            email = data.get('email')
            telefone = data.get('telefone')
        else:
            plataforma = request.form.get('platform') or request.form.get('plataforma')
            email = request.form.get('email')
            telefone = request.form.get('phone') or request.form.get('telefone')
        
        # DEBUG: Mostrar dados recebidos
        print(f"\n📱 PLATAFORMA: {plataforma}")
        print(f"📧 EMAIL: {email}")
        print(f"📞 TELEFONE: {telefone}")
        print("-"*50)
        
        # Validar dados obrigatórios
        if not plataforma or not email or not telefone:
            return jsonify({
                'success': False, 
                'message': 'Preencha todos os campos obrigatórios.'
            }), 400
        
        # Armazenar dados na sessão
        session['plataforma'] = plataforma
        session['email'] = email
        session['telefone'] = telefone
        
        # Verificar se usuário está bloqueado
        usuario_liberado = buscar_bloqueados(telefone)
        if not usuario_liberado:
            return jsonify({
                'success': False,
                'message': 'Usuário bloqueado no sistema.'
            }), 403
        
        # Guardar dados do cliente
        guardar_dados(email, telefone)
        
        # Verificar se email existe no sistema
        if not email_existe(email):
            return jsonify({
                'success': False,
                'message': 'Este email não está cadastrado no sistema.'
            }), 404
        
        # Buscar código baseado na plataforma
        codigo = None
        if plataforma == 'max':
            codigo = extrair_codigo_hbomax(email)
        elif plataforma == 'disneyplus':
            codigo = pegar_codigo_email_disney(email)
        elif plataforma == 'globoplay':
            codigo = pegar_codigo_globoplay(email)
        elif plataforma == 'globo_atualizar':
            codigo = codigo_atualiza_globo(email)
        else:
            return jsonify({
                'success': False,
                'message': 'Plataforma inválida.'
            }), 400
        
        print(f"\n🎯 CÓDIGO ENCONTRADO: {codigo}")
        
        # Retornar resultado
        # Se o código for None ou contiver o emoji de erro, tratamos como falha
        if codigo and "❌" not in str(codigo):
            return jsonify({
                'success': True,
                'message': 'Código encontrado!',
                'codigo': codigo
            })
        else:
            # Se a função retornou uma mensagem de erro com ❌, usamos ela, senão uma padrão
            msg_erro = str(codigo) if (codigo and "❌" in str(codigo)) else 'Código não encontrado. Solicite um novo código na plataforma e tente novamente.'
            return jsonify({
                'success': False,
                'message': msg_erro
            }), 404
            
    except Exception as e:
        print(f"\n💥 ERRO EXCEPTION: {e}")
        return jsonify({
            'success': False,
            'message': f'Erro interno: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
