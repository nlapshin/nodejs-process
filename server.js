const express = require('express')
const data = require('./data')

const app = express()

const PORT = process.env.PORT || 4000

app.get('/fast', (req, res) => {
  return res.status(200).send(data.user)
})

app.get('/slow', (req, res) => {
  console.time('slow')

  const likes = concatLikes(data.users)

  console.timeEnd('slow')

  return res.status(200).send({ likes })
})

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server started on ${PORT} port`)
  }
})

function concatLikes(users) {
  return users.reduce((res, user) => {
    res = res.concat(user.like)
    
    return res
  }, [])
}
