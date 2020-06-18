import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public preparationTime: string,
    public serves: number,
    public difficulty: string,
    public ingredients: Ingredient[],
    public instructions: string
  ) {}
}
