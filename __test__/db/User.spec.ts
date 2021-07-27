import test from 'japa'
import User from '../../app/Models/User'

test.group('Admins', () => {
  test('master admin must enter the table when init server', async (assert) => {
    const user = await User.findByOrFail('flag', 'admin')
    assert.exists(user)
  })
})
