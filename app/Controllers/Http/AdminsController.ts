import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminsController {
  public async index({}: HttpContextContract) {}

  public async store({ auth, request, response }: HttpContextContract) {
    const { flag } = auth.use('api').user!.toJSON()
    if (flag !== 'admin') {
      response.unauthorized('Only admins can make this action')
    }
    const { email, password } = request.only(['email', 'password'])
    const user = await User.create({
      email,
      password,
      flag: 'admin',
    })
    return user
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
