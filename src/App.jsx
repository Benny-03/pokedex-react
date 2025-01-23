import React, { useState, useEffect } from 'react';

const pokemon = [
    {
        name: 'Bulbasaur',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['Grass', 'Poison'],
        number: '001'
    },
    {
        name: 'Charmander',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        types: ['Fire'],
        number: '004'

    },
    {
        name: 'Squirtle',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
        types: ['Water'],
        number: '007'

    },
    {
        name: 'Pikachu',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        types: ['Electric'],
        number: '025'

    },
    {
        name: 'Jigglypuff',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
        types: ['Normal', 'Fairy'],
        number: '039'

    },
    {
        name: 'Meowth',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png',
        types: ['Normal'],
        number: '052'
    },
    {
        name: 'Psyduck',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',
        types: ['Water'],
        number: '054'
    }
]

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
                        return <span key={type}>{type}</span>
                    })}
                </div>
            </div>
        </div>
    )
}

const fetchPokemonList = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    return data.results;
}

const App = () => {
    // const result = useState(0);
    // const count = result[0];
    // const setCount = result[1];
    const [count, setCount] = useState(0);

    useEffect(() => {
        (async () => {
            const pokemonList = await fetchPokemonList();
            console.log(pokemonList);
            const pokemon_urls = pokemonList.map((p) => p.url);
            pokemon_urls.forEach(async (url) => {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
            });
        })();
    }, []);

    return (
        <div className='home-page wrapper'>
            <div className='griglia-box'>
                {pokemon.map((p) =>  
                    <Scheda
                        key={p.number}
                        name={p.name}
                        image={p.image}
                        types={p.types}
                        number={p.number}
                    />
                )}
            </div>
        </div>

    );
}

export default App;