import {useState} from 'react'

function Form(){

    const [author, setAuthor] = useState("")
    const [title, setTitle] = useState("")

    let handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    let handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    // create an async function to create a new book
    let createBook = async (event) => {
        event.preventDefault()

        // call our server to create a book!
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({author, title});

        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        try {
           let response = await fetch("http://localhost:3000/books", requestOptions)
            let result = await response.json()
            console.log(result)
            alert("We successfully added your book!")
            setAuthor("")
            setTitle("")
        } catch(error){
             console.log('error', error)
        }
    

    }

    return (
        <form>
            <h2>Add a book!</h2>
            <label>
                Title
                <input type="text" onChange={handleTitleChange} value={title}/>
            </label>

            <br/>
            <label>
                Author
                <input type="text" onChange={handleAuthorChange} value={author}/>
            </label>

            <br/>

            <button onClick={createBook}>Submit</button>

        </form>
    )
}

export default Form