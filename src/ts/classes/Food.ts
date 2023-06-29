import { FOOD_INVALID_ID } from "@/ts/constants";

export default class Food {
    id: string; // Automatically generated as brand.name
    brand: string;
    name: string;
    size: string;
    count: number; // # available

    constructor(id = FOOD_INVALID_ID, brand = "Brand", name = "Name", size = "Size", count = 0) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.size = size;
        this.count = count;
    }
}
