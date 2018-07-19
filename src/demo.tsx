import * as React from 'react'
import * as ReactDOM from 'react-dom'
import insertCss from 'insert-css'
import { StarRatingInput, StarRating, css } from './index'

class Container extends React.Component<{}, State> {
    constructor(props: any) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = { value: 0 }
    }

    render() {
        return (
            <div>
                <h2>Interactive input</h2>

                <StarRatingInput
                    size={5}
                    value={this.state.value}
                    onChange={this.handleChange} />

                <br />
                <h2>Static display</h2>
                <StarRating value={4} />
            </div>
        )
    }

    handleChange(value: number): void {
        this.setState({ value })
    }
}

interface State {
    value: number
}

insertCss(css)

ReactDOM.render(
    <Container />,
    document.getElementById('root')
)
