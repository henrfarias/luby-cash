import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class FakeUserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'fakeuser@fake.com',
      password: 'fake',
      flag: 'client',
    })
  }
}
