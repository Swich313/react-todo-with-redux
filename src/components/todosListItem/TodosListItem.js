import {useState} from "react";

import './todosListItem.scss';

const TodosListItem = (props) => {
    const {title, description, type, id, completed, onDeleteTodo, onCompleteTodo} = props;
    let typeClassName;
    const [visibility, setVisibility] = useState(null);

    switch (type) {
        case 'home':
            typeClassName = `bg__${type}`;
            break;
        case 'work':
            typeClassName = `bg__${type}`;
            break;
        case 'hobby':
            typeClassName = `bg__${type}`;
            break;
        case 'other':
            typeClassName = `bg__${type}`;
            break;
        default:
            typeClassName = 'bg__default';
    }

    return (
        <li 
            className={`todo_item ${typeClassName}`}>
            <div className="todo_item__checkbox-rect">
                <input type="checkbox" id={id} name="check" checked={completed} onChange={onCompleteTodo}/>
                <label htmlFor={id} className={completed?'crossed':null}>{title}</label>
            </div>
            <div className={`todo_item__text ${completed?'crossed':null}`}>
                {description}
            </div>
            <button type="button" className="close_btn" aria-label="Close" onClick={(e) =>{
                if(completed){
                    onDeleteTodo();
                }
                setVisibility('visible');
                setTimeout(()=> {setVisibility(null);}, 5000);
            }}>x
                <span className={`close_btn__tooltip ${visibility}`}>Complete this todo first</span>
            </button>
        </li>
    )
}

export default TodosListItem;