import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


const initialState = {
    todos: [],
    todosLoadingStatus: 'idle'
}

export const fetchTodos = createAsyncThunk(
    'todos/FetchTodos',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/todos');
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoCreated: (state, action) => {
            state.todos.push(action.payload);
        },
        todoDeleted: (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload);
        },
        todoToggleCompleted: (state, action) => {
            state.todos[action.payload].completed = !state.todos[action.payload].completed;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, state => {state.todosLoadingStatus = 'loading'})
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todosLoadingStatus = 'idle';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, state => {state.todosLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = todosSlice;

export default reducer;
export const {
    todoCreated,
    todoDeleted,
    todoToggleCompleted,
    todosFetching,
    todosFetched,
    todosFetchingError
} = actions;