import test from 'japa'
import User from '../../app/Models/User'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Admins', () => {
  test('master admin must enter the table when init server', async (assert) => {
    const user = await User.findByOrFail('flag', 'admin')
    assert.exists(user)
  })

  test('Only one admin can register an admin', async () => {
    await supertest(BASE_URL)
      .post('/register-admin')
      .send({ email: 'teste@teste.com', password: 'admin', flag: 'admin' })
      .expect(401)
  })
})
