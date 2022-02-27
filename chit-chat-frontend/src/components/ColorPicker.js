import React, {useState} from 'react';
import { CirclePicker } from 'react-color';

export default function ColorPicker() {
    const [color, setColor] = useState("")

    handleColor = (e) => {
        setColor(e.hex);
    }

    return (
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