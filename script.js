const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winingPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// lets create the intial function 

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pe empty karne ke liye 
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // when ever player win remove green color 
        box.classList = `box box-${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

}

initGame();

function swapturn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

}

function checkGameOver() {
    let answer = "";
    winingPosition.forEach((position) => {
        // all 3 boxes should  be non-empty and exactly same value 
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && ((gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))) {

            // check if winner is X 
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }

            // now we know X/O is a winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            // disable pointer events 
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

        }

    });

    // it means we have a winner 
    if (answer !== "") {
        gameInfo.innerText = `Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }


    // let's check game is tie or not 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount == 9) {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn 
        swapturn();
        // to check if any player win or not
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener('click', initGame);