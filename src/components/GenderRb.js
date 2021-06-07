import { ToggleButton, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

//based on React-Bootstrap's Implementation for Toggle Rb
function GenderRb({ onRbChange }) {
    const [radioValue, setRadioValue] = useState('');

    const radios = [
        { value: "Female" },
        { value: "Male" },
        { value: "Other" },
    ];

    return (
        <>
            <ButtonGroup>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-success"
                        name="gender"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => {
                            setRadioValue(e.currentTarget.value);
                            onRbChange(e);
                        }}
                    >
                        {radio.value}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </>
    );
}

export default GenderRb;
