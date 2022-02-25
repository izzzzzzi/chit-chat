import React, {Component} from 'react';
import { CirclePicker } from 'react-color';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color : ""
        }
    }

    handleColor = (e) => {
        this.setState({color: e.hex})
    }
    render() {
        return(
            <div>
                <CirclePicker
                    color={this.state.color}
                    value={this.state.color}
                    onChange={this.handleColor}
                />
                <div style={{backgroundColor: this.state.color}}>
                    pick a color
                </div>
            </div>
        )
    }
}

export default ColorPicker;