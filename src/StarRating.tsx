import * as React from 'react'
import ClickEvent from './ClickEvent'
import starRange from './starRange'

export default function StarRating(props: Props) {
    return (
        <div className='star-rating-input'>
            {starRange(props.value).map(i => <Star key={i} />)}
        </div>
    )
}

export interface Props {
    value: number
}

function Star() {
    return (
        <div className='star-rating-star-container'>
            <a
                className={`star-rating-star on`}
                href=''
                onClick={(e: ClickEvent) => { e.preventDefault() }} />
        </div>
    )
}
