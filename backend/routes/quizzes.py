from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Quiz
from pydantic import BaseModel

router = APIRouter()

# Define the request body model
class QuizRequest(BaseModel):
    title: str
    description: str

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



    @router.post("/quizzes")
def create_quiz(quiz: QuizRequest, db: Session = Depends(get_db)):
    new_quiz = Quiz(title=quiz.title, description=quiz.description)  # Fix
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)
    return new_quiz


@router.get("/quizzes")
def get_quizzes(db: Session = Depends(get_db)):
    return db.query(Quiz).all()
