import React , { useState, useEffect }from 'react'
import {RiDeleteBin5Fill} from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import {GiCheckMark } from 'react-icons/gi';
import axios from "axios";
import moment from "moment"; // Import moment library
import './App.css'





function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().substr(0, 10));
  const [newTime, setNewTime] = useState("");
  const [editingTask, setEditingTask] = useState(null);


  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => {
        setTasks(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  

  const handleCancelEdit = () => {
    setEditingTask(null);
    setNewTask('');
    setNewDescription('');
    setNewDate(new Date().toISOString().substr(0, 10));
    setNewTime('');
  };

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setNewTime(event.target.value);
  }

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    if (editingTask) {
      handleTaskUpdate({
        id: editingTask.id,
        task: newTask,
        description: newDescription,
        date: newDate,
        time: newTime,
        completed: editingTask.completed,
      });
      setEditingTask(null);
      setNewTask('');
      setNewDescription('');
      setNewDate(new Date().toISOString().substr(0, 10));
      setNewTime('');
    } else {
    axios.post("http://localhost:5000/tasks", {
      task: newTask,
      description: newDescription,
      date: newDate,
      time: newTime,
      completed:false
    })
      .then(res => {
        setTasks([...tasks, res.data]);
        setNewTask("");
        setNewDescription("");
        setNewDate(new Date().toISOString().substr(0, 10));
        setNewTime("");
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  const handleTaskUpdate = (updatedTask) => {
    axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask)
      .then(res => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? res.data : t));
        setEditingTask(null); // reset editing state after update
      })
      .catch(err => {
        console.error(err);
      });
  }
  const handleTaskDelete = (deletedTask) => {
    axios.delete(`http://localhost:5000/tasks/${deletedTask.id}`)
      .then(res => {
        setTasks(tasks.filter(t => t.id !== deletedTask.id));
      })
      .catch(err => {
        console.error(err);
      });
  }

  const handleTaskComplete = (completedTask) => {
    axios.put(`http://localhost:5000/tasks/${completedTask.id}`, { ...completedTask, completed: !completedTask.completed })
      .then(res => {
        setTasks(tasks.map(t => t.id === completedTask.id ? res.data : t));
      })
      .catch(err => {
        console.error(err);
      });
  }
  const handleEditTask = (task) => {
    setEditingTask(task); // set editing state to the task being edited
    setNewTask(task.task);
    setNewDescription(task.description);
    setNewDate(task.date);
    setNewTime(task.time);
  }

  

  return (
    <div className='main'>
      <header>
		<nav>
            <ul><li><a href="http://127.0.0.1:5500/my-project/client/src/Home.html">HOME</a></li>
                <li><a href="http://127.0.0.1:5500/my-project/client/src/About.html">ABOUT</a></li>
                <li><a href="http://localhost:3000/">SET TASKS</a></li>
                <li><a href="http://127.0.0.1:5500/my-project/client/src/Login.html">SIGN IN</a></li>
		
            </ul>
        </nav>
        </header>
      
      <h1> .</h1>
      <form   onSubmit={handleTaskSubmit}>
        <label>
          Task:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" value={newTask} onChange={handleTaskChange} required />
        </label><br/><br/>
        <label>
          Description:
          <input type="text" value={newDescription} onChange={handleDescriptionChange} />
        </label><br/><br/>
        <label>
          Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="date" value={newDate} onChange={handleDateChange} required/>
        </label><br/><br/>
        <label>
          Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="time" value={newTime} onChange={handleTimeChange}required />
        </label><br/><br/>
        <button className='btn' type="submit">{editingTask ? 'Save' : 'Add'}</button>
        {editingTask && <button className='btn' type="button" onClick={handleCancelEdit}>Cancel</button>}
    </form> 
    <div className ="container"> 
    <h2>Task List</h2>
    {tasks.length > 0 ? (
      <table border = "{{ 5}}" style={{ width: '100%' }} >
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.task}</td>
              <td>{task.description}</td>
              <td>{moment(task.date).format("MMM Do YYYY")}</td>
              <td>{task.time }</td>
              <td>
                <button type='nun' onClick={() => handleEditTask(task)}><TiEdit /></button>
                <button  type='nun' onClick={() => handleTaskDelete(task)}><RiDeleteBin5Fill/></button>
              
                <button  type='nun' onClick={() => handleTaskComplete(task)}>{task.completed ? <GiCheckMark/> : "Complete"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No tasks to display.</p>
    )}
  <p>You have {tasks.length} Tasks ! </p>
  </div>
   
      
   
  </div>
);

}
export  default App