import React, {ChangeEvent} from "react";

import BaseStep from "../../lib/views/base_step";
import PetFormSources, { ANIMALS } from "../PetFormSources";
import AnimalSelectionStep from "./AnimalSelectionStep";
import HasAllergiesStep from "./HasAllergiesStep";

class HasYardSizeStep extends BaseStep {
    private readonly min_yard_size: number;
    private readonly max_yard_size: number;

    constructor(prevStep: BaseStep | undefined) {
        super(prevStep);
        this.min_yard_size = 15 * 15;
        this.max_yard_size = 43500;

        this.setStepState(PetFormSources.YARD.YARD_SIZE, this.min_yard_size);
    }

    handleChangeYardSize = (changeEvent: ChangeEvent<HTMLInputElement>) => {
        this.setStepState(PetFormSources.YARD.YARD_SIZE, parseInt(changeEvent.target.value));
        if (this.yardIsMax()) {
            this.setStepState(PetFormSources.CURRENT_ANIMAL, ANIMALS.HORSE);
        }
        this.forceUpdate();
    };

    yardIsMin = () => {
        return this.getStepState(PetFormSources.YARD.YARD_SIZE) <= this.min_yard_size;
    };

    yardIsMax = () => {
        return this.getStepState(PetFormSources.YARD.YARD_SIZE) >= this.max_yard_size;
    };

    getNextScreen(): BaseStep | undefined {
        return this.yardIsMax() ? new AnimalSelectionStep(this) : new HasAllergiesStep(this);
    }

    getScreen(): any {
        const sqFtLabel = this.yardIsMin() ? ("< " + Math.floor(Math.sqrt(this.min_yard_size))) + " sqft" :
            this.yardIsMax() ? ("> 1 sq. acre") : Math.floor(Math.sqrt(this.getStepState(PetFormSources.YARD.YARD_SIZE))) + " sqft";
        return (
            <div>
                <p>Select yard size.</p>
                <input type="range" min={this.min_yard_size} step={100} max={this.max_yard_size + 100} onChange={this.handleChangeYardSize} value={this.getStepState(PetFormSources.YARD.YARD_SIZE)} />
                <p>{sqFtLabel}</p>
            </div>
        );
    }
}

export default HasYardSizeStep;
