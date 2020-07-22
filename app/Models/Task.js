'use strict'

const Model = use('Model')

class Task extends Model {
  // Constructor
  static boot () {
    super.boot()

    // -> Chama o hook depois de alterar a tabela.
    // -> Que por usa vez chama o hook.Metodo que criamos
    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }

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
