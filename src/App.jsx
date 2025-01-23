import React, { useState } from 'react';

const App = () => {
    // const result = useState(0);
    // const count = result[0];
    // const setCount = result[1];
    const [count, setCount] = useState(0);

    return (
        // <div>
        //     {count} <button onClick={() => {
        //         setCount(count + 1)
        //     }
        //     }>
        //         +
        //     </button>
        // </div>
        <div className='home-page'>
            <div className='griglia-tot'>
                <div className='scheda'>
                    <div className='immagine'>
                        <img src='' alt='pokemon'/>
                    </div>
                    <div className='info'>
                        <p>Numero: 001</p>
                        <p>Bulbasaur</p>
                        <div className='abilita'>

                        </div>
                    </div>
                </div>
                <div className='scheda'>
                    <div className='immagine'>
                        <img src='' alt='pokemon'/>
                    </div>
                    <div className='info'>
                        <p>Numero: 001</p>
                        <p>Bulbasaur</p>
                        <div className='abilita'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default App;