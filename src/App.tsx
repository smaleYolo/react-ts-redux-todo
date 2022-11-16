import React, {useState} from 'react';
import TodoList from "./components/TodoList";
import NewTodoForm from "./components/NewTodoForm";
import Navigation from "./components/Navigation";
import TodoClasses from "./components/TodoClasses";

function App() {

    const todoClasses: string[] = ['All', 'Active', 'Completed']
    const [type, setType] = useState(0)

    const onClickType = (type: number) => {
        setType(type)
    }

    return (
        <>
            <Navigation/>
            <div className="flex flex-col items-center">
                <NewTodoForm/>
                <TodoList active={type}/>
                <TodoClasses classes={todoClasses} setClass={onClickType} active={type}/>
            </div>
        </>
    );
}

export default App;
