import React from 'react'
import StepModal from "react-native-step-modal"


const ScreenTutorial = (props) => {

    return (
        <StepModal 
            stepComponents={props.steps} 
            handleCloseModal={() => {}}
        />
    )
}

export default ScreenTutorial;