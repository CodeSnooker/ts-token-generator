import * as lib from '../lib'

describe('Sample Testing', () => {
    test('test #1', () => {
        expect(lib.echo()).toBe(true)
    })

    test('promise test', async () => {
        expect(await lib.echoWithPromise()).toBe(true)
    })

    test('failed promise', async () => {
        await expect(lib.echoWithFailedPromise()).rejects.toBe(false)
    })
})