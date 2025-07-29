import { FOOD_TYPES, FOOD_INVALID_ID } from "@/ts/constants";

export default class Food {
    id: number;
    brand: string;
    name: string;
    type: FOOD_TYPES;
    size: string;
    count: number; // # available

    constructor(id = FOOD_INVALID_ID, brand = "Brand", name = "Name", type = FOOD_TYPES.OTHER, size = "Size", count = 0) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.type = type;
        this.size = size;
        this.count = count;
    }
}
