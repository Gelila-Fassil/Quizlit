from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal
from models import Result, Quiz

router = APIRouter()

# Define the request body model
class ResultRequest(BaseModel):
    user_id: int
    quiz_id: int
    score: int

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/results")
def submit_quiz(result: ResultRequest, db: Session = Depends(get_db)):
    if not db.query(Quiz).filter(Quiz.id == result.quiz_id).first():  # Fix
        raise HTTPException(status_code=404, detail="Quiz not found")

    new_result = Result(user_id=result.user_id, quiz_id=result.quiz_id, score=result.score)
    db.add(new_result)
    db.commit()
    db.refresh(new_result)
    return {"message": "Result submitted successfully"}








@router.get("/results/{user_id}")
def get_results(user_id: int, db: Session = Depends(get_db)):
    # Retrieve results for the given user ID
    return db.query(Result).filter(Result.user_id == user_id).all()
