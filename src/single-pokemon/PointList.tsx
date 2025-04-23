import React from "react";

const List = (props) => {
    const n = 26; 
    let j = Math.round(props.point / 10);

    const lines = [];
    for (let i = 0; i < n; i++) {
        lines.push(<li key={i} style={{backgroundColor: i < j ? '#1b82b1' : 'white', borderColor: i < j ? '#1b82b1' : 'white'}} ></li>);
    }

    return (
        <ul>
            {lines}
        </ul>
    )

}

function PointList(props) {
    
    if (!props.info || Array.isArray(props.info)) return null;

    if (!props.info.stats || !Array.isArray(props.info.stats)) return null;
    
    const points = props.info.stats.map((s) => s.base_stat);

    return (
        <div className="table">
            <div className="statistiche">
                <List point={points[0]} />
                <h6>{"HP"}</h6>
            </div>
            <div className="statistiche">
                <List point={points[1]} />
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