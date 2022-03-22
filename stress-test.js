const autocannon = require('autocannon')

startBench()

function startBench () {
  const instance = autocannon({
    url: 'http://localhost:4000',
    connections: 100,
    duration: 10,
    debug: true,
    requests: [
      {
        method: 'GET',
        path: '/fast'
      }
    ]
  }, finishedBench)

  autocannon.track(instance)

  process.once('SIGINT', () => {
    instance.stop()
  })
}

function finishedBench (err, res) {
  // console.log('finished bench', err, res)
}
