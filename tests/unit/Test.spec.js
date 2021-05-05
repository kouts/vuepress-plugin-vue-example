// eslint-disable-next-line no-unused-vars
import { waitNT, waitRAF } from '../utils'

describe('Hello world', () => {
  it('prints a hello world', () => {
    console.log = jest.fn()
    console.log('hello')
    // The first argument of the first call to the function was 'hello'
    expect(console.log.mock.calls[0][0]).toBe('hello')
  })
})
