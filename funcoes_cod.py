import re
import imaplib
import email
from email.header import decode_header
from email.utils import parseaddr

def pegar_codigo_email_disney(email_input):
    EMAIL = "princesinhabot02@gmail.com"
    SENHA_APP = "gleygskpiqpvzxpi"

    imap = imaplib.IMAP4_SSL("imap.gmail.com")
    imap.login(EMAIL, SENHA_APP)
    imap.select("INBOX", readonly=True)

    status, data = imap.status("INBOX", "(MESSAGES)")
    total = int(data[0].split()[2].strip(b")"))

    for num in range(total, max(total - 5, 0), -1):
        status, msg_data = imap.fetch(str(num), "(RFC822)")
        if status != "OK":
            continue

        msg = email.message_from_bytes(msg_data[0][1])

        remetente = msg.get("From", "Não informado")
        destinatario = msg.get("Delivered-To") or msg.get("To") or "Não informado"

        assunto, encoding = decode_header(msg.get("Subject"))[0]
        if isinstance(assunto, bytes):
            assunto = assunto.decode(encoding or "utf-8", errors="ignore")

        html = None
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/html":
                    html = part.get_payload(decode=True).decode(errors="ignore")
                    break
        else:
            if msg.get_content_type() == "text/html":
                html = msg.get_payload(decode=True).decode(errors="ignore")

        if html and "Seu código de acesso único" in html and destinatario == email_input:
            match = re.search(r"<td[^>]*>\s*(\d{6})\s*</td>", html, re.DOTALL)
            if match:
                codigo = match.group(1)
                imap.logout()
                return codigo

    return None


def pegar_codigo_globoplay(email_input):
    EMAIL = "princesinhabot02@gmail.com"
    SENHA_APP = "gleygskpiqpvzxpi"

    imap = imaplib.IMAP4_SSL("imap.gmail.com")
    imap.login(EMAIL, SENHA_APP)
    imap.select("INBOX", readonly=True)

    status, data = imap.status("INBOX", "(MESSAGES)")
    total = int(data[0].split()[2].strip(b")"))

    for num in range(total, max(total - 5, 0), -1):
        status, msg_data = imap.fetch(str(num), "(RFC822)")
        if status != "OK":
            continue

        msg = email.message_from_bytes(msg_data[0][1])

        destinatario = msg.get("Delivered-To") or msg.get("To") or "Não informado"

        assunto, encoding = decode_header(msg.get("Subject"))[0]
        if isinstance(assunto, bytes):
            assunto = assunto.decode(encoding or "utf-8", errors="ignore")

        html = None

        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/html":
                    html = part.get_payload(decode=True).decode(errors="ignore")
                    break
        else:
            if msg.get_content_type() == "text/html":
                html = msg.get_payload(decode=True).decode(errors="ignore")

        if html and "Seu código para acessar a Conta Globo" in assunto and destinatario == email_input:
            match = re.search(
                r"<div[^>]*>\s*(\d{6})\s*</div>",
                html,
                re.DOTALL | re.IGNORECASE
            )

            if match:
                codigo = match.group(1)
                imap.logout()
                return codigo

    imap.logout()
    return None


def extrair_codigo_hbomax(email_input):
    EMAIL = "princesinhabot02@gmail.com"
    SENHA_APP = "gleygskpiqpvzxpi"

    imap = imaplib.IMAP4_SSL("imap.gmail.com")
    imap.login(EMAIL, SENHA_APP)
    imap.select("INBOX", readonly=True)

    status, data = imap.status("INBOX", "(MESSAGES)")
    total = int(data[0].split()[2].strip(b")"))

    for num in range(total, max(total - 5, 0), -1):
        status, msg_data = imap.fetch(str(num), "(RFC822)")
        if status != "OK":
            continue

        msg = email.message_from_bytes(msg_data[0][1])

        remetente = msg.get("From", "Não informado")
        destinatario = msg.get("Delivered-To") or msg.get("To") or "Não informado"

        assunto, encoding = decode_header(msg.get("Subject"))[0]
        if isinstance(assunto, bytes):
            assunto = assunto.decode(encoding or "utf-8", errors="ignore")

        html = None

        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/html":
                    html = part.get_payload(decode=True).decode(errors="ignore")
                    break
        else:
            if msg.get_content_type() == "text/html":
                html = msg.get_payload(decode=True).decode(errors="ignore")

        if html and "no-reply@alerts.hbomax.com" in remetente and destinatario == email_input:
            match = re.search(
                r"<b>\s*(\d{6})\s*</b>",
                html,
                re.DOTALL | re.IGNORECASE
            )

            if match:
                codigo = match.group(1)
                return codigo
            else:
                return "❌ Código não encontrado."


    imap.logout()



def codigo_atualiza_globo(email_input):
    EMAIL = "princesinhabot02@gmail.com"
    SENHA_APP = "gleygskpiqpvzxpi"

    imap = imaplib.IMAP4_SSL("imap.gmail.com")
    imap.login(EMAIL, SENHA_APP)
    imap.select("INBOX", readonly=True)

    status, data = imap.status("INBOX", "(MESSAGES)")
    total = int(data[0].split()[2].strip(b")"))

    for num in range(total, max(total - 5, 0), -1):
        status, msg_data = imap.fetch(str(num), "(RFC822)")
        if status != "OK":
            continue

        msg = email.message_from_bytes(msg_data[0][1])

        remetente = msg.get("From", "Não informado")
        destinatario = msg.get("Delivered-To") or msg.get("To") or "Não informado"

        assunto, encoding = decode_header(msg.get("Subject"))[0]
        if isinstance(assunto, bytes):
            assunto = assunto.decode(encoding or "utf-8", errors="ignore")

        html = None

        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/html":
                    html = part.get_payload(decode=True).decode(errors="ignore")
                    break
        else:
            if msg.get_content_type() == "text/html":
                html = msg.get_payload(decode=True).decode(errors="ignore")

        if html and "cadastro@globo.com" in remetente and destinatario == email_input:
            # Extrair o código da div específica
            # Regex para encontrar o código de 6 dígitos na div com style específico
            match = re.search(
                r'<div[^>]*style="[^"]*text-align:center[^"]*"[^>]*>\s*(\d{6})\s*</div>',
                html,
                re.DOTALL | re.IGNORECASE
            )
            
            # Se não encontrar com o estilo completo, tenta uma busca mais simples
            if not match:
                match = re.search(
                    r'<div[^>]*>\s*(\d{6})\s*</div>',
                    html,
                    re.DOTALL | re.IGNORECASE
                )
            
            # Se ainda não encontrar, busca qualquer código de 6 dígitos entre tags
            if not match:
                match = re.search(
                    r'>\s*(\d{6})\s*<',
                    html,
                    re.DOTALL | re.IGNORECASE
                )
            
            if match:
                codigo = match.group(1)
                return codigo
            else:
                return "❌ Código não encontrado."

    imap.logout()
    return "❌ Nenhum email da Globo encontrado."