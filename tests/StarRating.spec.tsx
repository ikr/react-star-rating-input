import * as React from 'react'
import * as assert from 'assert'
import { shallow, ShallowWrapper } from 'enzyme'
import StarRating from '../src/StarRating'

describe('StarRating with a value of 6', () => {
    let wrapper: ShallowWrapper

    beforeEach(() => {
        wrapper = shallow(<StarRating value={6} />)
    })

    it('is a div', () => {
        assert.strictEqual(wrapper.type(), 'div')
    })

    it('has the 6 star items', () => {
        assert.strictEqual(wrapper.find('Star').length, 6);
    })
})
