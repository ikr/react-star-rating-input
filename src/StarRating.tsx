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

function Star(props: StarProps) {
    return (
        <div className='star-rating-star-container'>
            <a
                className={`star-rating-star on`}
                title={`${props.key}`}
                href=''
                onClick={(e: ClickEvent) => { e.preventDefault() }} />
        </div>
    )
}

interface StarProps {
    key: number
}
