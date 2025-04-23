import React, { useState, useEffect } from "react";

const fetchGender = async (id) => {
    const response = await fetch('https://pokeapi.co/api/v2/gender/' + id);
    const data = await response.json();
    return data.pokemon_species_details;
}

function Gender(props) {
    const [gender, setGender] = useState({ male: false, female: false });
    let id_gender = 1;

    if (!props.info) return;

    useEffect(() => {
        //gender
        let female = false;
        let male = false;
        
        if (!props.info.name) return;
        
        async function fetchData () {
            while (id_gender < 3) {
                const genderData = await fetchGender(id_gender);
                genderData.forEach((pokemon) => {
                    if (id_gender === 1) {
                        if (pokemon.pokemon_species.name === props.info.name) { female = true; }
                    } else if (pokemon.pokemon_species.name === props.info.name) { male = true; }
                });
                id_gender += 1;
            }
            setGender({ male, female });
        }
        fetchData(); 
            
    }, [props.info]);

    return (
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
    )
}

export default Gender;