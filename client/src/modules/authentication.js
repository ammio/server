'use strict'

export async function login (username, password) {
  const response = await fetch('/api/authentication', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username, password: password }) })
  const login = await response.json()
  console.log(login)
  if (login.authentication) {
    localStorage.setItem('authentication', login.authentication)
    localStorage.setItem('token', login.token)
    localStorage.setItem('user', JSON.stringify(login.user))
    localStorage.setItem('admin', login.admin)
    return true
  } else {
    return false
  }
}

export async function logout () {
  localStorage.removeItem('authentication')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('admin')
  return true
}
