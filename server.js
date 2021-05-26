const express = require('express')
const app = express()
const sesssion = require('express-session')
const ejs = require('ejs')
const passport = require('./passport')
const checkAuth = require('./checkAuth')
const Discord = require('discord.js')
const client = new Discord.Client()




client.on('ready', () => console.log(`Bot listo! -> ${client.user.tag}`))


const config = {
  "TOKEN": "token bot",
 "SECRET": "auth.discord"
}

// settings

app.set('port', 5050 || 6060) 
app.set('view engine', 'ejs') 


// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(session({
  secret: config.SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())




// rutas

app.get('/', (req, res) => {
res.render('home', {
 user: req.user,
 client: client
})
})

app.use('/login', passport.authenticate("discord", { 
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/')
})

app.use('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
}) 

app.use('/perfil', checkAuth, (req, res) => {
  res.render('perfil', {
  user: req.user,
  client: client
  }
})
  
  
// Hacemos que corra el servidor de la web en el puerto anteriormente establecido. (Línea 23)
  
app.listen(app.get('port'), () => console.log(`Servidor listo! [Puerto: ${app.get('port')}]`))
