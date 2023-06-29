import Food from "@/ts/classes/Food";

export default interface FoodsState {
    foodStock: Map<string, Food>,
    nextFoodId: number
}
