'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  // Criando relacionamento

  // Um projeto pertence a um usuário
  user () {
    return this.belongsTo('App/Models/User')
  }

  // Um projeto pode conter muitas tarefas
  tasks () {
    return this.hasMany('App/Model/Task')
  }
}

module.exports = Project
