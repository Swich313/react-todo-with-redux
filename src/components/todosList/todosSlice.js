import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";
import 'dotenv/config';

const initialState = {
    todos: [],
    todosLoadingStatus: 'idle',
    filteredTodosQuantity: 0,
    currentPage: 1,
    perPage: 7,
    todoDeadline: ""
}
// const _baseOffset = 0;

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const {request} = useHttp();
        return await request(`${process.env.REACT_APP_REQUEST_URL}todos`);
    }
);

// export const fetchTodos = createAsyncThunk(
//     'todos/fetchTodos',
//     async ({offset = _baseOffset, quantityToLoad}) => {
//         const {request} = useHttp();
//         // return await request(`http://localhost:3001/todos?_start=${offset}&_limit=${quantityToLoad}`);
//     }
// );

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoCreated: (state, action) => {
            state.todos.push(action.payload);
        },
        todoDeleted: (state, action) => {
            // state.completedTodos.push(state.todos.filter(item => item.id === action.payload));
            // state.completedTodos.find(item => item.id === action.payload).type = "done";
            state.todos = state.todos.filter(item => item.id !== action.payload);
        },
        todoArchived: (state, action) => {
            const selecterTodoById = state.todos.find(item => item.id === action.payload);
            selecterTodoById.type = "done";
            selecterTodoById.archived = true;
        },
        todoToggleCompleted: (state, action) => {
            state.todos.find(item => item.id === action.payload).completed = !state.todos.find(item => item.id === action.payload).completed;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
         setFilteredTodosQuantity: (state, action) => {
            state.filteredTodosQuantity = action.payload;
         },
        setTodoDeadline: (state, action) => {
            state.todoDeadline = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, state => {state.todosLoadingStatus = 'loading'})
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todosLoadingStatus = 'idle';
                state.todos = action.payload;
                // state.totalQuantityTodos = state.todos.length;
            })
            .addCase(fetchTodos.rejected, state => {state.todosLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = todosSlice;

export default reducer;
export const {
    todosFetching,
    todosFetched,
    todosFetchingError,
    todoCreated,
    todoDeleted,
    todoArchived,
    todoToggleCompleted,
    setCurrentPage,
    setFilteredTodosQuantity,
    setTodoDeadline
} = actions;