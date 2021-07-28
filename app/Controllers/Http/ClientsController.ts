import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientsController {
  private async authAdmin(auth: AuthContract) {
    const { flag } = auth.use('api').user!.toJSON()
    if (flag === 'admin') {
      return true
    }
    return false
  }

  public async index({ auth, response }: HttpContextContract) {
    !this.authAdmin(auth) && response.unauthorized('Only admins can make this action')
    // const { status } = request.only(['status'])
  }

  public async create({ request }: HttpContextContract) {
    const user = request.only([
      'full_name',
      'email',
      'phone',
      'cpf_number',
      'address',
      'city',
      'state',
      'zipcode',
      'current_balance',
      'average_salary',
    ])
    console.log(user)
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
