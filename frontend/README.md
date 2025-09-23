# JdmCarBlog

This project is a **classic car blog** with an **Angular 20.1 frontend** and a **Django backend**.

---

## Project Structure

jdm-car-blog/
├─ frontend/ # Angular frontend
├─ backend/ # Django backend
└─ README.md # Project instructions

yaml
Copy code

---

## Frontend (Angular)

The frontend was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

### Development server

To start the Angular development server:

```bash
cd frontend
npm install
ng serve --proxy-config proxy.conf.json
Navigate to http://localhost:4200/. The app will automatically reload whenever you modify any source files.

Note: The proxy.conf.json ensures API requests are forwarded to the Django backend to avoid CORS issues.

Proxy Configuration
Create a proxy.conf.json in the frontend/ folder with:

json
Copy code
{
  "/api": {
    "target": "http://localhost:8000",
    "secure": false
  }
}
This allows Angular to redirect API calls to Django without CORS errors.

Code scaffolding
Generate a new component:

bash
Copy code
ng generate component component-name
For a full list of schematics:

bash
Copy code
ng generate --help
Building for production
bash
Copy code
ng build
Build artifacts are stored in the dist/ folder. Production builds are optimized for speed.

Running tests
Unit tests (Karma):

bash
Copy code
ng test
End-to-end tests:

bash
Copy code
ng e2e
Angular CLI does not include an e2e framework by default.

Backend (Django)
The backend is built with Django and serves the API for the Angular frontend.

Setup
Navigate to the backend folder:

bash
Copy code
cd backend
Create a virtual environment (recommended):

bash
Copy code
python -m venv env
env\Scripts\activate   # Windows
# source env/bin/activate  # Linux/Mac
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Apply database migrations:

bash
Copy code
python manage.py migrate
Running the server
bash
Copy code
python manage.py runserver
The backend will run at http://localhost:8000/. API endpoints can be accessed via /api/....

Environment Variables
You can create a .env file in the backend/ folder to manage sensitive settings like Django SECRET_KEY:

ini
Copy code
SECRET_KEY=your_secret_key_here
DEBUG=True
Make sure .env is added to .gitignore to avoid exposing secrets.

How to Run Both Frontend and Backend Locally
Start the backend first:

bash
Copy code
cd backend
python manage.py runserver
Start the frontend in another terminal:

bash
Copy code
cd frontend
ng serve --proxy-config proxy.conf.json
Now you can access the full application at http://localhost:4200/.

Additional Resources
Angular CLI Overview

Django Documentation

Proxy Configuration in Angular

Notes
Ensure you have Python 3.10+ and Node.js 20+ installed.

Make sure the backend/db.sqlite3 file is present or migrations are applied.

Use npm install in frontend/ and pip install -r requirements.txt in backend/ before running servers.
