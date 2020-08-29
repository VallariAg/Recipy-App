const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    foodItem(id: String!): FoodDetails
    foodItems: [FoodDetails]
},
type Mutation {
    addFoodItem(newFoodDetails: newFoodDetail): FoodDetails
    deleteFoodItem(id: String): String
},
type FoodDetails {
    id: String!
    name: String!
    instructions: String!
    ingredients: [String!]
    tags: [String]
    comments: String
    calories: Int
    fat: Int
    carbs: Int
    fiber: Int
    sugar: Int
    protein: Int
}
input newFoodDetail {
    id: String!
    name: String!
    instructions: String!
    ingredients: [String!]
    tags: [String]
    comments: String
    calories: Int
    fat: Int
    carbs: Int
    fiber: Int
    sugar: Int
    protein: Int
}
`;

module.exports = typeDefs;

// foodItems: [FoodDetails!]
// type FoodStat {
//     id: String!
//     calories: Int
//     fat: Int
//     carbs: Int
//     fiber: Int
//     sugar: Int
//     protein: Int
// },
