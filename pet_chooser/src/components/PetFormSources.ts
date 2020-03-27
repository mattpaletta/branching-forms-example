export enum ANIMALS {
    HORSE = "horse",
    FISH = "fish",
    ROCK = "rock",
    DOG = "dog",
    CAT = "cat"
}

class PetFormSources {
    static HOUSING = class {
        static NAME = "name";
        static OPTION = "option";
    };

    static YARD = class {
        static HAS_YARD = "has_yard";
        static YARD_SIZE = "yard_size";
    };

    static ALLERGIES = class {
        static LIST = "allergies_list";
    };

    static CURRENT_ANIMAL = "curr_animal";
}

export default PetFormSources;
