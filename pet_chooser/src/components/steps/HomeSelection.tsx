import React, {ChangeEvent} from "react";

import BaseStep from "../../lib/views/base_step";
import PetFormSources from "../PetFormSources";
import RadioImageButton from "../views/radioImageButton";
import HasYardSelectionStep from "./HasYardSelectionStep";
import HasAllergiesStep from "./HasAllergiesStep";

class HomeSelection extends BaseStep {
    private readonly housingOptions: { name: string; image: string; }[];

    constructor(prevStep: BaseStep | undefined, update_callback: CallableFunction, resize_callback: CallableFunction) {
        super(prevStep, update_callback, resize_callback);

        this.housingOptions = [
            {
                name: "House",
                image: "images/home.png",
            },
            {
                name: "Apartment",
                image: "images/apartment.png",
            }];
    }

    getHousingOptionNames() {
        return this.housingOptions.map(option => option.name);
    }

    handleChangeName = (newNameEvent: ChangeEvent<HTMLInputElement>) => {
        this.setStepState(PetFormSources.HOUSING.NAME, newNameEvent.target.value);
        this.forceUpdate();
    };

    handleChangeHousing = (newHouse: string) => {
        this.setStepState(PetFormSources.HOUSING.OPTION, newHouse);
        this.forceUpdate();
    };

    recalculateErrors(): number {
        return this.errors.count_list([
            // Verify the name is set and non-empty
            this.errors.isNotSet(PetFormSources.HOUSING.NAME),
            this.getStepState(PetFormSources.HOUSING.NAME) === "",
            this.errors.isNotSet(PetFormSources.HOUSING.OPTION)
        ]);
    }

    getNextScreen(): BaseStep | undefined {
        if (this.getStepState(PetFormSources.HOUSING.OPTION) === "House") {
            return new HasYardSelectionStep(this);
        } else {
            return new HasAllergiesStep(this);
        }
    }

    getScreen(): any {
        return (
            <div>
                <input name={"name"}
                       placeholder={"Your Name"}
                       onChange={this.handleChangeName}
                       value={this.getStepStateOr(PetFormSources.HOUSING.NAME, "")} />
               <div style={{display: "flex", padding: "10px"}}>
                   {this.housingOptions.map(option => <RadioImageButton key={option.name}
                                                                        onClick={this.handleChangeHousing}
                                                                        option={option}
                                                                        isSelected={this.getStepState(PetFormSources.HOUSING.OPTION) === undefined ?
                                                                            undefined :
                                                                            this.getStepState(PetFormSources.HOUSING.OPTION) === option.name} />)}
               </div>
            </div>
        );
    }
}

export default HomeSelection;
