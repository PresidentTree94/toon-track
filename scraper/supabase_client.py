from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

# Load environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

# Create a single shared client
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)