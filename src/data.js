const range = require('lodash.range');

const USERS_COUNT = 100000

const user = {
  name: 'Nik',
  email: 'nik@mail.com',
  like: 10
}

const users = range(USERS_COUNT).reduce((res, users) => {
  res.push(user)

  return res
}, [])

module.exports = {
  user,
  users
}
