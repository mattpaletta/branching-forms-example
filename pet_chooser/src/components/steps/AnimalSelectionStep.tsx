import BaseStep from "../../lib/views/base_step";
import React from "react";
import PetFormSources, { ANIMALS } from "../PetFormSources";

class AnimalSelectionStep extends BaseStep {
    shouldShowNextButton(): boolean {
        return false;
    }

    renderAnimal() {
        const animal: ANIMALS = this.getStepState(PetFormSources.CURRENT_ANIMAL);
        let label: string = "";
        let image: string = "";

        switch (animal) {
            case ANIMALS.HORSE:
                label = "Horse";
                image = "images/horse.png";
                break;
            case ANIMALS.FISH:
                label = "Fish";
                image = "images/fish.png";
                break;
            case ANIMALS.DOG:
                label = "Dog";
                image = "images/dog.png";
                break;
            case ANIMALS.CAT:
                label = "Cat";
                image = "images/cat.png";
                break;
            case ANIMALS.ROCK:
                label = "Rock";
                image = "images/stone.png";
                break;
        }

        const img_size = "200px";
        return <div>
            <img width={img_size} height={img_size} src={image} alt={label}/>
            <h3>Ideal Pet: {label}</h3>
        </div>
    }

    getScreen() {
        return (
            <div>
                {this.renderAnimal()}
            </div>
        );
    }
}

export default AnimalSelectionStep;
