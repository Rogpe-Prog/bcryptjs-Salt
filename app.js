const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

app.use(express.urlencoded({ extended: true }))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

let passes = []
let hashes = []

app.get('/', (req, res) => {
    res.render('index', { passes, hashes })
})
app.post('/bcr', (req, res) => {

    const { password } = req.body
    passes.push(password)

    const hash = bcrypt.hashSync( password, salt)
    hashes.push(hash)

    res.redirect('/')
})

app.listen(port, () => console.log('online...'))
