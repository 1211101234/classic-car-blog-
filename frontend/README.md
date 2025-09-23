# JdmCarBlog

This project is a **classic car blog** with an **Angular 20.1 frontend** and a **Django backend**.

---

## Project Structure

jdm-car-blog/
├─ frontend/ # Angular frontend
├─ backend/ # Django backend
└─ README.md # Project instructions


---

## Frontend (Angular)

The frontend was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

### Development server

To start the Angular development server:

```bash
cd frontend
npm install
ng serve --proxy-config proxy.conf.json
```
Open your browser at http://localhost:4200/. The application will automatically reload whenever you modify any source files.

Note: The proxy.conf.json ensures API requests are forwarded to the Django backend to avoid CORS issues.

###Proxy Config
Create a proxy.conf.json file inside the frontend/ folder:
json
{
  "/api": {
    "target": "http://localhost:8000",
    "secure": false
  }
}
