
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import JSONResponse
from fastapi import APIRouter , Response , Depends
from schemas.Email import Email as EmailSchema
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import smtplib
from  controllers.Usuario import UsuarioController
from email.message import EmailMessage
import os
from email.utils import make_msgid

from dotenv import load_dotenv , dotenv_values
load_dotenv()
class EmailController:
    
    def send_email(email: EmailSchema , current_user: dict , db):
         if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
         else:
                #SecondTrade

            email_remitente = os.getenv("Email")
            password = os.getenv("Password")

            msg = EmailMessage()
            msg['Subject'] = email.subject
            msg['From'] = email_remitente
            msg['To'] = email.email

            # CID for the image
            logo_cid = make_msgid()[1:-1]  # Remove < and >

            email_subject = email.subject
            email_message = email.message

            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Email</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        background-color: #e6f0fa;
                        padding: 20px;
                        margin: 0;
                    }}
                    .email-container {{
                        background: linear-gradient(to bottom, #58bcff, #ffffff);
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 8px rgba(0, 85, 170, 0.1);
                    }}
                    .email-header {{
                        display: block;
                        align-items: center;
                        justify-content: space-around;
                        text-align: center;
                        margin-bottom: 30px;
                    }}
                    .email-header img {{
                        max-width: 150px;
                        height: auto;
                    }}
                    .email-subject {{
                        font-size: 22px;
                        font-weight: bold;
                        color: #005a99;
                        margin-bottom: 10px;
                    }}
                    .email-message {{
                        font-size: 16px;
                        color: #333;
                        line-height: 1.6;
                    }}
                      .title{{
                        color: #000000;
                      }}
                </style>             
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">
                        
                        <img src="cid:{logo_cid}" alt="Logo">
                    </div>
                    <div class="email-subject">{email_subject}</div>
                    <br><br>
                    <div class="email-message">
                        {email_message}
                    </div>
                </div>
            </body>
            </html>
            """

            msg.set_content("Este es un correo HTML. Si no puedes verlo, activa la vista HTML.")
            msg.add_alternative(html_content, subtype='html')

            # Attach image using CID
            with open("static/logo.png", 'rb') as img:
                msg.get_payload()[1].add_related(
                    img.read(),
                    maintype='image',
                    subtype='png',
                    cid=f"<{logo_cid}>"
                )

            try:
                with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                    smtp.login(email_remitente, password)
                    smtp.send_message(msg)
                return JSONResponse(status_code=HTTP_200_OK, content={"message": "Email enviado correctamente"})
            except Exception as e:
                print(e)
                return JSONResponse(status_code=HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "Error al enviar el email"})

