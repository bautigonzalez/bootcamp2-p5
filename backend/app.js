const db = require('./db')
const express = require('express')
const routes = require('./routes')
const app = express()
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const cors = require('cors')

const port = 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(volleyball)

app.use('/api', routes)

app.use((err, req, res, next) => {
    res.status(500).send('Internal server error')
})

db.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Bootcamp2 listening on port ${port}!`)
    })
})

module.exports = app
