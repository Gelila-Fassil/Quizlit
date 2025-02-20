# from fastapi import FastAPI
# from database import engine, Base
# from routes import users, quizzes, results

# app = FastAPI()

# # Create database tables
# Base.metadata.create_all(bind=engine)

# # Include routes
# app.include_router(users.router, prefix="/users", tags=["Users"])
# app.include_router(quizzes.router, prefix="/quizzes", tags=["Quizzes"])
# app.include_router(results.router, prefix="/results", tags=["Results"])

# @app.get("/")
# def home():
#     return {"message": "Quizlet API is running!"}

from fastapi import FastAPI
from database import engine, Base
from routes import users, quizzes, results

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(users.router, prefix="/users", tags=["Users"])  # Correctly including users router
app.include_router(quizzes.router, prefix="/quizzes", tags=["Quizzes"])
app.include_router(results.router, prefix="/results", tags=["Results"])

@app.get("/")
def home():
    return {"message": "Quizlet API is running!"}
