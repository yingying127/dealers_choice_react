const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/icecream_db');

const Brand = sequelize.define('brand', {
    name: {
        type: Sequelize.STRING
    },
    flavor: {
        type: Sequelize.STRING,
        defaultValue: 'vanilla'
    }
})

const syncAndSeed = async() => {
    try {
        await sequelize.sync({ force: true })
        await Promise.all([
            Brand.create({ name: `Ben & Jerry's`, flavor: 'Half Baked' }),
            Brand.create({ name: 'Häagen-Dazs', flavor: 'Coffee' }),
            Brand.create({ name: 'Turkey Hill', flavor: 'Choco Mint Chip' }),
            Brand.create({ name: 'Halo Top', flavor: 'Chocolate Chip Cookie Dough' }),
            Brand.create({ name: 'Breyers', flavor: 'Chocolate Pretzel Swirl' }),
            Brand.create({ name: 'Talenti', flavor: 'Sicilian Pistachio' }),
            Brand.create({ name: 'Magnum', flavor: 'Double Caramel' }),


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