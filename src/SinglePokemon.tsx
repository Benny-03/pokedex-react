import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";


const fetchSinglePokemon = async (id) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const data = await response.json();
    return data;
}


const SinglePokemon = () => {
    const [info, setInfo] = useState([])
    const { id } = useParams();

    useEffect(() => {
        const fetchInfo = async () => {
            const fetchedInfo = await fetchSinglePokemon(id);
            setInfo(fetchedInfo);
        };
        fetchInfo();
    }, [id]);

    console.log(info)

    return (
        <div className="content-single-pokemon">
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
                            <p>In dettaglio</p>
                        </div>
                    </div>


                    <div className="col-2">
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
                                <div id="sesso">
                                    <p>Gender</p>
                                </div>
                            </div>

                            <div className="col-2">
                                <div id="categoria">
                                    <p>Category</p>
                                    <h4>{info.height / 10} m</h4>
                                </div>
                                <div id="abilita">
                                    <p>Ability</p>
                                    <h4>{info.weight / 10} kg</h4>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SinglePokemon;