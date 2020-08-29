const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const database = require('../data.json');
const { paginateResults } = require('utils');

const foodItem = (_, args) => {
    let foodID = args.id;
    return database[foodID];
}
const foodItems = (_, {pageSize = 20, after}) => {
    // const nextFoodItems = paginateResults({after, pageSize, results: database});
    return Object.values(database)
    // return { 
    //     nextFoodItems,
    //     cursor: nextFoodItems.length ? nextFoodItems[nextFoodItems.length - 1].cursor : null,
    //     hasMore: nextFoodItems.length 
    //                 ? nextFoodItems[nextFoodItems.length - 1].cursor !== database[database.length -1].cursor
    //                 : false
    // };
}
const addFoodItem = (_, {newFoodDetails} ) => {
    let newItem = { id: "0", name: "", instructions: "", ingredients: [], tags: [], comments: "", calories: 0, fat: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0 }
    let foodID = newFoodDetails.id;
    newItem = Object.assign(newItem, newFoodDetails);
    database[foodID] = newItem;
    return database[foodID];
}
const deleteFoodItem = (_, {id}) => {
    if (database[id]) {
        delete database[id];
        return `successfully deleted food item: ${id}`
    }
    return `food item ${id} does not exist`
}
const resolvers = {
    Query: {
        foodItem: foodItem,
        foodItems: foodItems,
    },
    Mutation: {
        addFoodItem: addFoodItem,
        deleteFoodItem: deleteFoodItem
    },
};
// const link = createHttpLink({
//     uri: '/graphql',
//     credentials: 'same-origin'
//   });
var cors = require('cors')

const server = new ApolloServer( {
    typeDefs,
    resolvers,
    cors: {
          origin: "*",
          credentials: true // <-- REQUIRED backend setting
        }
});

server.listen().then(({ url }) => {
    console.log(`server running at ${url}`);
});
