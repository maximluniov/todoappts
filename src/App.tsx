import Header from "./components/Header";
import AddTodos from "./components/AddTodo";
import  TodoProvider from './contexts/todoProvider';
import Tasks from "./components/Tasks";

function App() {
  return (
<TodoProvider>
    <div className="flex flex-col">
   <Header/>
   <AddTodos/>
   <Tasks/>
    </div>
  
    </TodoProvider>
  
  );
}

export default App;
