import dishes from "../data/dishes.json";
export function getDishes() { return dishes; }
export function getDishById(id) { return dishes.find((dish) => String(dish.id) === String(id)); }
