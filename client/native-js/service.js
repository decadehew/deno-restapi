// @ts-nocheck
const api = 'http://localhost:6060'


const headers = {
  'Accept': 'application/json'
}

const get = (bookId) =>
  fetch(`${api}/dogs/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data)

const getAll = () =>
  fetch(`${api}/dogs`, { headers })
    .then(res => res.json())
    .then(data => data)


window.services = {
  get,
  getAll
}
