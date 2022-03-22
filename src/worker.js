const {parentPort, workerData} = require("worker_threads");

parentPort.postMessage(concatLikes(workerData.users))

function concatLikes(users) {
  console.log('worker concatLikes started')
  return users.reduce((res, user) => {
    res = res.concat(user.like)
    
    return res
  }, [])
}
