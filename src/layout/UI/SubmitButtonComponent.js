import React, {useState, useEffect} from 'react';


const SubmitButton = (props) => {
    const [buttonText, setButtonText] = useState('OK');

    useEffect(() => {
            setButtonText(props.buttonText);
        },
        [props]
    )

    return (
        <span className="row justify-content-center">
                <input type="submit"
                       className="btn btn-primary login-button"
                       value={buttonText}
                />
            </span>
    );
}
export default SubmitButton;