# Task Hub 
This is a simple To-Do list web application, developed with Flask for the backend, React for the frontend, and MySQL for the database. 

## Features
- Create, Read, Update, and Delete tasks.
- Mark tasks as completed.
- Filter tasks by status( completed, or active).
- Sort tasks by date or priority.

## Installation
To run this web application on your local machine, you need to have the following tools installed:

- Node.js
- Python
- MySQL


### Backend
1. Clone the repository:
          git clone https://github.com/yourusername/task-hub.git
2. Change into the backend directory:
          cd task-hub/backend
3. Create a virtual environment:
          python -m venv venv
4. Activate the virtual environment:

         On Windows:
           venv\Scripts\activate
        
        On macOS and Linux:
          source venv/bin/activate
5. Install the dependencies:
pip install -r requirements.txt
6. Create a .env file in the backend directory with the following environment variables:

- makefile

        FLASK_APP=app

        FLASK_ENV=development

        DATABASE_URL=mysql+pymysql://username:password@localhost:3306/taskhub

        Replace username and password with your MySQL database credentials.

7. Create the database tables:

        flask db upgrade
        Start the Flask server:

        
Copy code:

      flask run

### Frontend
1. Change into the frontend directory:

Copy code:

      cd ../Client

2. Install the dependencies:

Copy code:

      npm install
3. Start the React development server:

sql
Copy code

      npm start

- Open your web browser and go to http://localhost:3000 to access the Task Hub Web Application.

#### License
This project is licensed under the MIT License. See the LICENSE file for details.
