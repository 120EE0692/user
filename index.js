const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs')

let comments = []

app.get('/users', (req, res) => {
    res.render('users/index', { comments })
})

app.get('/users/all', (req, res) => {
    res.render('users/table', { comments })
})

app.get('/users/:id/one', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('users/tableuser', { comment })
})

app.get('/users/new', (req, res) => {
    res.render('users/new');
})

app.post('/users', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/users');
})

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('users/show', { comment })
})

app.get('/users/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('users/edit', { comment })
})

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const found = comments.find(c => c.id === id)
    found.comment = newCommentText;
    res.redirect('/users')
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/users');
})


app.listen(3000, () => {
    console.log("Listen on port 3000");
})