function generateRandom(min = 24, max = 26) {
    let difference = max - min;

    let rand = Math.random();

    rand = rand * difference;

    rand = rand + min;
    return rand;

}


function getData() {

    const result = {
        temperature1: generateRandom(),
        temperature2: generateRandom()
    }
    return result
}

module.exports = getData