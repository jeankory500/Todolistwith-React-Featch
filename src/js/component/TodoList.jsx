import React, { useState, useEffect } from 'react'


const TodoList = () => {

    const [ inputValue, setInputValue] = useState("");

    const inputTextHandler = (e) => {
        setInputValue(e.target.value);
        };

    const [todos, setTodos] = useState([]);
    
    const handleDeleteTodo = (index) => {
            const newTodos = todos.filter((item, i) => i != index);
            setTodos(newTodos);
                console.log(newTodos, "deleteTodo")
            updateApi(newTodos);
        };

  

    const APIURL = 'https://assets.breatheco.de/apis/fake/todos/user/jeankory500';

    const getTasks = () => {
        fetch(APIURL) 
            .then ((response) => response.json())
            .then ((newTodo) => setTodos(newTodo))
        
    }

    console.log(todos)
    
    const submitTodoHandler = (incomingList) => {
      //  e.preventDefault();
        //const newTodo = [...todos, { label: inputValue, done: false }];
        const newTodos = [...incomingList, { label: inputValue, done: false}]
        console.log(newTodos, "inputTodo");
        updateApi(newTodos)
           // setInputValue("");
            };
    
        const updateApi = (newTodos) => {
            fetch(APIURL, {method: "PUT",
            body: JSON.stringify(newTodos),
            headers: {
            "Content-Type": "application/json",
            }})
            .then((response) => {
            response.status === 200 ? setTodos(newTodos) : ""
            });
        };

        useEffect(() => {getTasks();}, []);
    
        console.log(todos)
        
    return (
        <div className="container">
            <h1>My Todos</h1>
            <ul>
                <li>
                    <input      
                        type="text"
                        onChange={inputTextHandler}
                        value={inputValue}
                        placeholder= "What do you need done?">
                    </input>
                    <button type='submit' className='submitTo' onClick = {() => submitTodoHandler(todos)}>
                        Submit
                    </button>
                </li>


                {todos.map((item, i) =>  {
                console.log(item, "item") 
                return (
                <div key= {i}>
                        <ul>
                            <li >
                            <span>{item.label}</span><i 
                            className="fas fa-trash-alt"
                            onClick={() => handleDeleteTodo(i)}
                            >
                            </i>
                            </li>   
                        </ul>
                    </div>)
                    
                    
})}
        
            </ul>
            <div> {todos.length} task </div>
        </div>
  )

}


//add into array --> concat
//Delete from array --> filter 
// update --> map

export default TodoList