import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router";
import backgroundColorType from '../home/typeBackground';
import PointList from './PointList';
import Characteristic from './Characteristic';
import Vulnerability from './Vulnerability';

const fetchSinglePokemon = async (id) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const data = await response.json();
    return data;
}


const SinglePokemon = () => {
    const [info, setInfo] = useState([]);
    const [type, setType] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const fetchedInfo = await fetchSinglePokemon(id);
            setInfo(fetchedInfo);
        })();
    }, [id]);

    if(!info){
        
    }

    useEffect(() => {
        (async () => {
            if(!info.types) return;
            setType(info.types.map((type) => type.type.name))
        })();
    }, [info]);

    //navigation
    const n = info.id;
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
                            <PointList info={info} />
                        </div>
                    </div>

                    <div className="col-2">
                        <Characteristic info={info} />

                        <div className="tipo">
                            Type
                            <div className='abilita'>
                                {type.map((t) => backgroundColorType(t))}
                            </div>
                        </div>

                        <Vulnerability info={info} />
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