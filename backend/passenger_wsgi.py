import sys, os
from a2wsgi import ASGIMiddleware
from main import app as application

# Hostinger Passenger configuration
sys.path.append(os.getcwd())

# Wrap the FastAPI app with ASGIMiddleware to make it WSGI compatible
application = ASGIMiddleware(application)
