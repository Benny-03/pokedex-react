import React, { useState, useEffect } from 'react';
import { data, useParams } from "react-router";
import backgroundColorType from './typeBackground';

//Fetch
const fetchSinglePokemon = async (id) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const data = await response.json();
    return data;
}

const fetchGender = async (id) => {
    const response = await fetch('https://pokeapi.co/api/v2/gender/' + id);
    const data = await response.json();
    return data.pokemon_species_details;
}

const fetchSpecies = async (id) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id);
    const data = await response.json();
    return data;
}

const fetchDebolezze = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.damage_relations.double_damage_from;
}


const SinglePokemon = () => {
    const [info, setInfo] = useState([]);
    const [species, setSpecies] = useState([]);
    const [gender, setGender] = useState({ male: false, female: false });
    const [frase, setFrase] = useState('');
    const [type, setType] = useState([]);
    const [deb, setDeb] = useState([]);
    const { id } = useParams();
    let id_gender = 1;

    useEffect(() => {
        (async () => {
            //info single-pokemon
            const fetchedInfo = await fetchSinglePokemon(id);
            setInfo(fetchedInfo);

            //category
            const cat = await fetchSpecies(id);
            setSpecies(cat.genera[7].genus.split(' '));

            //version blue eand red
            const frasi = cat.flavor_text_entries
            frasi.forEach((f) => {
                if (f.version.name === 'red') { setFrase(f.flavor_text.replace("\f", " ")); }
            })

        })();
    }, [id]);


    //gender
    useEffect(() => {
        (async () => {
            if (!info.name) return;

            let female = false;
            let male = false;

            while (id_gender < 3) {
                const genderData = await fetchGender(id_gender);
                genderData.forEach((pokemon) => {
                    if (id_gender === 1) {
                        if (pokemon.pokemon_species.name === info.name) {
                            female = true;
                        }
                    } else if (pokemon.pokemon_species.name === info.name) {
                        male = true;
                    }
                });
                id_gender = id_gender + 1;
            }
            setGender({ male, female });

            setType(info.types.map((type) => type.type.name))

            const single_type_url = info.types.map((type) => type.type.url);
            const single_type = []
            await Promise.all(
                single_type_url.map(async (url) => {
                    const data_type = await fetchDebolezze(url);
                    console.log(data_type)
                    data_type.forEach((d) => single_type.push(d.name))
                })
            )
            setDeb(single_type)

        })();
    }, [info]);

    //Render
    return (
        <div className="content-single-pokemon" key={info.id}>
            <div className="single-pokemon">
                <div className="box-title">
                    <h2 id="name">{info.name}</h2>
                    <span id="number">N° {info.id}</span>
                </div>

                <div className="box-info">
                    <div className="col-1">
                        <div className='immagine'>
                            <img src={info.sprites?.other["official-artwork"].front_default} alt={info.name} />
                        </div>
                        <div className="dettaglio">
                            <p>In detail</p>
                        </div>
                    </div>


                    <div className="col-2">
                        <div id="frase">
                            {frase}
                        </div>

                        <div className="caratteristiche">
                            <div className="col-1">
                                <div id="altezza">
                                    <p>Height</p>
                                    <h4>{info.height / 10} m</h4>
                                </div>
                                <div id="peso">
                                    <p>Weight</p>
                                    <h4>{info.weight / 10} kg</h4>
                                </div>
                                <div id="gender">
                                    <p>Gender</p>
                                    <div id="img">
                                        <svg className={"svg " + gender.male} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" height="35px">
                                            <path d="M198.746 140.274C209.582 125.647 216 107.56 216 88c0-48.523-39.477-88-88-88S40 39.477 40 88c0 19.56 6.418 37.647 17.254 52.274C28.585 150.478 8 177.873 8 210v105c0 24.74 17.041 45.576 40 51.387V459c0 29.224 23.776 53 53 53h54c29.224 0 53-23.776 53-53v-92.613c22.959-5.812 40-26.647 40-51.387V210c0-32.127-20.585-59.522-49.254-69.726zM128 32c30.928 0 56 25.072 56 56s-25.072 56-56 56-56-25.072-56-56 25.072-56 56-56zm88 283c0 11.598-9.402 21-21 21h-19v123c0 11.598-9.402 21-21 21h-54c-11.598 0-21-9.402-21-21V336H61c-11.598 0-21-9.402-21-21V210c0-23.196 18.804-42 42-42h9.36c22.711 10.443 49.59 10.894 73.28 0H174c23.196 0 42 18.804 42 42v105z" />
                                        </svg>
                                        <svg className={"svg " + gender.female} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" height="35px">
                                            <path d="M254.648 340.891l-39.909-164.276a48.18 48.18 0 0 0-16.794-26.583 47.458 47.458 0 0 0-4.554-3.208C207.438 131.225 216 110.594 216 88c0-48.523-39.477-88-88-88S40 39.477 40 88c0 22.594 8.562 43.225 22.609 58.824a47.405 47.405 0 0 0-4.554 3.208 48.184 48.184 0 0 0-16.794 26.583L1.352 340.891C-5.868 370.559 16.716 400 48.047 400H61v59c0 29.224 23.776 53 53 53h28c29.224 0 53-23.776 53-53v-59h12.952c31.329 0 53.917-29.436 46.696-59.109zM128 32c30.928 0 56 25.072 56 56s-25.072 56-56 56-56-25.072-56-56 25.072-56 56-56zm80 336h-45v91c0 11.598-9.402 21-21 21h-28c-11.598 0-21-9.402-21-21v-91H48c-10.259 0-17.877-9.539-15.602-19.546l40-164.454A16 16 0 0 1 88 171.546h12.351a88.015 88.015 0 0 0 55.299 0H168A16 16 0 0 1 183.602 184l40 164.454C225.876 358.458 218.262 368 208 368z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="col-2">
                                <div id="categoria">
                                    <p>Category</p>
                                    <h4>{species[0]}</h4>
                                </div>
                                <div id="abilita">
                                    <p>Ability</p>
                                    <h4></h4>
                                </div>
                            </div>
                        </div>

                        <div className="tipo">
                            Type
                            <div className='abilita'>
                                {type.map((t) => backgroundColorType(t))}
                            </div>
                        </div>

                        <div className="debolezze">
                            Vulnerability
                            <div className='abilita'>
                                {deb.map((t) => backgroundColorType(t))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePokemon;

// PS (Punti Salute):

// Il massimo è 255 per Pokémon come Blissey che ha una base PS elevatissima.
// Attacco:

// Il massimo valore di base per l'Attacco è 181, che appartiene a Deoxys (forma attacco).
// Difesa:

// Il massimo valore di base per la Difesa è 250, che appartiene a Shuckle, un Pokémon con una difesa straordinaria.
// Attacco Speciale:

// Il massimo valore di base per l'Attacco Speciale è 181, che appartiene a Deoxys (forma attacco), ma anche Alakazam e Mewtwo hanno valori molto alti in questa statistica.
// Difesa Speciale:

// Il massimo valore di base per la Difesa Speciale è 230, che appartiene sempre a Shuckle, un Pokémon con valori estremi in difesa.
// Velocità:

// Il massimo valore di base per la Velocità è 200, che appartiene a Deoxys (forma velocità), che è uno dei Pokémon più veloci.