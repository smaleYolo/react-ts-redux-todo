import React from 'react';
import {useAppDispatch} from "../hooks";
import {removeTodo, toggleTodo} from "../store/TodoSlice";

interface TodoItemProps {
    id: number,
    title: string,
    completed: boolean
}

const TodoItem = ({ id, title, completed }: TodoItemProps) => {
    const dispatch = useAppDispatch()

    return (
        <div className="flex justify-between w-[500px] mr-5 ml-5">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(toggleTodo(id))}
            />
            <p>{title}</p>
            <button
                className="text-red-600"
                onClick={() => dispatch(removeTodo(id))}
            >x</button>
        </div>
    );
};

export default TodoItem;