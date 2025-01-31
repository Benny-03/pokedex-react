import React from "react";

const List = () => {
    const n = 26;
    let i = 0;

}

function PointList() {

    return (
        <div className="table">
            <div className="statistiche">
                <List />
                <h6>{"HP (Health Point)"}</h6>
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