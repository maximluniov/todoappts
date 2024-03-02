import Header from "./components/Header";
import AddTodos from "./components/AddTodo";
import TodoProvider from './contexts/todoProvider';
import Tasks from "./components/Tasks";
import { useState } from "react";
import ModalProvider from "./contexts/modalProvider";
function App() {

  const [filtration, setFiltration] = useState<"all" | true | false>("all");





  const handleOnChange = (e: string) => {
    if (e === "all") {
      setFiltration("all")
    }
    else if (e === "true") {
      setFiltration(true)
    }
    else {
      setFiltration(false);
    }
  }

  
  return (
    <ModalProvider>
      <TodoProvider>
        <div className="flex flex-col items-center">
          <Header />
          <AddTodos onChange={(e) => handleOnChange(e)} />
          <Tasks filtration={filtration} />
        </div>
      </TodoProvider>
    </ModalProvider>

  );
}

export default App;
