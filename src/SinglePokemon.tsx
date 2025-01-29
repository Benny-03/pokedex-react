import React from 'react';
import { useParams } from "react-router";

function SinglePokemon() {
    const { id } = useParams();
    return (
        <div>
            Ciao sono il pokemon con id {id}
        </div>
    )
}

export default SinglePokemon;