import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './Recipies.css'
import FoodStat from '../FoodStat/FoodStat';
// material UI
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { Link } from "react-router-dom";
// import Pagination from '@material-ui/lab/Pagination';

const foodStats = gql`
        fragment foodStat on FoodDetails {
            calories
            fat
            carbs
            fiber
            sugar
            protein
        }
    `

const ALL_FOOD = gql`
query display{
    foodItems{
      id
      name
      ...foodStat
      tags
    }
}
${foodStats}
`;



function Recipies() {
  const { loading, error, data } = useQuery(ALL_FOOD);

  if (loading) return <p>Loading...</p>;
  if (error) { console.log(error); return <p>Error :( </p>; }

  return (
    <div>
      <Link to="/addNew" >
        <Button className="add-new" color="primary" variant="contained"> Add new Recipy</Button>
      </Link>
      <div className="Recipes">
        {data.foodItems.map(({ id, name, calories, fat, carbs, fiber, sugar, protein, tags }) => (
          <Card key={id} className="recipies-card">
            <CardContent>
              <h2>{name}</h2>
              <FoodStat fat={fat} calories={calories} carbs={carbs} fiber={fiber} sugar={sugar} protein={protein} />
              <div className="tags" >
                {tags.map((tag) => <Chip label={tag} />)}
              </div>
            </CardContent>
            <Link to={`/recipy/${id}`} >
              <Button variant="outlined" color="primary">Learn more</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Recipies;
