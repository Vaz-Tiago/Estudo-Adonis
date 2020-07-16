'use strict'

const Antl = use('Antl')

class User {
  // Faz com que todos os campos sejam validados ao mesmo tempo,
  // Retornando todas as mensagens de erro de uma vez
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
