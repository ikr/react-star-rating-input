import * as assert from 'assert'
import StarRatingInput from '../src/StarRatingInput'
import StarRating from '../src/StarRating'
import css from '../src/css'
import * as api from '../src/index'


describe('package index', () => {
    it('exports the interactive component class', () => {
        assert.strictEqual(api.StarRatingInput, StarRatingInput)
    })

    it('exports the static component class', () => {
        assert.strictEqual(api.StarRating, StarRating)
    })

    it('exports non-empty css', () => {
        assert.strictEqual(api.css, css)
    })
})
