import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { completeTodo, inCompleteTodo, deleteTodo, getAllTodos } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../services/AuthService';

const ListTodoComponent = () => {
    const [todos, setTodos] = useState([]);
    const navigator = useNavigate();
    const isAdmin = isAdminUser();

    useEffect(() => {
        listTodos()
    }, [])


    function listTodos() {
        getAllTodos().then(response => {
            setTodos(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewTodo(){
        navigator('/add-todo');
    }

    function updateTodo(todoId){
        navigator(`/update-todo/${todoId}`);
    }

    function removeTodo(todoId){
        deleteTodo(todoId).then(response => {
            listTodos();
            alert(response.data);
        }).catch(error => console.error(error))
    }

    function markCompleteTodo(todoId){
        completeTodo(todoId).then(response => {
            listTodos();
        }).catch(error => {
            console.error(error);
        })
    }

    function markIncompleteTodo(todoId){
        inCompleteTodo(todoId).then(response => {
            listTodos();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Todos</h2>
        { 
            isAdmin && 
            <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
        }
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Todo Id</th>
                    <th>Todo Title</th>
                    <th>Todo Description</th>
                    <th>Todo Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                todos.map(todo =>
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.title}</td>
                        <td>{todo.description}</td>
                        <td>{todo.completed ? 'YES': 'NO'}</td>
                        <td>
                        {
                            isAdmin &&
                            <button 
                                className='btn btn-info' 
                                onClick = {() => updateTodo(todo.id) }
                                >
                                Update
                            </button>
                        }
                        {
                            isAdmin &&
                            <button 
                                className='btn btn-danger' 
                                style={{marginLeft: '10px'}}
                                onClick = {() => removeTodo(todo.id) }
                                >
                                Delete
                            </button> 
                        }
                            <button 
                                className='btn btn-success' 
                                style={{marginLeft: '10px'}}
                                onClick = {() => markCompleteTodo(todo.id) }
                                >
                                Complete
                            </button>
                            <button 
                                className='btn btn-warning' 
                                style={{marginLeft: '10px'}}
                                onClick = {() => markIncompleteTodo(todo.id) }
                                >
                                Incomplete
                            </button>                       
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
    </div>
  )
}

export default ListTodoComponent