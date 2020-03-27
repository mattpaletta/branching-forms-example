import React, {ChangeEvent} from "react";

import BaseStep from "../../lib/views/base_step";
import PetFormSources from "../PetFormSources";
import HasAllergiesStep from "./HasAllergiesStep";
import HasYardSizeStep from "./HasYardSizeStep";

class HasYardSelectionStep extends BaseStep {
    private readonly has_yard_options: string[];
    constructor(prevStep: BaseStep | undefined) {
        super(prevStep);
        this.has_yard_options = ["Yes", "No"];
    }

    handleChangeHasYard = (newHasYardEvent: ChangeEvent<HTMLSelectElement>) => {
        this.setStepState(PetFormSources.YARD.HAS_YARD, newHasYardEvent.target.value);
        this.forceUpdate();
    };

    getNextScreen(): BaseStep | undefined {
        if (this.getStepState(PetFormSources.YARD.HAS_YARD) === "Yes") {
            return new HasYardSizeStep(this);
        } else {
            return new HasAllergiesStep(this);
        }
    }

    recalculateErrors(): number {
        const has_yard = this.getStepState(PetFormSources.YARD.HAS_YARD);
        return this.errors.count(!(has_yard === "Yes" || has_yard === "No"));
    }

    getScreen(): any {
        return (
            <div>
                <h3>Do you have a yard?</h3>
                <select name={"has_yard"} value={this.getStepState(PetFormSources.YARD.HAS_YARD)} onChange={this.handleChangeHasYard}>
                    <option value={"-"}> - </option>
                    {this.has_yard_options.map(option => <option value={option}>{option}</option>)}
                </select>
            </div>
        );
    }
}

export default HasYardSelectionStep;
