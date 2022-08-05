//import "./styles.css";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Todo1", completed: false }
  ]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    //task here
    const name = todoNameRef.current.value;
    setTodos((prevTodos) => {
      //配列の追加
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
  };

  const handleClear = () => {
    const newTodos = [...todos];
    const leftTodos = newTodos.filter((todo) => !todo.completed);
    setTodos(leftTodos);
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    //findはfor文のようなもの
    const todo = newTodos.find((todo) => todo.id === id);
    //状態を現在と反転させる
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}
