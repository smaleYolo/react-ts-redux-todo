import React, {useState} from 'react';
import {useAppDispatch} from "../hooks";
import {addTodo} from "../store/TodoSlice";

const NewTodoForm = () => {
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()

    const onAddTodo = () => {
        if(value.trim().length){
            dispatch(addTodo(value))
            setValue('')
        }
    }

    const keydownHandler = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            onAddTodo()
        }
    }

    return (
        <div className="border-2 rounded pr-2 pl-2">
            <input
                type="text"
                placeholder="New todo..."
                className="outline-0"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={keydownHandler}
            />
            <button
                onClick={onAddTodo}
            >
                Add
            </button>
        </div>
    );
};

export default NewTodoForm;