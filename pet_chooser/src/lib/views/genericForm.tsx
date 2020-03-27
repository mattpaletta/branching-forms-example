import React from 'react';

import formStyles from './genericForm.module.scss';
import FormContainer from "./form_container";
import BaseStep from "./base_step";
import FormSize from "../model/form_size";

class GenericForm extends React.Component<{startScreen: typeof BaseStep}, {currentScreen: BaseStep, formSize: FormSize | undefined}> {
    constructor(props: Readonly<{ startScreen: typeof BaseStep; }>) {
        super(props);
        this.state = {
            currentScreen: new this.props.startScreen(undefined, this.forceUpdate.bind(this), this.setFormSize.bind(this)),
            formSize: undefined
        };
    }

    componentWillUnmount() {
        this.state.currentScreen.onScreenExit();
    }

    setFormSize(size: FormSize | undefined) {
        this.setState(() => ({
            formSize: size,
        }));
    }

    showNextScreen = () => {
        this.state.currentScreen.onScreenExit();
        const next_screen = this.state.currentScreen.getNextScreen();
        if (next_screen !== undefined) {
            this.setState(() => ({
                currentScreen: next_screen,
            }), () => {
                this.state.currentScreen.onScreenEnter();
            });
        }
    };

    showBackScreen = () => {
        const prevScreen = this.state.currentScreen.getPreviousScreen();
        if (prevScreen !== undefined) {
            this.setState(() => ({
                currentScreen: prevScreen,
            }), () => {
                this.state.currentScreen.onScreenEnter();
            });
        }
    };

    render() {
        let backButton = (this.state.currentScreen.shouldShowBackButton()) ?
            <button onClick={this.showBackScreen}>Back</button> :
            <div />;
        let nextButton = this.state.currentScreen.shouldShowNextButton() ?
            <button disabled={!this.state.currentScreen.canAdvance()} onClick={this.showNextScreen}>Next</button> :
            <div/>;
        return (
            <div className={formStyles.container}>
                <FormContainer size={this.state.formSize}>
                    <div style={{overflow: "auto", height: ((this.state.formSize?.height ?? FormSize.REGULAR.height) - 50) + "px"}}>
                        {this.state.currentScreen.getScreen()}
                    </div>
                    {backButton}
                    {nextButton}
                </FormContainer>
            </div>
        );
    }
}

export default GenericForm;
