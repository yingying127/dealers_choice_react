const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/icecream_db');

const Brand = sequelize.define('brand', {
    name: {
        type: Sequelize.STRING
    }
})

const syncAndSeed = async() => {
    try {
        await sequelize.sync({ force: true })
        await Promise.all([
            Brand.create({ name: `Ben & Jerry's` }),
            Brand.create({ name: 'Häagen-Dazs' }),
            Brand.create({ name: 'Turkey Hill' }),
            Brand.create({ name: 'Halo Top' })
        ])
    }
    catch(ex) {
        console.log(ex)
    }
}

module.exports = {
    sequelize,
    syncAndSeed,
    models: {
        Brand
    }
}