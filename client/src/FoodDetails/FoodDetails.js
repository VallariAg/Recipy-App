import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import FoodStat from '../FoodStat/FoodStat';
import './FoodDetails.css'
// material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function FoodDetails() {
    const { id } = useParams();

    const foodStats = gql`
    fragment foodStat on FoodDetails {
            calories
            fat
            carbs
            fiber
            sugar
            protein
    }
`;

    const FOOD_DETAILS = gql`
query food{
    foodItem(id: "${id}") {
        name
        instructions
        ingredients
        tags
        ...foodStat
    }
}
${foodStats}
`;
    const { loading, error, data } = useQuery(FOOD_DETAILS);
    if (loading) return <h3> Loading.. </h3>;
    if (error) return <h3> Error! :( </h3>;
    return (
        <Card key={id} className="recipies-card">
            <CardContent>
                <h1>{data.foodItem.name}</h1>
                <div>
                    {data.foodItem.tags.map((tag) => <Chip label={tag} />)}
                </div>
                <h2> Ingredients</h2>
                <List className="foodstat" component="nav" aria-label="secondary mailbox folders">

                    {data.foodItem.ingredients.map((order) => (
                        <ListItem href="#simple-list">
                            <ListItemText primary={`${order}`} />
                        </ListItem>
                    ))}
                </List>
                <h2> Instructions</h2>
                <div className="instructions">
                    {data.foodItem.instructions}
                </div>
                <FoodStat fat={data.foodItem.fat} calories={data.foodItem.calories} carbs={data.foodItem.carbs} fiber={data.foodItem.fiber} sugar={data.foodItem.sugar} protein={data.foodItem.protein} />
            </CardContent>
        </Card>
    )
}

export default FoodDetails;
