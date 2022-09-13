import TodosList from '../todosList/TodosList';
import TodosAddForm from '../todosAddForm/TodosAddForm';
import TodosFilters from '../todosFilters/TodosFilters';
import TodoCalendar from "../todoCalendar/TodoCalendar";

import './app.scss';

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
                    <TodoCalendar />
                </div>
            </div>
        </main>
    )
}

export default App;