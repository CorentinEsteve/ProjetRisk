
// ---------------------------- Generating map ---------------------------- //

for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 50; j++) {
        let square = document.createElement('div');
        square.id = i + '-' + j;
        square.classList.add('square');
        // add a break after every 50 squares
        if (j === 49) {
            square.style.clear = 'right';
        }
        document.getElementById('game').appendChild(square);
    }
}

// ---------------------------- Generating map - ground ---------------------------- //

let squares = document.querySelectorAll('.square');

let blueSquares = [];
while (blueSquares.length < 300) {
    let random = Math.floor(Math.random() * squares.length);
    if (!blueSquares.includes(random)) {
        blueSquares.push(random);
    }
}

// ---------------------------- Generating map - water ---------------------------- //

blueSquares.forEach(square => {
    squares[square].style.backgroundColor = 'blue';
})

let brownSquares = [];
while (brownSquares.length < 300 && !brownSquares.includes(blueSquares)) {
    let random = Math.floor(Math.random() * squares.length);
    if (!brownSquares.includes(random)) {
        brownSquares.push(random);
    }
}

brownSquares.forEach(square => {
    squares[square].style.backgroundColor = 'brown';
})

// ---------------------------- Generating map - gold ---------------------------- //

let goldSquares = [];
while (goldSquares.length < 10) {
    let random = Math.floor(Math.random() * squares.length);
    if (!goldSquares.includes(random)) {
        goldSquares.push(random);
    }
}

goldSquares.forEach(square => {
    squares[square].style.backgroundColor = 'yellow';
    squares[square].style.borderRadius = '10px';
})

// ---------------------------- User creates 1 base on start ---------------------------- //

let baseSquares = {};
let numberOfBases = 0;

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.style.backgroundColor === 'blue' || square.style.backgroundColor === 'brown' || square.style.backgroundColor === 'yellow' || numberOfBases === 1) {
            return;
        }
        else {
            // set square to red, and add to baseSquares the square.id and number of clicks for each square
            square.style.backgroundColor = 'red';
            numberOfBases++;
        }
        console.log(numberOfBases);
    })
})

// ---------------------------- User possible movements ---------------------------- //

//.



// ---------------------------- User moving ---------------------------- //

// let moveSquares = {};
// let numberOfMoves = 0;

// squares.forEach(square => {
//     square.addEventListener('click', () => {
//         if (square.style.backgroundColor === 'blue' || square.style.backgroundColor === 'brown' || square.style.backgroundColor === 'red' || square.style.backgroundColor === 'pink') {
//             return;
//         }
//         else {
//             // set square to pink, and add to moveSquares the square.id and number of clicks for each square
//             square.style.backgroundColor = 'pink';
//             numberOfMoves++;
//         }
//         console.log(numberOfMoves);
//     })
// })

// ---------------------------- User attack ---------------------------- //



// ---------------------------- User attack - enemy base ---------------------------- //





// creating troups

// if (baseSquares[square.id]) {
//     baseSquares[square.id]++;
// }
// else {
//     baseSquares[square.id] = 1;
// }