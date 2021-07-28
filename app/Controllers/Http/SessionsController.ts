import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password, {
        name: 'login',
        expiresIn: '2min',
      })
      return token
    } catch (error) {
      return response.badRequest('Invalid credentials')
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoke: true,
    }
  }
}
