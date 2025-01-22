import React, { useState } from 'react';

const App = () => {
    // const result = useState(0);
    // const count = result[0];
    // const setCount = result[1];
    const [count, setCount] = useState(0);

    return (
        <div>
            {count} <button onClick={() => {
                setCount(count + 1)
            }
            }>
                +
            </button>
        </div>
    );
}

export default App;