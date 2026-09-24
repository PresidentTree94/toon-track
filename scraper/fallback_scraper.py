from supabase_client import supabase
from initial_scraper import run_initial_scraper

def run_fallback_scraper():
    response = supabase.table("webtoons").select("*").eq("initial", False).execute()

    for row in response.data:
        webtoon_id = row["id"]
        run_initial_scraper(webtoon_id)

if __name__ == "__main__":
    run_fallback_scraper()