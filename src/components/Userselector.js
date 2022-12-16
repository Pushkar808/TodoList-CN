import React, { useEffect, useState } from 'react'
import '../App.css'
import Addlist from './Addlist'
const Userselector = () => {
    const [data, setData] = useState();
    const [userId, setuserId] = useState();
    //use Effect hook to fetch data for the first time 
    useEffect(() => {
        console.log("OK")
        fetchAPI(1)//fetch API for user 1 on starting
    }, [])
    //function to fetchAPI from the user id to get the list
    const fetchAPI = (userId) => {
        return fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${userId}`)//fetch all the task for user id 1
            .then((response) => response.json())
            .then((json) => {
                setuserId(userId)
                setData(json)//setting the todo list data to the state
            });
    }
    return (
        <>
            <div className='container'>
                <div id="selectorContainer">
                    <select id="userSelector" onChange={(e) => { fetchAPI(e.target.value) }} >
                        {/* {fetching value on change of the list} */}
                        <option value={1} onClick={() => { fetchAPI(1) }}>user1</option>
                        <option value={2} onClick={() => { fetchAPI(2) }}>user2</option>
                        <option value={3} onClick={() => { fetchAPI(3) }}>user3</option>
                    </select>
                </div>
                {data && data.length > 0 && data.map((todoItem, index) => (
                    <li key={todoItem.id}>
                        <div>{todoItem.title}
                            {
                                todoItem.completed ?
                                    <i className="fa-solid fa-square-check"></i>
                                    :
                                    <i className="fa-solid fa-square-xmark"></i>
                            }
                        </div>
                    </li>
                ))}

            </div>
            <Addlist userId={userId} />
        </>
    )
}

export default Userselector
