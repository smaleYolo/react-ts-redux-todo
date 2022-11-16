import React, {useEffect} from 'react';
import TodoItem from "./TodoItem";
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchTodos} from "../store/TodoSlice";

interface TodoListProps {
    active: number,
}

const TodoList = ({active}: TodoListProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    },[dispatch])

    let {todos} = useAppSelector(state => state.todos)

    switch (active) {
        case 1: {
            todos = todos.filter(todo => !todo.completed);
            break
        }
        case 2: {
            todos = todos.filter(todo => todo.completed);
            break
        }
        default: {
            break
        }
    }

    return (
        <div className="border-2 mt-2 rounded w-[560px] h-[200px] overflow-auto">
            {
                todos.length > 0
                    ? (
                        todos.map(todo => (
                            <TodoItem key={todo.id} {...todo}/>
                        ))
                    ) : (
                        <div className="flex justify-center mt-20 text-gray-500">
                            <h1>Add your first todo...</h1>
                        </div>
                    )
            }
        </div>
    );
};

export default TodoList;