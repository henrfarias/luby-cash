import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminsController {
  private async authAdmin(auth: AuthContract) {
    const { flag } = auth.use('api').user!.toJSON()
    if (flag === 'admin') {
      return true
    }
  }

  public async index({}: HttpContextContract) {}

  public async store({ auth, request, response }: HttpContextContract) {
    this.authAdmin(auth) && response.unauthorized('Only admins can make this action')
    const { email, password } = request.only(['email', 'password'])
    const user = await User.create({
      email,
      password,
      flag: 'admin',
    })
    return user
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
