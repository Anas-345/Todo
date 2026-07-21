import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);
