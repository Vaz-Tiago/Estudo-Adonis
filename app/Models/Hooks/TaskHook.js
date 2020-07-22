'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

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

  await Mail.send(
    ['emails.new_task'],
    { username, title, hasAttachmet: !!file },
    message => {
      message
        .to(email)
        .from('tiago.vaz@hotmail.com', 'Tiago | Assistencia ao usuario')
        .subject('Nova tarefa para você')

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}
