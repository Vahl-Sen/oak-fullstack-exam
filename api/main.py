from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from decimal import Decimal
from pydantic import BaseModel, Field
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models

# App Setup
app = FastAPI()

origins = [
    "http://localhost:5173",
]

# Allows the api to be accessed by the specific origins addresses
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Ensures that the database connection closes
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# Creates the database and tables if non-existing
models.Base.metadata.create_all(bind=engine)

class Item(BaseModel):
    name: str = Field(min_length=1)
    description: str = Field(max_length=500)
    price: Decimal = Field(gt=0, decimal_places=2)

ITEMS = []

# REST Commands
@app.get("/")
async def root(db: db_dependency):
    return {"Intro": "Welcome!"}

@app.get("/api/items")
async def return_items(db: db_dependency):
    return db.query(models.Items).all()

@app.post("/api/items")
async def add_item(item: Item, db: db_dependency):
    item_model = models.Items()
    item_model.name = item.name

    if item_model.name == "":
        raise HTTPException(
            status_code = 420,
            detail = f"Error! Item Name cannot be empty!"
        )

    item_model.description = item.description
    item_model.price = item.price

    # Add item to database
    db.add(item_model)
    db.commit()

    return item

@app.get("/api/items/{id}")
async def get_item(id: int, db: db_dependency):
    item_model = db.query(models.Items).filter(models.Items.id == id).first()

    # If item is not in database, raise error
    if item_model is None:
        raise HTTPException(
            status_code = 404,
            detail = f"Error! Requested item does not exist!"
        )
    
    return item_model

@app.put("/api/items/{id}")
async def update_item(id: int, item: Item, db: db_dependency):
    item_model = db.query(models.Items).filter(models.Items.id == id).first()

    # If item is not in database, raise error
    if item_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Error! Requested item does not exist!"
        )
    
    item_model.name = item.name
    item_model.description = item.description
    item_model.price = item.price

    # Update item in database
    db.add(item_model)
    db.commit()

    return item

@app.delete("/api/items/{id}")
async def delete_item(id: int, db: db_dependency):
    item_model = db.query(models.Items).filter(models.Items.id == id).first()

    # If item is not in database, raise error
    if item_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Error! Item ID {id} does not exist!"
        )
    
    # Delete item in database
    db.query(models.Items).filter(models.Items.id == id).delete()
    db.commit()

    return "Record successfully deleted!"