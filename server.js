const { sequelize, syncAndSeed, models: { Brand } } = require('./db')
const express = require('express')
const app = express()
const path = require('path');

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/icecream', async(req, res, next) => {
    try {
        res.send(await Brand.findAll())
    }
    catch(ex) {
        next(ex)
    }
})


const init = async() => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch(ex) {
        console.log(ex)
    }
}

init()