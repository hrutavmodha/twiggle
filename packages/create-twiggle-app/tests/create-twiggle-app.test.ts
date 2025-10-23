import { describe, it, expect } from 'vitest'
import { createApp } from '../src/create-app'
describe('create-twiggle-app', () => {
    expect(createApp('twiggle-test', '.', '../template'))
})
