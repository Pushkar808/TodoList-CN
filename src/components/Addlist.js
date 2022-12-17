import React, { useState } from 'react'

export default function Addlist(props) {
  //title/body:to store the title/body for the create/update
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  //function to show a small pop up like message
  function showToast(title, body, note) {
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
        showToast(json.title, json.body, "added");
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
      .then((response) => {
        response.json();
        console.log(response.status)
      })
      .then((json) => {
        showToast(json.title, json.body, "updated");
      });
  }
  function deleteResponse() {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status == 200) {//if we get reponse 200 i.e we have executed delete request
          document.getElementById('response').innerHTML =
          `
          <div id="toast"> 
          <p>Data has been <b>deleted</b> by the user ${props.userId}</p>
          </div>
          `
          setTimeout(() => document.getElementById('response').innerHTML = "", 2000);
        }
      })
  }
  return (
    <div>
      <div id="response">
      {/* Toast message will be seen here */}
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
        <div className='input-field'>
          <button onClick={deleteResponse}>Delete Response</button>
        </div>
      </div>
    </div>
  )
}
