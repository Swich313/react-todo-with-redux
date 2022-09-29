import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { todoDeleted,
        todoArchived,
        todoToggleCompleted,
        fetchTodos,
        setCurrentPage,
        setFilteredTodosQuantity} from './todosSlice';
import {createSelector} from "@reduxjs/toolkit";

import TodosListItem from "../todosListItem/TodosListItem";
import Spinner from '../spinner/Spinner';
import './todoList.scss'
import 'dotenv/config';
import {useTranslation} from "react-i18next";


const TodosList = () => {                       //нужно прокинуть props.updateData

    const filteredTodosSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.todos.todos,
        (filter, todos) => {
            if (filter === 'all') {
                return todos.filter(item => item.type !== "done");
            } else {
                return todos.filter(item => item.type === filter);
            }
        }
    );
    const filteredTodos = useSelector(filteredTodosSelector);
    const {todos, todosLoadingStatus, currentPage, perPage} = useSelector(state => state.todos);
    const {activeFilter} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const {request} = useHttp();
    const {t} = useTranslation();
    const style = {textAlign: 'center', marginTop: '5px'};
    const filteredTodosQuantity = filteredTodos.length;
    const pagesQuantity = Math.ceil(filteredTodosQuantity / perPage);
    const pages = [];
    for (let i = 1; i<=pagesQuantity; i++){
        pages.push(i)
    }
    // console.log({currentPage, filteredTodosQuantity})

    useEffect(() => {
        dispatch(setFilteredTodosQuantity(filteredTodosQuantity));
        if ((currentPage === pagesQuantity || ((filteredTodosQuantity/perPage)) - pagesQuantity) === 0 && filteredTodosQuantity !== 0) {
            dispatch(setCurrentPage(Math.ceil(filteredTodosQuantity / perPage)))
        }
        // eslint-disable-next-line
    }, [filteredTodosQuantity]);

     useEffect(() => {
         dispatch(fetchTodos())
             .then(res => setFilteredTodosQuantity(res.payload.length));
        // eslint-disable-next-line
    }, []);



    const onDeleteTodo = useCallback((id, todos) => {

        request(`${process.env.REACT_APP_REQUEST_URL}todos/${id}`, "DELETE")
                .then(data => console.log(data, 'Deleted'))
                .then(dispatch(todoDeleted(id)))
                .catch(err => console.log(err))
    }, [request]);

    const onArchiveTodo = useCallback((id) => {
        request(`${process.env.REACT_APP_REQUEST_URL}todos/${id}`,
                "PATCH",
                JSON.stringify({
                    "type": "done",
                    "archived": true
                }))
            .then(data => console.log(data, "Patched"))
            .then(dispatch(todoArchived(id)))
            .catch(err => console.log(err));
    }, [request]);

    const onCompleteTodo = useCallback((id, todos) => {
        const selectedTodo = todos.find(item => item._id === id);
        const completed = {"completed": !selectedTodo.completed};
        request(`${process.env.REACT_APP_REQUEST_URL}todos/${id}`,
            "PATCH",
            JSON.stringify(completed))
            .then(data => console.log(data, "Patched"))
            .then(dispatch(todoToggleCompleted(id)))
            .catch(err => console.log(err))
    }, [request]);


    if (todosLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (todosLoadingStatus === "error") {
        return <h5 style={style}>{t('downloading_error')}</h5>
    }

    const renderTodosList = (arr, filter, currentPage, perPage) => {
        if (arr.length === 0 && filter !== 'done') {
            return <h5 style={style}>{t('no_todo_yet')}</h5>
        } else if (arr.length === 0){
            return <h5 style={style}>{t('no_completed_todo_yet')}</h5>
        }
        let start = (currentPage - 1) * perPage;
        let stop = currentPage * perPage;
        const shortenArr = arr.slice(start, stop);
        return shortenArr.map(({_id, ...props}) => {
            return (
                <TodosListItem
                    key={_id}
                    {...props}
                    id={_id}
                    onArchiveTodo={() => onArchiveTodo(_id)}
                    onDeleteTodo={() => onDeleteTodo(_id, filteredTodos)}
                    onCompleteTodo={() => onCompleteTodo(_id, todos)}/>
            )
        })
    }

    const elements = renderTodosList(filteredTodos, activeFilter, currentPage, perPage);
    return (
        <ul>
            {elements}
            <div className="pages">
                {pages.map((page, i) => {
                    return (
                        <span key={i}
                              className={currentPage === page && pages.length > 1 ? "page active_page" : pages.length > 1 ? "page" : "invisible"}
                              onClick={() => {dispatch(setCurrentPage(page))}}>
                            {page}
                        </span>
                    )
                })}
            </div>
        </ul>
    )
}

export default TodosList;