'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  // Define quantos jobs pode ser executado simultaneamente
  static get concurrency () {
    return 1
  }

  // Chave unica para cada job da aplicação
  // Gerada automaticamente
  static get key () {
    return 'NewTaskMail-job'
  }

  // Lógica do job, nesse caso, enviar um email
  // Código retido de Hook/TaskHook.js
  async handle ({ email, username, title, file }) {
    console.log(`Job; ${NewTaskMail.key}`)
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
}

module.exports = NewTaskMail
