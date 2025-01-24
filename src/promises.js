// al principio
const getListXHR = (cb) => {
    console.log('aa')
    const req = new XMLHttpRequest();
    req.addEventListener("load", cb);
    req.open("GET", "https://pokeapi.co/api/v2/pokemon");
    req.send();
}

/* getListXHR(function (event) {
    const response = JSON.parse(event.target.response)
    console.log(response);
})
 */
const wait = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds);
    }, (reject) => {

    })
}

async function main() {
    await wait(2000);
    console.log('attesa finita')
    await wait(1000);
    console.log('attesa 2')
    await wait(1000);
    console.log('attesa 4');
}

main();

/* wait(2000).then(() => {
    console.log('attesa finita');
    wait(1000).then(() => {
        console.log('attesa 2')
        wait(1000).then(() => {
            console.log('attesa 3')
        })
    })
}) */