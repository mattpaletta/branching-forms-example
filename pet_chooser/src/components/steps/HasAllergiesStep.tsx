import BaseStep from "../../lib/views/base_step";
import React, {ChangeEvent} from "react";
import Checkbox from "../views/checkbox";
import PetFormSources, {ANIMALS} from "../PetFormSources";
import AnimalSelectionStep from "./AnimalSelectionStep";

class HasAllergiesStep extends BaseStep {
    private readonly possible_allergies: string[];
    constructor(prevStep: BaseStep | undefined) {
        super(prevStep);
        this.possible_allergies = [
            "Cats",
            "Dogs",
            "Pollen",
            "Nuts",
            "Girls",
            "Boys",
            "Anything not a computer with a compiler"
        ];

        this.setStepState(PetFormSources.ALLERGIES.LIST, new Set([]));
    }

    private handleCheckbox = (allergyEvent: ChangeEvent<HTMLInputElement>) => {
        const allergy = allergyEvent.target.name;
        (this.hasAllergy(allergy) ? this.deleteAllergy : this.addAllergy)(allergy);

        if (this.hasAllergy("Anything not a computer with a compiler")) {
            this.setStepState(PetFormSources.CURRENT_ANIMAL, ANIMALS.ROCK);
        } else if (this.hasAllergy("Cats") && this.hasAllergy("Dogs")) {
            this.setStepState(PetFormSources.CURRENT_ANIMAL, ANIMALS.FISH);
        } else if (this.hasAllergy("Cats")) {
            this.setStepState(PetFormSources.CURRENT_ANIMAL, ANIMALS.DOG);
        } else if (this.hasAllergy("Dogs")) {
            this.setStepState(PetFormSources.CURRENT_ANIMAL, ANIMALS.CAT);
        } else {
            this.setStepState(PetFormSources.CURRENT_ANIMAL, Math.random() > 0.5 ? ANIMALS.DOG : ANIMALS.CAT);
        }

        this.forceUpdate();
    };

    private hasAllergy = (allergy: string) => {
        const allergies: Set<string> = this.getStepState(PetFormSources.ALLERGIES.LIST);
        return allergies.has(allergy);
    };

    private deleteAllergy = (allergy: string) => {
        const allergies: Set<string> = this.getStepState(PetFormSources.ALLERGIES.LIST);
        allergies.delete(allergy);
        this.setStepState(PetFormSources.ALLERGIES.LIST, allergies);
        this.forceUpdate();
    };

    private addAllergy = (allergy: string) => {
        const allergies: Set<string> = this.getStepState(PetFormSources.ALLERGIES.LIST);
        allergies.add(allergy);
        this.setStepState(PetFormSources.ALLERGIES.LIST, allergies);
        this.forceUpdate();
    };

    getNextScreen(): BaseStep | undefined {
        return new AnimalSelectionStep(this);
    }

    getScreen(): any {
        return (
            <div>
                <h3>Select Allergies</h3>
                {this.possible_allergies.map(allergy => <div key={allergy} >
                    <Checkbox name={allergy} checked={this.hasAllergy(allergy)} onChange={this.handleCheckbox.bind(this)} />
                    <br />
                </div>)}
            </div>
        );
    }
}

export default HasAllergiesStep;
