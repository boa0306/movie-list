const express = require('express')
const movieList = require('./movies.json')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
  // res.send('<h1>This is my movie list built with Express</h1>')
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => {
    return movie.id.toString() === req.params.movie_id
  })
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase().trim())
  })

  res.render('index', { movies: movies, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})