import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";

import {fetchFilters, filtersChanged} from "./filtersSlice"
import {setCurrentPage} from "../todosList/todosSlice";
import Spinner from "../spinner/Spinner";

import './todosFilters.scss'


const TodosFilters = () => {                                //нужно прокинуть пропсы props.filteredTodos

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const {filteredTodosQuantity} = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const style = {textAlign: 'center', marginTop: '5px'};
    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />;
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
            return <button
                        key={id}
                        className={btnClass}
                        data-count={filteredTodosQuantity}
                        onClick={() => {
                            dispatch(setCurrentPage(1));
                            dispatch(filtersChanged(id));
                        }}>{name}</button>
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