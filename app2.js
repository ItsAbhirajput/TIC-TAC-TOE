// Select DOM Elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");
const msgCont = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let isOTurn = true;    // true = O's turn, false = X's turn
let moveCount = 0;

// All winning combinations
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset the game
const resetGame = () => {
    isOTurn = true;
    moveCount = 0;
    enableBoxes();
    msgCont.classList.add("hide");
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

// Enable all boxes and clear content
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Handle box click
boxes.forEach(box => {
    box.addEventListener("click", () => {

        if (isOTurn) {
            box.innerText = "O";
            box.style.color = "#b0413e";
        } else {
            box.innerText = "X";
            box.style.color = "aqua";
        }

        isOTurn = !isOTurn;
        box.disabled = true;
        moveCount++;

        checkWinner();

        // If no winner & all boxes filled → Draw
        if (moveCount === 9) {
            msg.innerText = "Match Withdraw!";
            msgCont.classList.remove("hide");
            disableBoxes();
        }
    });
});

// Display winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner: ${winner}`;
    msgCont.classList.remove("hide");
    disableBoxes();
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }
};

// Button Events
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
