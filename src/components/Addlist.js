import React, { useState } from 'react'

export default function Addlist(props) {

  const [title, settitle] = useState("");
  const [body, setbody] = useState("");


  //function to show a small pop up like message
  function showToast(title, body,note) {
    document.getElementById('response').innerHTML = `
    <div id="toast"> 
    <p>Following data has been <b>${note}</b> by the user ${props.userId}</p>
    <p>Title: ${title}</p>
    <p>Body: ${body}</p>
    </div>
    `
    setTimeout(() => document.getElementById('response').innerHTML = "", 2000);
  }

  function createResponse() {
    //create response request
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: props.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        showToast(json.title, json.body,"added");
      });
  }
  function updateResponse() {
    //update response request
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: title,
        body: body,
        userId: props.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        showToast(json.title, json.body,"updated");
      });
  }
  return (

    <div>
      <div id="response">

      </div>
      <div className='form-container'>
        <div className='input-field'>
          <label htmlFor="title">Title: </label>
          <input id="title" type={"text"} onChange={(e) => { settitle(e.target.value) }} />
        </div>
        <div className='input-field'>
          <label htmlFor="title">Body: </label>
          <textarea id="title" type={"text"} onChange={(e) => { setbody(e.target.value) }} />
        </div>
        <div className='input-field'>
          <button onClick={createResponse}>Create Response</button>
        </div>
        <div className='input-field'>
          <button onClick={updateResponse}>Update Response</button>
        </div>
      </div>
    </div>
  )
}
