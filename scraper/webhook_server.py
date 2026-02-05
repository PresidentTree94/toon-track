from fastapi import FastAPI, Request
from initial_scraper import run_initial_scraper

app = FastAPI()

@app.post("/webhook")
async def webhook(request: Request):
  body = await request.json()
  record = body.get("record", {})
  webtoon_id = record.get("id")

  if webtoon_id:
      run_initial_scraper(webtoon_id)

  return {"status": "ok"}