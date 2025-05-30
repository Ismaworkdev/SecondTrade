import os
from dotenv import load_dotenv , dotenv_values
load_dotenv()
from fastapi import FastAPI
from config.db import engine, metaDatos
from routes import router

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
#metaDatos.drop_all(bind=engine)
#metaDatos.create_all(bind=engine)
app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    
    return {"message": "Welcome to my API secondtradeapp@gmail.com"}