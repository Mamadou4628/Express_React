const express = require('express')

const cors = require('cors')

const app = express()

const port = 3000

// middleware for parsing json data on the server
app.use(express.json())

// middleware for using cors
// app.use(cors()) // add cors to all routes (not best practice)

let corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
} // restrict cors to specific origins

app.get('/', (req, res)=>{
    res.json({ info: 'This is a Node/Express App'})
})


// CREATE - allow a user to create a new book in our list
app.options('/books', cors()) // enable pre-flight request for POST request

app.post('/books', cors(corsOptions), (req, res)=>{
    // analyze the request body for data sent by the client

    let {author, title} = req.body 
    // let author = req.body.author
    // let title = req.body.title

    if(author && title) {
        // do something!
        console.log(`Creating a new book! ${title} by ${author}`)
        res.json({id: 1, title, author})
        
    } else {
        console.log("Error creating book!")
        res.status(400).send("Error creating book! Books need a title and author!")
    }

})

// READ - allow a user to read a list of our data
app.get('/books', cors(), (req, res) => {
    let data = [
        {
            author: "Julie Cameron",
            title: "The Artist Way"
        }, {
            author: "Eckert Tolle",
            title: "The Power of Now"
        },
        {
            author: "Thich Nhat Hanh",
            title: "Peace is in every step"
        }
    ]
    res.json(data)
})



app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})