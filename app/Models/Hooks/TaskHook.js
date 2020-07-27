'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = (exports = module.exports = {})

TaskHook.sendNewTaskMail = async (taskInstance) => {
  // -> dirty -> grava dentro do model quais foram as novas alterações
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) {
    return
  }

  // -> .user().fetch() retorna apenas o usuario relacionado com a task
  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()

  const { title } = taskInstance

  // 1-> Param: Key do job
  // 2-> Param: Variaveis utilizadas pelo job
  // 3-> Param: Configurações do Kue
  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
