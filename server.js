const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/icecream_db');

const Brand = sequelize.define('brand', {
    name: {
        type: Sequelize.STRING
    }
})

const express = require('express')
const app = express()
const path = require('path');

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
        await sequelize.sync({ force: true })
        await Promise.all([
            Brand.create({ name: `Ben & Jerry's` }),
            Brand.create({ name: 'Häagen-Dazs' }),
            Brand.create({ name: 'Turkey Hill' }),
            Brand.create({ name: 'Halo Top' })
        ])

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch(ex) {
        console.log(ex)
    }
}

init()