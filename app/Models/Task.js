'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  // Pertence a um projeto
  project () {
    return this.belongsTo('App/Models/Project')
  }

  // Pertence a um usuário
  user () {
    return this.belongsTo('App/Models/User')
  }

  // Pode ter um arquivos
  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
