import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ auth, response }: HttpContextContract) {
    const { flag } = auth.use('api').user!.toJSON()
    if (flag !== 'admin') {
      response.unauthorized('Only admins can make this action')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
