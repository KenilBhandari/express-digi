import express from 'express'

const app = express()

const port = 3000

// app.get("/", (req, res)=>{
//     res.send("Hello World")
// })

// app.get("/kenil", (req, res)=>{
//     res.send("Kenil Page")
// })

// app.get("/bhandari", (req, res)=>{
//     res.send("Bhandari Page")
// })


app.use(express.json())

let teaData = []
let NextId = 1


//add a tea
app.post('/teas',(req,res)=>{
    const {name, price} = req.body
    const newTea = {id: NextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all teas
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData)
})

//get tea with id
app.get("/teas/:id",(req,res)=>{
    // const tea = teaData.find(t => t.id === parseInt(req.params.id))
    const tea = teaData[(parseInt(req.params.id))-1]
    if (!tea) {
        res.status(404).send("Tea Not Found")
    }
    res.status(200).send(tea)
})

//update tea with id
app.put("/teas/:id",(req,res)=>{
    const tea = teaData[(parseInt(req.params.id))-1]
    if (!tea) {
        res.status(404).send("Tea Not Found")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

//delete tea with id
app.delete("/teas/:id",(req,res)=>{
    const tea = teaData.splice(((parseInt(req.params.id)-1)),1)
    if (!tea) {
        return res.status(404).send("Tea Not Found")
    }
    teaData.forEach((tea, index) => {
        tea.id = index + 1; 
    });

    res.status(200).send("Deleted")

})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}...`);
})