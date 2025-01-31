import React, { useState, useEffect } from 'react';
import { NavLink, data, useParams } from "react-router";
import backgroundColorType from '../typeBackground';
import PointList from './PointList';
import Characteristic from './Characteristic';

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
    const [ability, setAbility] = useState([]);
    const { id } = useParams();
    let id_gender = 1;

    useEffect(() => {
        (async () => {
            //info single-pokemon
            const fetchedInfo = await fetchSinglePokemon(id);
            setInfo(fetchedInfo);

            //category
            const cat = await fetchSpecies(id);
            cat.genera.forEach((g) => {
                if(g.language.name == "en"){
                    setSpecies(g.genus.split(' '))
                }
            })

            //frase en
            const frasi = cat.flavor_text_entries
            frasi.forEach((f) => {
                if (f.language.name === 'en') { setFrase(f.flavor_text.replace("\f", " ")); }
            })
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            //gender
            let female = false;
            let male = false;
            
            if (!info.name) return;

            while (id_gender < 3) {
                const genderData = await fetchGender(id_gender);
                genderData.forEach((pokemon) => {
                    if (id_gender === 1) {
                        if (pokemon.pokemon_species.name === info.name) { female = true; }
                    } else if (pokemon.pokemon_species.name === info.name) { male = true; }
                });
                id_gender = id_gender + 1;
            }
            setGender({ male, female });

            //tipo
            setType(info.types.map((type) => type.type.name))

            //debolezze
            const single_type_url = info.types.map((type) => type.type.url);
            const single_type = []
            await Promise.all(
                single_type_url.map(async (url) => {
                    const data_type = await fetchDebolezze(url);
                    data_type.forEach((d) => {
                        let flag = false;
                        single_type.forEach((s) => {
                            if(s == d.name){ flag = true}
                        })
                        if(!flag) {single_type.push(d.name)}
                    })
                })
            )
            setDeb(single_type)

            //abilita`
            setAbility(info.abilities.map((ability) => ability.ability.name));
        })();
    }, [info]);

    //navigation
    const n = info.id;
    console.log(n)
    let prec = 0;
    let succ = 0;
    if(n == 1025){ 
        succ = 1;
        prec = n - 1;
    }else if(n == 1){
        prec = 1025;
        succ = n + 1
    }else {
        prec = n - 1;
        succ = n + 1
    }

    //Render
    return (
        <div className="content-single-pokemon" key={info.id}>
            <div className="single-pokemon">
                <div className="navigation">
                    <NavLink to={'/single-pokemon/' + prec} className='box-button prec'>
                        <button className='button prec'>{"<"} Pokemon precedente</button>
                    </NavLink>
                    <NavLink to={'/single-pokemon/' + succ} className='box-button succ'>
                        <button className='button succ'>Pokemon successivo {">"}</button>
                    </NavLink>
                </div>
                
                <div className="box-title">
                    <h2 id="name">{info.name}</h2><span id="number">N° {info.id}</span>
                </div>

                <div className="box-info">
                    <div className="col-1">
                        <div className='immagine'>
                            <img src={info.sprites?.other["official-artwork"].front_default} alt={info.name} />
                        </div>
                        <div className="dettaglio">
                            <p>In detail</p>
                            <PointList />
                        </div>
                    </div>


                    <div className="col-2">
                        <div id="frase">
                            {frase}
                        </div>

                        <Characteristic
                            info={info}
                            gender={gender}
                            species={species}
                            ability={ability}
                        />

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
                <NavLink to={'/'} className='box-button back'>
                    <button className='button back'>Cerca altri Pokemon</button>
                </NavLink>
            </div>
        </div>
    )
}

export default SinglePokemon;