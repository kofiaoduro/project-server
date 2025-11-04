const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ["GET, PUT, DELETE, POST"]
}

app.use(cors(corsOptions))


app.get('/menu', async (req, res)=>{
    try {
       const getItems = await pool.query('SELECT * FROM items WHERE special_feature = true;')
       const secondaryItems = await pool.query('SELECT * FROM items WHERE feature = true;')
       const items = getItems.rows || [];
       const secondaryFeature = secondaryItems.rows || [];
        if (items.length && secondaryFeature) {
            res.json({ status: 200, items, secondaryFeature });
        } else {
            res.json({ status: 404, message: "No items found" });
        }    
      //  console.log(secondaryItems.rows)
    } catch (error) {
        console.log(error)
    }
   
})

app.get('/menu/:id', async (req, res)=>{
    const { id } = req.params
    try {
        const getItems = await pool.query('SELECT * FROM items WHERE category = $1;', [id])
        const items = getItems.rows || []
        if(items.length){
            res.status(200).json({status: 'Ok', items})
        }
        else{
             res.json({ status: 404, message: "No items found" });
        }
    } catch (e) {
        console.log(e)
    }
    console.log(id)
})


app.listen(3000, ()=>{
    console.log('Listning on port', 3000)
})