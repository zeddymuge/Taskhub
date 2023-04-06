###TASK HUB
This is a simple To-Do list web application, developed with Flask for the backend, React for the frontend, and MySQL for the database. 

##Features
Create, Read, Update, and Delete tasks.
Mark tasks as completed.
mark task as completed 
Sort tasks by date or priority.

##Installation
To run this web application on your local machine, you need to have the following tools installed:

Node.js
Python
MySQL


##Backend
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/task-hub.git
Change into the backend directory:

bash
Copy code
cd task-hub/backend
Create a virtual environment:

Copy code
python -m venv venv
Activate the virtual environment:

On Windows:

Copy code
venv\Scripts\activate
On macOS and Linux:

bash
Copy code
source venv/bin/activate
Install the dependencies:

Copy code
pip install -r requirements.txt
Create a .env file in the backend directory with the following environment variables:

makefile
Copy code
FLASK_APP=app
FLASK_ENV=development
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/taskhub
Replace username and password with your MySQL database credentials.

Create the database tables:

Copy code
flask db upgrade
Start the Flask server:

arduino
Copy code
flask run


##Frontend
Change into the frontend directory:

bash
Copy code
cd ../frontend
Install the dependencies:

Copy code
npm install
Start the React development server:

sql
Copy code
npm start
Open your web browser and go to http://localhost:3000 to access the Task Hub To-Do List Web Application.

License
This project is licensed under the MIT License. See the LICENSE file for details.
