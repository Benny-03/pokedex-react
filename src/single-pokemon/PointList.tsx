import React, { useEffect, useState } from "react";

const List = (props) => {
    const n = 26; // Math.round(props.point.base_stat / 10);
    let j = Math.round(props.point / 10);
    const lines: Array<React.JSX.Element> = [];
    for (let i = 0; i < n; i++) {
        lines.push(<li key={i} style={{backgroundColor: i < j ? 'blue' : 'white'}} ></li>);
    }

    //console.log(props.name, props.point)
    return (
        <ul>
            {lines}
        </ul>
    )

}

function PointList(props) {
    const [point, setPoint] = useState();

    useEffect(() => {
        // console.log(props.info.stats);
        // const points = props.info.stats.map((s) => s.base_stat)
        // setPoint(points)
    }, []);

    
    if (!props.info || Array.isArray(props.info)) {
        return null;
    }

    if (!props.info.stats || !Array.isArray(props.info.stats)) {
        return null;
    }
    
    const points = props.info.stats.map((s) => s.base_stat);

    return (
        <div className="table">
            <div className="statistiche">
                <List
                    point={points[0]}
                />
                <h6>{"HP"}</h6>
            </div>
            <div className="statistiche">
                <List  point={points[1]} />
                <h6>Attack</h6>
            </div>
            <div className="statistiche">
                <List point={points[2]} />
                <h6>Defence</h6>
            </div>
            <div className="statistiche">
                <List point={points[3]} />
                <h6>Special attack</h6>
            </div>
            <div className="statistiche">
                <List point={points[4]} />
                <h6>Special defence</h6>
            </div>
            <div className="statistiche">
                <List point={points[1]} />
                <h6>Speed</h6>
            </div>
        </div>
    )

}

export default PointList;

// PS (Punti Salute): 255
// Attacco: 181
// Difesa: 250
// Attacco Speciale: 181
// Difesa Speciale: 230
// Velocità: 200