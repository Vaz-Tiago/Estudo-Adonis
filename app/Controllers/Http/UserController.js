'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    // Salvando também no relacionamento
    const addresses = request.input('addresses')

    // Criar um transaction, se uma das inserções falahar, nada é inserido
    // -> Passa como segundo parametro de toda persistencia de dados
    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)
    // Como recebe uma array, tem de ser o createMany.
    await user.addresses().createMany(addresses, trx)

    // Salva tudo no banco
    await trx.commit()

    return user
  }
}

module.exports = UserController
