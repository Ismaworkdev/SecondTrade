import os
from dotenv import load_dotenv , dotenv_values
load_dotenv()
from fastapi import FastAPI
from config.db import engine, metaDatos
from routes import router

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


app = FastAPI()
#metaDatos.drop_all(bind=engine)
#metaDatos.create_all(bind=engine)
app.include_router(router)


@app.get("/")
def root():
    
    return {"message": "Welcome to my API secondtradeapp@gmail.com"}