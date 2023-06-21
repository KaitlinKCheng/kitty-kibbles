export default class Food {
    id: string; // Automatically generated as brand.name
    brand: string;
    name: string;
    size: string;
    count: number; // # available

    constructor(brand = "Brand", name = "Name", size = "Size", count = 0) {
        this.id = `${brand}.${name}`;
        this.brand = brand;
        this.name = name;
        this.size = size;
        this.count = count;
    }
}
