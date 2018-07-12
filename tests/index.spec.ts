import * as assert from 'assert'
import StarRatingInput from '../src/StarRatingInput'
import css from '../src/css'
import * as api from '../src/index'


describe('package index', () => {
    it('exports the component class', () => {
        assert.strictEqual(api.StarRatingInput, StarRatingInput)
    })

    it('exports non-empty css', () => {
        assert.strictEqual(api.css, css)
    })
})
