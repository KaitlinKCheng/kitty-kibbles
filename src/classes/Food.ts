export default class Food {
    private _id: string; // Automatically generated as brand.name
    private _brand: string;
    private _name: string;
    private _size: string;
    private _count: number; // # available

    constructor(brand = "Brand", name = "Name", size = "Size", count = 0) {
        this._id = `${brand}.${name}`;
        this._brand = brand;
        this._name = name;
        this._size = size;
        this._count = count;
    }

    get id(): string {
        return this._id;
    }

    get brand(): string {
        return this._brand;
    }

    set brand(brand: string) {
        this._brand = brand;
        this.updateId();
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
        this.updateId();
    }

    get size(): string {
        return this._size;
    }

    set size(size: string) {
        this._size = size;
    }

    get count(): number {
        return this._count;
    }

    set count(count: number) {
        this._count = count;
    }

    addCount(num: number): void {
        this._count += num;
    }

    subCount(num: number): void {
        this._count -= num;
    }

    private updateId(): void {
        this._id = `${this._brand}.${this._name}`;
    }
}
