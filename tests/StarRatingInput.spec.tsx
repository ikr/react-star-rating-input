import * as React from 'react'
import * as assert from 'assert'
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme'
import { spy, SinonSpy } from 'sinon'
import StarRatingInput, { State } from '../src/StarRatingInput'

function onChangeIgnore(x: number) { }

describe('StarRatingInput', () => {
    let wrapper: ShallowWrapper<{}, State>

    beforeEach(() => {
        wrapper = shallow(<StarRatingInput value={0} onChange={onChangeIgnore} />)
    })

    it('is a div', () => {
        assert.strictEqual(wrapper.type(), 'div')
    })

    it('has the root element\'s class assigned', () => {
        assert(wrapper.hasClass('star-rating-input'))
    })

    it('has the 5 star items as default', () => {
        assert.strictEqual(wrapper.find('Star').length, 5);
    })

    it('has default prospective value of zero', function() {
        assert.strictEqual(wrapper.state().prospectiveValue, 0);
    })

    it('has the "Clear" link', () => {
        assert.strictEqual(wrapper.find('Clear').length, 1);
    })
})

describe('StarRatingInput of size 10', () => {
    let wrapper: ShallowWrapper

    beforeEach(() => {
        wrapper = shallow(<StarRatingInput value={0} size={10} onChange={onChangeIgnore} />)
    })

    it('has the 10 star items', () => {
        assert.strictEqual(wrapper.find('Star').length, 10);
    })
})

describe('StarRatingInput state indication', () => {
    function assertState(wrapper: any, onCount: number, offCount: number, suggestedCount: number) {
        assert.strictEqual(wrapper.find('.star-rating-star-container a.on').length, onCount)
        assert.strictEqual(wrapper.find('.star-rating-star-container a.off').length, offCount)

        assert.strictEqual(
            wrapper.find('.star-rating-star-container a.suggested').length, suggestedCount)
    }

    function wrapper(value: number, prospectiveValue: number): Promise<ReactWrapper<{}, State>> {
        const wrapper = mount(<StarRatingInput value={value} onChange={onChangeIgnore} />)

        return new Promise<any>(resolve => {
            wrapper.setState({ prospectiveValue }, () => { resolve(wrapper) })
        })
    }

    it('is done with the "on" class for current values', async () => {
        assertState(await wrapper(3, 0), 3, 2, 0)
    })

    it('is done with the "suggested" class for prospective values', async () => {
        assertState(await wrapper(4, 3), 0, 2, 3)
    })
})

describe('StarRatingInput interactions', () => {
    function newWrapper(onChange: () => void): Promise<ReactWrapper<{}, State, StarRatingInput>> {
        const wrapper = mount(<StarRatingInput value={1} onChange={onChange} />)

        return new Promise<any>(resolve => {
            wrapper.setState({ prospectiveValue: 2 }, () => { resolve(wrapper) })
        })
    }

    it('include signaling new prospective value on mouse hover for a star', async () => {
        const onChange = spy()
        const wrapper = await newWrapper(onChange)
        wrapper.find('a.star-rating-star').at(3).simulate('mouseEnter')

        await wrapper.instance().promiseSetStateDone
        assert.strictEqual(wrapper.state().prospectiveValue, 4)
        assert.strictEqual(onChange.callCount, 0)
    })

    it('include signalling no prospective value on mouse leave for a star', async () => {
        const onChange = spy()
        const wrapper = await newWrapper(onChange)
        wrapper.find('a.star-rating-star').at(1).simulate('mouseLeave')

        await wrapper.instance().promiseSetStateDone
        assert.strictEqual(wrapper.state().prospectiveValue, 0)
        assert.strictEqual(onChange.callCount, 0)
    })

    it('include signalling new current value on a star click', async () => {
        const onChange = spy()
        const wrapper = await newWrapper(onChange)
        wrapper.find('a.star-rating-star').at(4).simulate('click')

        await wrapper.instance().promiseSetStateDone
        assert.strictEqual(wrapper.state().prospectiveValue, 0)
        assert(onChange.calledOnceWith(5))
    })

    it('include signalling new current value on a clear bullet click', async () => {
        const onChange = spy()
        const wrapper = await newWrapper(onChange)
        wrapper.find('a.star-rating-clear').simulate('click')

        await wrapper.instance().promiseSetStateDone
        assert.strictEqual(wrapper.state().prospectiveValue, 0)
        assert(onChange.calledOnceWith(0))
    })
})
