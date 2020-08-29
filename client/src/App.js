import React from 'react';
import './App.css';
import Recipies from './recipies/Recipies';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Switch, Route } from "react-router-dom";
import FoodDetails from './FoodDetails/FoodDetails';
import NewRecipy from './NewRecipy/NewRecipy';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div>
          <h2>Recipy Book</h2>
          <Switch>
            <Route exact path={`/recipy/:id`} component={FoodDetails} />
            <Route exact path="/" component={Recipies} />
            <Route exact path="/addNew" component={NewRecipy} />
          </Switch>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
