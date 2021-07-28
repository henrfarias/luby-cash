import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminsController {
  private async authAdmin(auth: AuthContract) {
    const { flag } = auth.use('api').user!.toJSON()
    if (flag === 'admin') {
      return true
    }
    return false
  }

  public async index({ auth, response }: HttpContextContract) {
    !this.authAdmin(auth) && response.unauthorized('Only admins can make this action')
    const admins = await User.query().where('flag', 'admin')
    return admins
  }

  public async store({ auth, request, response }: HttpContextContract) {
    !this.authAdmin(auth) && response.unauthorized('Only admins can make this action')
    const { email, password } = request.only(['email', 'password'])
    const user = await User.create({
      email,
      password,
      flag: 'admin',
    })
    return user
  }

  public async update({ auth, request, response }: HttpContextContract) {
    !this.authAdmin(auth) && response.unauthorized('Only admins can make this action')
    const admin = await User.findOrFail(auth.use('api').user?.id)
    const data = request.only(['email', 'password'])
    admin.merge(data)
    await admin.save()

    return admin
  }

  public async destroy({ auth, response }: HttpContextContract) {
    !this.authAdmin(auth) && response.unauthorized('Only admins can make this action')
    const admin = await User.findOrFail(auth.use('api').user?.id)
    admin.delete()
  }
}
