import os
import json
import firebase_admin
from firebase_admin import credentials, messaging

service_account_info = json.loads(os.environ["FIREBASE_SERVICE_ACCOUNT"])
  
cred = credentials.Certificate(service_account_info)
firebase_admin.initialize_app(cred)