import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router";
import backgroundColorType from './typeBackground';

const fetchPokemonList = async (offset, list) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=20');
    const data = await response.json();
    const newList = [...list, ...data.results];
    return newList;
}

const fetchPokemon = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const Scheda = (props) => {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        (async () => {
            const pokemon = await fetchPokemon(props.url);
            setPokemon(pokemon);
        })();
    }, [props.url]);

    if (!pokemon) {

        return(<div className='scheda loading'>
            <div className='immagine'>
            </div>
            <div className='info wrapper'>
                <p id='name'>{props.name}</p>
            </div>
        </div>)
    }

    return (
        <NavLink to={'/single-pokemon/'+ pokemon.number } className='scheda'>
            <div className='immagine'>
                <img src={pokemon.sprites.other["official-artwork"].front_default} alt={props.name} />
            </div>
            <div className='info wrapper'>
                <p id='number'>Numero: {pokemon.id}</p>
                <p id='name'>{props.name}</p>
                <div className='abilita'>
                    {pokemon.types.map((type) => backgroundColorType(type.type.name))}
                </div>
            </div>
        </NavLink>
    )
}



const App = () => {
    const [offset, setOffset] = useState(0);
    const [list, setList] = useState([]);

    const UploadPokemon = () => {
        const newOffset = offset + 20;
        setOffset(newOffset);
    }

    useEffect(() => {
        (async () => {
            const pokemonList = await fetchPokemonList(offset, list);
            setList(pokemonList);
        })();
    }, [offset]);

    return (
        <div className='home-page'>
            <div className='griglia-box'>
                {list.map((p) =>
                    <Scheda
                        key={p.url}
                        url={p.url}
                        name={p.name}
                    />
                )}
            </div>
            <div className='box-button'>
                <button className='button add-pokemon' onClick={UploadPokemon}>Carica altri Pokemon</button>
            </div>
        </div>
    );
}

export default App;