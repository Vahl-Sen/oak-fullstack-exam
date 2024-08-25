# ❓ ABOUT

This project aims to be a functional prototype of a product database platform.
It implements frontend and backend functionality through the use of `ReactJS` and `FastAPI`. Additionally, this projects uses `SQLite` as a simple database to store the API data and `Bootstrap` for CSS styling.

# 🧩 GETTING STARTED

**How to run app:**

1. Open terminal and cd into `.\oak-fullstack-exam\api`.
2. Install the required packages in the `Requirements` section.
3. Enter: `uvicorn main:app --reload`.

4. Open a second terminal (keep other running).
5. Cd into `.\oak-fullstack-exam\ui`.
6. Install the required packages in the `Requirements` section.
7. Enter: `npm run dev`.

# 💡 FEATURES

- Responsive front-end layout.
  - Works on mobile and browser
- Basic CRUD functions.
- Saves to an external database via SQLite

# 💡 REQUIREMENTS

**Back-end**

- FastAPI
  - `pip install fastapi`
- Uvicorn
  - `pip install "uvicorn[standard]"`
- SQLAlchemy
  - `pip install sqlalchemy`

**Front-end**

- React JS
  - `npm install react`
  - `npm install react-router-dom`
- Bootstrap
  - `npm install bootstrap`
- Axios
  - `npm install axios`
