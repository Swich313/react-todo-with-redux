import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {useTranslation} from "react-i18next";
import {fetchFilters, filtersChanged} from "./filtersSlice"
import {setCurrentPage} from "../todosList/todosSlice";
import Spinner from "../spinner/Spinner";

import './todosFilters.scss'


const TodosFilters = () => {                                //нужно прокинуть пропсы props.filteredTodos

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const {filteredTodosQuantity} = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const style = {textAlign: 'center', marginTop: '5px'};
    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />;
    } else if(filtersLoadingStatus === 'error') {
        return <h5 style={style}>{t('not_found')}</h5>
    }

    const renderFilters = arr => {
        if(arr.length === 0){
            return <h5 style={style}>{t('downloading_error')}</h5>
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
                        }}>{t(`filter_${name}`)}</button>
        })
    }

    const element = renderFilters(filters);

    return (
        <div className="container">
            <div className="container__inner">
                <p>{t('filters_title')}</p>
                <div className="button_group">
                    {element}
                </div>
            </div>
        </div>
    )
}

export default TodosFilters;