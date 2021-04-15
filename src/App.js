import Header from "./compnents/Header";
import Tasks from "./compnents/Tasks";
import Footer from "./compnents/Footer";
import About from "./compnents/About";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTask from "./compnents/addTask";
import { useState, useEffect } from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const _url = "http://localhost:5000/tasks";
  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);
  //Get Data (Tasks) From API
  const fetchTasks = async () => {
    const res = await fetch(_url);
    const data = await res.json();
    console.log("data", data);
    return data;
  };
  //Get Data By ID
  const fetchTaskById = async (id) => {
    const res = await fetch(`${_url}/${id}`);
    const data = await res.json();
    console.log("data", data);
    return data;
  };

  //delete task
  const deleteTask = async (id) => {
    //Delete Data using APi
    await fetch(`${_url}/${id}`, { method: "Delete" });

    // console.log("id", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // task Reminder
  const toggleReminder = async (id) => {
    const upTask = await fetchTaskById(id);
    const toggleTask = { ...upTask, reminder: !upTask.reminder };
    const res = await fetch(`${_url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(toggleTask),
    });
    const data = await res.json();

    console.log("data", data);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  //Some Problem Here In Get Data Auto After Add It
  //add Task
  const addTask = async (task) => {
    let newTask = [];
    fetch(_url, {
      method: "Post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((data) => {
      data.json().then((data) => {
        newTask = data;
        setTasks([...tasks, newTask]);
      });
    });
    console.log("tasks", tasks);

    // const data = await res.json();

    // const id = Math.floor(Math.random() * 10000) + 1;
    // console.log(task);
    // let newTask = { id, ...task };
    // console.log("task", ...tasks);
    // console.log("new", newTask);

    // setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          // className="header"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTaskBtn={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  toggleReminder={toggleReminder}
                />
              ) : (
                "No Tasks Here Yalaa"
              )}
            </>
          )}
        />

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
