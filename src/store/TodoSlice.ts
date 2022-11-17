import {createSlice, PayloadAction, createAsyncThunk, AnyAction} from "@reduxjs/toolkit";

type Todo = {
    id: number,
    title: string,
    completed: boolean,
}

type TodoState = {
    todos: Todo[],
    loading: boolean,
    error: string | null
}

export const fetchTodos = createAsyncThunk<Todo[], undefined, { rejectValue: string }>(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }

        const data = await response.json()

        return data;
    }
)

export const addTodo = createAsyncThunk<Todo, string, {rejectValue: string}>(
    'todos/addTodo',
    async function (title, {rejectWithValue}) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                userId: 1,
                title,
                completed: false
            }),
        })

        if(!response.ok){
            return rejectWithValue('Cant create new Task... Server Error!')
        }

        return await response.json() as Todo
    }
)

export const removeTodo = createAsyncThunk<number, number, {rejectValue: string}>(
    'todos/removeTodo',
    async function (id, {rejectWithValue}) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
            method: 'DELETE',
        })

        if(!response.ok){
            return rejectWithValue('Cant delete new Task... Server Error!')
        }

        return id
    }
)

export const toggleTodo = createAsyncThunk<number, number, {rejectValue: string, state: {todos: TodoState}}>(
    'todos/toggleTodo',
    async function (id, {rejectWithValue, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id)

        if(todo){
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })

            if(!response.ok){
                return rejectWithValue('Cant toggle new Task... Server Error!')
            }

            return id
        }

        return rejectWithValue('No such todo...')
    }
)

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null
}

export const TodoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // addTodo: (state, action: PayloadAction<string>) => {
        //     state.todos.push({
        //         id: state.todos.length,
        //         title: action.payload,
        //         completed: false,
        //     })
        // },
        // removeTodo: (state, action: PayloadAction<number>) => {
        //     state.todos = state.todos.filter(todo => todo.id !== action.payload)
        // },
        // toggleTodo: (state, action: PayloadAction<number>) => {
        //     const toggled = state.todos.find(todo => todo.id === action.payload)
        //     if(toggled){
        //         toggled.completed = !toggled.completed
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
            })
            .addCase(addTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.unshift(action.payload)
            })
            .addCase(removeTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
            })
            .addCase(toggleTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const toggled = state.todos.find(todo => todo.id === action.payload)

                if(toggled){
                    toggled.completed = !toggled.completed
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.loading = false;
            })
    },
})

// export const {} = TodoSlice.actions;

export default TodoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}