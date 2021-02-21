'use strict'

export async function login (username, password) {
  const response = await fetch('/api/authentication', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username, password: password }) })
  const json = await response.json()
  if (response.status === 200) {
    localStorage.setItem('token', json.token)
  } else {
    throw new Error(json.message)
  }
}

export async function logout () {
  localStorage.removeItem('token')
  return true
}
