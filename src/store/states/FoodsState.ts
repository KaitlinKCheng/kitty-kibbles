import Food from "@/ts/classes/Food";

export default interface FoodsState {
    foodStock: Map<number, Food>,
    nextFoodId: number
}
