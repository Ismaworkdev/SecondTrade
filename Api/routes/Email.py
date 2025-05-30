from fastapi import APIRouter, Response, Depends
from schemas.Email import Email as EmailSchema
from controllers.Email import EmailController
from sqlalchemy.orm import Session
from config.db import get_db
from .auth import postUser as auth_postUser , get_current_user
route = APIRouter()
namespace = "Email"

@route.post("/")
def send_email(email: EmailSchema , current_user: dict = Depends(get_current_user) ,  db: Session = Depends(get_db)):
     return EmailController.send_email(email , current_user)
 