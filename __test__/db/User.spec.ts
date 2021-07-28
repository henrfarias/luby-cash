import test from 'japa'
import User from '../../app/Models/User'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Admins', () => {
  test('master admin must enter the table when init server', async (assert) => {
    const user = await User.findByOrFail('flag', 'admin')
    assert.exists(user)
  })

  test('admin must be authenticated', async () => {
    const user = { email: 'admin@unauthorized.com', password: 'admin', flag: 'admin' }
    await supertest(BASE_URL)
      .post('/register-admin')
      .send(user)
      .set('Authorization', '')
      .expect(401)
  })

  test('Only one admin can register an admin', async () => {
    const user = { email: 'fakeuser@fake.com', password: 'fake' }
    const newAdmin = { email: 'newadmin@admin.com', password: 'admin' }
    const response = await supertest(BASE_URL).post('/login').send(user)
    console.log(response.body)
    await supertest(BASE_URL)
      .post('/register-admin')
      .send(newAdmin)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(401)
  })

  // test('If admin not exist should return unauthorized', async () => {
  //   const fakeAdmin = { email: 'fakeadmin@fake.com', password: 'fakeAdmin', flag: 'admin' }
  //   await supertest(BASE_URL).post('/register-admin').send(fakeAdmin).expect(401)
  // })
})
