import React, { useState, useEffect } from "react";
import Gender from "./Gender";

const fetchSpecies = async (id) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id);
    const data = await response.json();
    return data;
}

function Characteristic(props) {
    const [species, setSpecies] = useState([]);
    const [frase, setFrase] = useState('');

    if (!props.info) return;

    if (!props.info.abilities) return;

    useEffect(() => {
        (async () => {
            //category
            const cat = await fetchSpecies(props.info.id);
            cat.genera.forEach((g) => {
                if (g.language.name == "en") {
                    setSpecies(g.genus.split(' '))
                }
            })

            //frase en
            const frasi = cat.flavor_text_entries;
            frasi.forEach((f) => {
                if (f.language.name === 'en') { setFrase(f.flavor_text.replace("\f", " ")); }
            })
        })();
    }, [props.info]);

    return (
        <>
            <div id="frase">
                {frase}
            </div>

            <div className="caratteristiche">
                <div className="col-1">
                    <div id="altezza">
                        <p>Height</p>
                        <h4>{props.info.height / 10} m</h4>
                    </div>
                    <div id="peso">
                        <p>Weight</p>
                        <h4>{props.info.weight / 10} kg</h4>
                    </div>
                    
                    <Gender info={props.info} />
                </div>
                <div className="col-2">
                    <div id="esperienza">
                        <p>Base experience</p>
                        <h4>{props.info.base_experience}</h4>
                    </div>
                    <div id="categoria">
                        <p>Category</p>
                        <h4>{species[0]}</h4>
                    </div>
                    <div id="abilita">
                        <p>Ability</p>
                        {props.info.abilities.map((ability) => <h4 key={ability.ability.name}>{ability.ability.name}</h4>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Characteristic;