import React, { useState, useEffect } from 'react';
import backgroundColorType from './typeBackground';

const fetchPokemonList = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    const data = await response.json();
    return data.results;
}

const fetchPokemon = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const Scheda = (props) => {
    return (
        <div className='scheda'>
            <div className='immagine'>
                <img src={props.image} alt={props.name} />
            </div>
            <div className='info wrapper'>
                <p id='number'>Numero: {props.number}</p>
                <p id='name'>{props.name}</p>
                <div className='abilita'>
                    {props.types.map((type) => {
                        return backgroundColorType(type);
                    })}
                </div>
            </div>
        </div>
    )
}



const App = () => {
    const [pokemon, setPokemon] = useState([]);
    const [type, setType] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        (async () => {
            //prendo la lista dei primi 20 pokemon
            const pokemonList = await fetchPokemonList();

            //prendo gli url singoli dei pokemon
            const pokemon_urls = pokemonList.map((p) => p.url);

            const pokemonData = []
            await Promise.all(
                pokemon_urls.map(async (url) => {
                    const pokemon = await fetchPokemon(url);
                    pokemonData.push(pokemon);
                })
            )
            pokemonData.sort((a, b) => a.id - b.id);
            setPokemon(pokemonData);


            const typeList = await fetchPokemon('https://pokeapi.co/api/v2/type/');
            const typeData = typeList.results.map((type) => type.name);
            const typeList1 = await fetchPokemon(typeList.next);
            typeList1.results.forEach((type) => {
                typeData.push(type.name);
            });

            setType(typeData);

        })();
    }, []);

    console.log(type)
    return (
        <div className='home-page'>
            <div className='griglia-box'>
                {pokemon.map((p) =>
                    <Scheda
                        key={p.id}
                        name={p.name}
                        image={p.sprites.other["official-artwork"].front_default}
                        types={p.types.map((type) => type.type.name)}
                        number={p.id}
                    />
                )}
            </div>
            <div className='box-button'>
                <button className='add-pokemon'>Carica altri Pokemon</button>
            </div>
        </div>
    );
}

export default App;