import React, { useEffect, useState } from "react";
import "./App.css";

const ToDo = () => {
  const [catchVal, setCatchval] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [itemLength, setItemLength] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const todoItem = localStorage.getItem("Todos");
    if (todoItem) {
      const parsed = JSON.parse(todoItem);
      setTaskList(parsed);
    }
  }, []);

  const addTodos = (e) => {
    e.preventDefault();

    if (catchVal.trim() === "") {
      alert("Add a task");
      return;
    }

    if (isEdit) {
      const updatedList = tasklist.map((item) => {
        return item.id === editTaskId ? { ...item, task: catchVal } : item;
      });

      setTaskList(updatedList);
      setIsEdit(false);
      localStorage.setItem("Todos", JSON.stringify(updatedList));
    } else {
      const newTask = {
        id: Date.now() + "",
        task: catchVal,
        status: "pending",
      };
      const newList = [newTask, ...tasklist];
      setTaskList(newList);
      localStorage.setItem("Todos", JSON.stringify(newList));
    }

    setCatchval("");
  };

  const deleteTask = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${item.task} permanently`
    );
    if (confirmDelete) {
      const updatedlist = tasklist.filter((task) => task.id !== item.id);
      setTaskList(updatedlist);
      localStorage.setItem("Todos", JSON.stringify(updatedlist));
    }
  };

  const editTask = (id) => {
    setIsEdit(true);
    const listToEdit = tasklist.find((task) => task.id === id);
    if (listToEdit) {
      setCatchval(listToEdit?.task);
      setEditTaskId(id);
    }
  };
  const toggleStatus = (id) => {
    const updatedList = tasklist.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === "pending" ? "complete" : "pending",
          }
        : item
    );
    setTaskList(updatedList);
    localStorage.setItem("Todos", JSON.stringify(updatedList));
  };

  useEffect(() => {
    const filteredList = tasklist.filter((item) => {
      if (filter === "complete") return item.status === "complete";
      if (filter === "pending") return item.status === "pending";
      return true;
    });
    setFilteredList(filteredList);
    setItemLength(filteredList.length);
  }, [filter, tasklist]);

  return (
    <div className="container">
      <form onSubmit={addTodos}>
        <input
          type="text"
          value={catchVal}
          onChange={(e) => {
            setCatchval(e.target.value);
          }}
        ></input>
        <button type="submit"> {isEdit ? "update Tasks" : "Add task"}</button>
      </form>

      <div className="compen">
        <button onClick={() => setFilter("all")}>All Task</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("complete")}>Completed</button>
      </div>

      <div className="todocontainer">
        {filteredList.length ? (
          filteredList.map((item, index) => (
            <div className="tasks" key={item.id}>
              <div>
                <input
                  type="checkbox"
                  checked={item.status === "complete"}
                  onChange={() => toggleStatus(item.id)}
                />
              </div>
              <div className="todo">
                <span
                  style={{
                    textdecoration:
                      item.status === "complete" ? "line-trough" : "none",
                  }}
                >
                  {item.task}
                </span>
                <div className="btn">
                  <button className="edit" onClick={() => editTask(item.id)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => deleteTask(item)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>
            {filter === "complete" && "there is no complete tasks"}
            {filter === "pending" && "there is no pending tasks"}
            {filter === "all" && "No task available here"}
          </p>
        )}
      </div>

      <div className="counter">
        {filter === "all" && <span>All Task = {itemLength} </span>}
        {filter === "complete" && <span>Complete task= {itemLength} </span>}
        {filter === "pending" && <span>pending Task = {itemLength} </span>}
      </div>
    </div>
  );
};

export default ToDo;
