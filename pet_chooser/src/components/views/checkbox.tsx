import React from 'react';

class Checkbox extends React.PureComponent<{ name: string, checked: boolean, onChange: CallableFunction }, {}> {
    render() {
        return (
            <label>
                <input type={"checkbox"} name={this.props.name} checked={this.props.checked} onChange={(event) => this.props.onChange(event)} />
                {this.props.name}
            </label>

        )
    }
}

export default Checkbox;
