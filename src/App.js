import { useState } from "react";

// const defaultItems = [
//   {
//     id: 1,
//     title: "Learn MongoDB",
//     time: new Date().toLocaleTimeString(),
//   },
//   {
//     id: 2,
//     title: "Learn Express JS",
//     time: new Date().toLocaleTimeString(),
//   },
//   {
//     id: 3,
//     title: "Learn React JS",
//     time: new Date().toLocaleTimeString(),
//   },
//   {
//     id: 4,
//     title: "Learn Node JS",
//     time: new Date().toLocaleTimeString(),
//   },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  function clearForm() {
    setTitle("");
    setStatus("incomplete");
  }

  function handleSetTitle(evnt) {
    setTitle(evnt.target.value);
  }

  function handleSetStatus(evnt) {
    setStatus(evnt.target.value);
  }

  function handleAddTodoForm(evnt) {
    evnt.preventDefault();

    const currDate = new Date();

    const newItem = {
      id: Date.now(),
      title,
      time: `${currDate.toLocaleTimeString()}, ${currDate.toLocaleDateString()}`,
      isChecked: status === "incomplete",
    };

    if (!title) return;
    setItems((currItems) => [...currItems, newItem]);
    handleSetIsHidden(evnt);
    clearForm();
  }

  function handleSetIsHidden(evnt) {
    evnt.preventDefault();
    setIsHidden((curr) => !curr);
    clearForm();
  }

  return (
    <>
      <div className="app">
        <Header />
        <Controls onClick={handleSetIsHidden} />
        <List items={items} />
      </div>
      <AddTodoForm
        isHidden={isHidden}
        onClick={handleSetIsHidden}
        onSetStatus={handleSetStatus}
        onSetTitle={handleSetTitle}
        onSubmit={handleAddTodoForm}
      />
    </>
  );
}

function Header() {
  return <header>ToDo List</header>;
}

function Controls({ onClick }) {
  const [sortBy, setSortBy] = useState("all");

  return (
    <div className="controls">
      <button onClick={onClick}>Add Task</button>
      <select value={sortBy} onChange={(evnt) => setSortBy(evnt.target.value)}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

function AddTodoForm({
  title,
  status,
  isHidden,
  onClick,
  onSubmit,
  onSetTitle,
  onSetStatus,
}) {
  return (
    <div className={`overlay ${isHidden ? "hidden" : ""} `}>
      <form className="add-todo-form">
        <h3>Add TODO</h3>
        <label>Title</label>
        <input type="text" value={title} onChange={onSetTitle} />
        <label>Status</label>
        <select value={status} onChange={onSetStatus}>
          <option value="incompleted">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
        <div className="add-todo-form-controls">
          <button id="btn-add-task" onClick={onSubmit}>
            Add Task
          </button>
          <button onClick={onClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function List({ items }) {
  return (
    <ul className="todo-list">
      {items.length === 0 ? (
        <h3>No ToDo</h3>
      ) : (
        items.map((item) => <ListItem item={item} key={item.id} />)
      )}
    </ul>
  );
}

function ListItem({ item }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <li className="todo-list-item">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((curr) => !curr)}
      />
      <div className="todo-info">
        <h4 className={isChecked ? "strike" : ""}>{item.title}</h4>
        <p>{item.time}</p>
      </div>
      <div className="todo-controls">
        <button>🗑️</button>
        <button>🖋️</button>
      </div>
    </li>
  );
}
