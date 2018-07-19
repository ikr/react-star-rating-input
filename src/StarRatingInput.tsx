import * as React from 'react'
import { resolve } from 'url';

const DEFAULT_SIZE = 5

export default class StarRatingInput extends React.Component<Props, State> {
    private _promiseSetStateDone: Promise<void>

    get promiseSetStateDone() {
        return this._promiseSetStateDone
    }

    constructor(props: Props) {
        super(props)
        this._promiseSetStateDone = Promise.resolve()
        this.state = { prospectiveValue: 0 }
    }

    render() {
        const range = starRange(this.props.size ? this.props.size : DEFAULT_SIZE)

        return (
            <div className='star-rating-input'>
                <Clear onClick={function () { }} />
                {range.map(i => (<Star {...this.starProps(i)} key={i} />))}
            </div >
        )
    }

    private starProps(value: number): StarProps {
        return {
            value,
            mode: this.anchorMode(value),
            onClick: this.handleStarClick.bind(this, value),
            onMouseEnter: this.handleStarMouseEnter.bind(this, value),
            onMouseLeave: this.handleStarMouseLeave.bind(this, value)
        }
    }

    private anchorMode(value: number): string {
        if (this.state.prospectiveValue > 0) {
            return (value <= this.state.prospectiveValue ? 'suggested' : 'off');
        }

        return (value <= this.props.value ? 'on' : 'off');
    }

    private handleStarMouseEnter(value: number): void {
        this._promiseSetStateDone = new Promise(resolve => {
            this.setState({ prospectiveValue: value }, resolve)
        })
    }

    private handleStarMouseLeave(value: number): void {
        this._promiseSetStateDone = new Promise(resolve => {
            this.setState({ prospectiveValue: 0 }, resolve)
        })
    }

    private handleStarClick(value: number): void {
        this._promiseSetStateDone = new Promise(resolve => {
            this.setState({ prospectiveValue: 0 }, resolve)
        })

        this.props.onChange(value)
    }
}

export interface Props {
    size?: number,
    value: number,
    onChange: (value: number) => void
}

export interface State {
    prospectiveValue: number
}

function Clear(props: ClearProps) {
    return (
        <div className='star-rating-clear-container'>
            <a
                className='star-rating-clear'
                href=''
                title='0'
                onClick={(e: ClickEvent) => {
                    e.preventDefault()
                }}>
                •
            </a>
        </div>
    )
}

interface ClearProps {
    onClick: () => void
}

function Star(props: StarProps) {
    return (
        <div className='star-rating-star-container'>
            <a
                className={`star-rating-star ${props.mode}`}
                title={`${props.value}`}
                href=''
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                onClick={(e: ClickEvent) => {
                    e.preventDefault()
                    props.onClick()
                }} />
        </div>
    )
}

interface StarProps {
    value: number,
    mode: string,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onClick: () => void
}

interface ClickEvent {
    preventDefault: () => void
}

function starRange(size: number): Array<number> {
    const result = new Array(size)

    for (let i = 0; i < size; i++) {
        result[i] = i + 1;
    }

    return result
}
