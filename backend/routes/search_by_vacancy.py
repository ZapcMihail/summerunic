from fastapi import APIRouter, HTTPException
from dbConnection.db import get_db_connection, release_db_connection
from typing import List, Dict

router = APIRouter()

@router.get("/search_by_vacancy", response_model=List[Dict])
async def search_by_vacancy(vacancy_query: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT company, vacancy, location, salary, skills, link FROM vacancies WHERE vacancy ILIKE %s ORDER BY RANDOM() LIMIT 5;", (f"%{vacancy_query}%",))
            rows = cur.fetchall()

        if not rows:
            raise HTTPException(status_code=404, detail=f"Никаких вакансий не найдено по запросу: '{vacancy_query}'")

        return [{"company": row[0], "vacancy": row[1], "location": row[2], "salary": row[3], "skills": row[4], "link": row[5]} for row in rows]
    finally:
        release_db_connection(conn)
