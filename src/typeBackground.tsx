import React from 'react';

const backgroundColorType = (type) => {
    let color_text = 'black';
    let first_color = '';
    let second_color = '';

    console.log(type)
    switch (type) {
        case 'normal': first_color = '#a4acaf';
            second_color = '#a4acaf';
            break;
        case 'fighting': first_color = '#d56723';
            second_color = '#d56723';
            color_text = 'white';
            break;
        case 'flying': first_color = '#3dc7ef';
            second_color = '#bdb9b8';
            break;
        case 'poison': first_color = '#b97fc9';
            second_color = '#b97fc9';
            color_text = 'white';
            break;
        case 'ground': first_color = '#f7de3f';
            second_color = '#ab9842';
            break;
        case 'rock': first_color = '#a38c21';
            second_color = '#a38c21';
            color_text = 'white';
            break;
        case 'bug': first_color = '#729f3f';
            second_color = '#729f3f';
            color_text = 'white'
            break;
        case 'ghost': first_color = '#7b62a3';
            second_color = '#7b62a3';
            color_text = 'white';
            break;
        case 'steel': first_color = '#9eb7b8';
            second_color = '#9eb7b8';
            break;
        case 'fire': first_color = '#fd7d24';
            second_color = '#fd7d24';
            color_text = 'white'
            break;
        case 'water': first_color = '#4592c4';
            second_color = '#4592c4';
            color_text = 'white'
            break;
        case 'grass': first_color = '#9bcc50';
            second_color = '#9bcc50';
            break;
        case 'electric': first_color = '#eed535';
            second_color = '#eed535';
            break;
        case 'psychic': first_color = '#f366b9';
            second_color = '#f366b9';
            color_text = 'white';
            break;
        case 'ice': first_color = '#51c4e7';
            second_color = '#51c4e7';
            break;
        case 'shadow': first_color = '#707070';
            second_color = '#707070';
            color_text = 'white';
            break;
        case 'dragon': first_color = '#53a4cf';
            second_color = '#f16e57';
            color_text = 'white';
            break;
        case 'dark': first_color = '#707070';
            second_color = '#707070';
            color_text = 'white';
            break;
        case 'fairy': first_color = '#fdb9e9';
            second_color = '#fdb9e9';
            break;
        case 'stellar': first_color = '#cd5c5c';
            second_color = '#cd5c5c';
            break;
        // case 'unknown': first_color = 'white';
        //     second_color = 'white';
    }
    console.log(first_color)
    return <span key={type} className='single-type' style={{ backgroundImage: `linear-gradient(180deg, ${first_color} 50%, ${second_color} 50%)`, color: color_text }}>{type}</span>
}

export default backgroundColorType;