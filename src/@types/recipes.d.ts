export type Recipes = {
    _id: string,
    name: string,
    origin: string[],
    tags: string[],
    serves: number,
    ingredients: string[],
    instructions: string[],
    description: string,
    image: string
    stars: number
    time: string
    createdBy: {
        _id: string,
        name: string
        image: string
    }
}