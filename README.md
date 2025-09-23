### Classic Car Blog
This project is a classic car blog with an Angular 20.1.4 frontend and a Django backend.

### Project Structure
```
jdm-car-blog/
├─ frontend/ # Angular frontend
├─ backend/ # Django backend
└─ README.md # Project instructions
```

### Frontend (Angular)
The frontend was generated using Angular CLI version 20.1.4.

Development server
To start the Angular development server:

```bash
cd frontend
npm install
ng serve --proxy-config proxy.conf.json
```
Open your browser at http://localhost:4200/. The application will automatically reload whenever you modify any source files.

Note: The proxy.conf.json ensures API requests are forwarded to the Django backend to avoid CORS issues.

### Proxy Configuration
Create a proxy.conf.json file inside the frontend/ folder:

```json
{
  "/api": {
    "target": "http://localhost:8000",
    "secure": false
  }
}
```
This allows Angular to redirect API calls to Django without CORS errors.

### Code scaffolding
Generate a new component:

```bash
ng generate component component-name
```
For a full list of schematics:

```bash
ng generate --help
```
Building for production

```bash
ng build
```
Build artifacts are stored in the dist/ folder. Production builds are optimized for performance.


Running tests
Unit tests (Karma):

```bash
ng test
```
End-to-end tests:

```bash
ng e2e
```
Angular CLI does not include an end-to-end testing framework by default.


### Backend (Django)
The backend is built with Django and serves the API for the Angular frontend.

Setup
Navigate to the backend folder:

```bash
cd backend
```
Create a virtual environment (recommended):

```bash
python -m venv env
env\Scripts\activate   # Windows
# source env/bin/activate  # Linux/Mac
```
Install dependencies:

```bash
pip install -r requirements.txt
```
Apply database migrations:
```bash
python manage.py migrate
```
Running the server
```bash
python manage.py runserver
```
The backend will run at **http://localhost:8000/**. API endpoints can be accessed via /api/....

Environment Variables
Create a .env file in the backend/ folder to manage sensitive settings:

```ini
SECRET_KEY=your_secret_key_here
DEBUG=True
```
Make sure .env is added to .gitignore to avoid exposing secrets.

### Running Both Frontend and Backend Locally
Start the Django backend:

```bash
cd backend
python manage.py runserver
```
Start the Angular frontend in another terminal:
```bash
cd frontend
ng serve
```
The full application can now be accessed at **http://localhost:4200/**.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### Notes
* Ensure you have Python 3.10+ and Node.js 20+ installed.

* Make sure backend/db.sqlite3 exists or run migrations to generate the database.

* Use npm install in frontend/ and pip install -r requirements.txt in backend/ before running servers.
