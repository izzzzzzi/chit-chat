import React, {Component} from 'react';
import { CirclePicker } from 'react-color';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color : ""
        }
    }

    render() {
        return(
            <div>
                <CirclePicker
                    color={this.state.color}
                    value={this.state.color}
                    onChange={e => this.setState({color: e.hex})}
                />
                <div style={{backgroundColor: this.state.color}}>
                    pick a color
                </div>
            </div>
        )
    }
}

export default ColorPicker;