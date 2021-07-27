import test from 'japa'

test.group('Example', () => {
  test('assert num', (assert) => {
    assert.equal(2 + 2, 4)
  })
})
