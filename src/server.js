const express = require('express')
const {Worker} = require("worker_threads")
const data = require('./data')

const PORT = process.env.PORT || 4000

function server() {
  const app = express()

  app.get('/fast', (req, res) => {
    return res.status(200).send(data.user)
  })

  app.get('/slow', (req, res) => {
    console.time('slow')

    const likes = concatLikes(data.users)

    console.timeEnd('slow')

    return res.status(200).send({ likes })
  })

  app.get('/slow-thread', (req, res) => {
    console.time('slow-thread')

    const worker = new Worker("./src/worker.js", {workerData: {users: data.users}});

    //Listen for a message from worker
    worker.once("message", likes => {
      res.status(200).send({ likes })

      console.timeEnd('slow-thread')
    });

    worker.on("error", error => {
      console.log(error);
    });

    worker.on("exit", exitCode => {
      console.log(exitCode);
    })
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
}

if (module.parent) {
  module.exports = server
} else {
  server()
}
