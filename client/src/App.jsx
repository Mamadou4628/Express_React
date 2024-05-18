import { useState, useEffect } from 'react'

import './App.css'

import Form from './components/Form'

function App() {

let [books, setBooks] = useState(null)
let [loading, setLoading] = useState(false)

// create an async function to get our list of books
let getBooks = async () => {
  try {
    setLoading(true)
    let response = await fetch("http://localhost:3000/books")
    let data = await response.json()
    console.log(data)
    setBooks(data)
    setLoading(false)
  } catch(error) {
    console.log(error)
  }
}



useEffect(()=>{
  if(!books){
    getBooks()
  } 
    
}, [])


let renderBooks = () => {
  // create jsx to represent the books
  if(books){
    return books.map((book, index)=>{
      return (
        <div key={index}>
          <h2> 
          {book.title}
          </h2>

          <h3>
          {book.author}
          </h3>
        </div>
      )
    })
  }  else {
    return <div>No books found!</div>
  }
}

let renderLoading = () => {
  return (
    <div> ...Loading </div>
  )
}


return (

  <div> 
      <h1>Welcome to Barnes and Noble</h1>
      <Form />
      <div>
        {loading ? renderLoading() : renderBooks()}
      </div>
  </div>
)
}

export default App
