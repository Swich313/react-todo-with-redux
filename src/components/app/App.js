import TodosList from '../todosList/TodosList';
import TodosAddForm from '../todosAddForm/TodosAddForm';
import TodosFilters from '../todosFilters/TodosFilters';

import './app.scss';
import {useState} from "react";

const App = () => {

     // const [filteredTodos, setFilteredTodos] = useState(null);
     //
     // const updateData = (value) => {
     //     setFilteredTodos(value);
     // }

    return (
        <main className="app">
            <div className="content">
                {/*<TodosList updateData={updateData}/>*/}
                <TodosList />
                <div className="content__interactive">
                    <TodosAddForm/>
                    {/*<TodosFilters filteredTodos={filteredTodos}/>*/}
                    <TodosFilters />
                </div>
            </div>
        </main>
    )
}

export default App;