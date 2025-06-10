# backend/app/routers/heroes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import get_db

router = APIRouter(
    prefix="/api/heroes",
    tags=["Heroes"]
)

@router.post("/", response_model=schemas.Hero, status_code=201)
def create_new_hero(hero: schemas.HeroCreate, db: Session = Depends(get_db)):
    db_hero = crud.get_hero_by_name(db, name=hero.name)
    if db_hero:
        raise HTTPException(status_code=400, detail="Pahlawan dengan nama ini sudah terdaftar.")
    return crud.create_hero(db=db, hero=hero)

@router.get("/", response_model=List[schemas.Hero])
def read_all_heroes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    heroes = crud.get_heroes(db, skip=skip, limit=limit)
    return heroes

@router.get("/{hero_id}", response_model=schemas.Hero)
def read_one_hero(hero_id: int, db: Session = Depends(get_db)):
    db_hero = crud.get_hero(db, hero_id=hero_id)
    if db_hero is None:
        raise HTTPException(status_code=404, detail="Pahlawan tidak ditemukan")
    return db_hero

@router.put("/{hero_id}", response_model=schemas.Hero)
def update_existing_hero(hero_id: int, hero: schemas.HeroUpdate, db: Session = Depends(get_db)):
    db_hero = crud.update_hero(db, hero_id=hero_id, hero_update=hero)
    if db_hero is None:
        raise HTTPException(status_code=404, detail="Pahlawan tidak ditemukan")
    return db_hero

@router.delete("/{hero_id}", response_model=schemas.Hero)
def delete_existing_hero(hero_id: int, db: Session = Depends(get_db)):
    db_hero = crud.delete_hero(db, hero_id=hero_id)
    if db_hero is None:
        raise HTTPException(status_code=404, detail="Pahlawan tidak ditemukan")
    return db_hero