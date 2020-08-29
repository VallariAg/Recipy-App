import React from 'react';
import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

const ADD_RECIPY = gql`
mutation addRecipy($food :newFoodDetail) {
    addFoodItem(newFoodDetails: $food) {
        id
        name
        instructions
    }
}
`;
function NewRecipy() {
    let inputID, inputName, inputInstructions;
    const [addRecipy, { data }] = useMutation(ADD_RECIPY);
    return (
        <div className="NewRecipy">
            <form style={{ display: "flex", flexDirection: "column" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    addRecipy({ variables: { food: { id: inputID.value, name: inputName.value, instructions: inputInstructions.value } } });
                }}>
                <div> Id <input ref={e => inputID = e} /> </div>
                <div> Name <input ref={e => inputName = e} /> </div>
                <div> Instructions <input ref={e => inputInstructions = e} /> </div>

                <Button type="submit">Add New Recipy</Button>
            </form>
        </div>
    );
}

export default NewRecipy;
