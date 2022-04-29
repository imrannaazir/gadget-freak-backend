// 1st step backend
/*
 app.post('/login', async (req, res) => {
            const email = req.body
            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.send({ accessToken })
        })
*/

//2nd step frontend
/*
 if (user) {
        const postToken = async () => {
            const email = user?.email;
            if (email) {
                const { data } = await axios.post('http://localhost:5000/login', { email })
                localStorage.setItem('accessToken', data.accessToken)
            }
        }
        postToken()

        navigate(from, { replace: true });
    }
*/

//step 3 : send authorization through headers
/*

 useEffect(() => {
        async function loadOrders() {
            const email = user.email
            try {
                const { data } = await axios.get(`http://localhost:5000/orders?email=${email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })


                setOrders(data)
            }
            catch (error) {
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth)
                    navigate('/login')
                }
            }
        }
        loadOrders()
    }, [])
    */

    // make a function named verifyJWT on backed
/* function verifyJWT(req, res, next) {
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
*/

//verify when load data
/* 
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
*/