from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/taskhub'
cors = CORS(app)
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200))
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    completed = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "task": self.task,
            "description": self.description,
            "date": self.date.isoformat() if self.date else None,
            "time": self.time.isoformat() if self.time else None,
            "completed": self.completed
        }

@app.route('/tasks')
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.serialize() for task in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    task = Task(
        task=request.json['task'],
        description=request.json.get('description'),
        date=request.json.get('date'),
        time=request.json.get('time'),
        completed=False
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.serialize())

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({"error": "Task not found"})
    task.task = request.json.get("task", task.task)
    task.description = request.json.get("description", task.description)
    task.date = request.json.get("date", task.date)
    task.time = request.json.get("time", task.time)
    task.completed = request.json.get("completed", task.completed)
    db.session.commit()
    return jsonify(task.serialize())

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({"error": "Task not found"})
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})

if __name__ == '__main__':
    app.run(debug=True)
