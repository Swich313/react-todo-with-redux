import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import classNames from "classnames";

import {fetchFilters, filtersChanged} from "./filtersSlice";
import Spinner from "../spinner/Spinner";

import './todosFilters.scss'


const TodosFilters = () => {                                //нужно прокинуть пропсы props.filteredTodos

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const style = {textAlign: 'center', marginTop: '5px'};

    const filteredTodosSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.todos.todos,
        (filter, todos) => {
            if (filter === 'all') {
                return todos;
            } else {
                return todos.filter(item => item.type === filter);
            }
        }
    );

    const filteredTodos = useSelector(filteredTodosSelector);

    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />
    } else if(filtersLoadingStatus === 'error') {
        return <h5 style={style}>Downloading Error</h5>
    }

    const renderFilters = arr => {
        if(arr.length === 0){
            return <h5 style={style}>Filters not found</h5>
        }
        return arr.map(({name, className, id}) => {
            const btnClass = classNames('button', className, {
                'active_filter' : name === activeFilter,
                'btn-data-count' : name === activeFilter
            });
            console.log(activeFilter)
            return <button
                        key={id}
                        className={btnClass}
                        data-count={filteredTodos.length}
                        onClick={() => dispatch(filtersChanged(id))}>{name}</button>
        })
    }

    const element = renderFilters(filters);

    return (
        <div className="container">
            <div className="container__inner">
                <p>Filter your todos</p>
                <div className="button_group">
                    {element}
                </div>
            </div>
        </div>
    )
}

export default TodosFilters;