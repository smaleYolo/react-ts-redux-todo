import React, {useState} from 'react';
import Navigation from "../components/Navigation";
import NewTodoForm from "../components/NewTodoForm";
import TodoList from "../components/TodoList";
import TodoClasses from "../components/TodoClasses";

const TodosPage = () => {

    const todoClasses: string[] = ['All', 'Active', 'Completed']
    const [type, setType] = useState(0)

    const onClickType = (type: number) => {
        setType(type)
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <NewTodoForm/>
                <TodoList active={type}/>
                <TodoClasses classes={todoClasses} setClass={onClickType} active={type}/>
            </div>
        </>
    );
};

export default TodosPage;