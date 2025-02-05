import React, {useEffect, useState} from "react";

const List = (props) => {
    const n = 26;
    let i = 0;

    //console.log(props.name, props.point)
    return (
        <ul>
            {Array.from({length: n}, (_, i) => (
                <li key={i}></li>
            ))}
        </ul>
    )

}

function PointList(props) {
    const [point, setPoint] = useState();
    
    useEffect(() => {
        (async () => {
            console.log(props.info.stats);
            const points = props.info.stats.map((s) => s.base_stat)
            setPoint(points)
        })();
    }, []);

    return (
        <div className="table">
            <div className="statistiche">
                <List 
                    
                />
                <h6>{"HP"}</h6>
            </div>
            <div className="statistiche">
                <List />
                <h6>Attack</h6>
            </div>
            <div className="statistiche">
                <List />
                <h6>Defence</h6>
            </div>
            <div className="statistiche">
                <List />
                <h6>Special attack</h6>
            </div>
            <div className="statistiche">
                <List />
                <h6>Special defence</h6>
            </div>
            <div className="statistiche">
                <List />
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