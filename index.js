// require or import
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// middle ware
app.use(cors());
app.use(express.json());


// jwt function
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'access forbidden' })
        }
        req.decoded = decoded
        next()
    })
}



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.udiez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect()
        const productCollection = client.db("gadgetFreak").collection("products");

        const orderCollection = client.db("gadgetFreak").collection("orders");

        //post data 
        app.post('/products', async (req, res) => {
            const newProduct = req.body
            const result = await productCollection.insertOne(newProduct)
            res.send(result)
        })

        // post order
        app.post('/orders', async (req, res) => {
            const newOrder = req.body
            const result = await orderCollection.insertOne(newOrder)
            res.send(result)
        })

        // post web token
        app.post('/login', async (req, res) => {
            const email = req.body
            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.send({ accessToken })
        })

        //get product
        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })

        //update product
        app.put('/products/:id', async (req, res) => {
            const id = req.params
            const updatedProduct = req.body
            const query = { _id: ObjectId(id) }
            const option = { upsert: true }
            const updatedDoc = {
                $set: updatedProduct
            }
            const result = await productCollection.updateOne(query, updatedDoc, option)
            res.send(result)
        })

        //get orders
        app.get('/orders', verifyJWT, async (req, res) => {
            const decodedEmail = req.decoded.email
            const email = req.query.email;

            if (email === decodedEmail) {
                const query = { email: email }
                const cursor = orderCollection.find(query)
                const orders = await cursor.toArray()
                res.send(orders)
            }
            else {
                res.status(403).send({ message: 'access forbidden' })
            }

        })

        //delete order
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await orderCollection.deleteOne(query)
            res.send(result)

        })
    }
    finally {

    }

}

/* client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */



//get root
app.get('/', (req, res) => {
    res.send('Hello world from the backend');
})

//listen
app.listen(port, () => {
    console.log('yea! I can hear.');
})

run().catch(console.dir)