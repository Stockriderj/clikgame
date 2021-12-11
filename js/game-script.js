// [>-[ GAME ELEMENTS ]-<]
const clikBtn = document.querySelector("#clik");

// - Displays -
const clixDisplay = document.querySelector("#clix-display");
const dignityDisplay = document.querySelector("#dignity-display");

// - Clixet -

// Clixet Multiplier Upgrade
const clixetMultiplierBtn = document.querySelector("#clixet-multiplier");
var clixetMultiplierCost = 2;

// Dignity Trading
const clixetDignityBtn = document.querySelector("#clixet-dignity");

// [>-[ GAME VARIABLES ]-<]
var clix = 0;
var dignity = 0;

var multiplier = 1;

var comboMultiplier = 0;
var comboActive = false;

// Sounds
const clikSounds = [new Audio("sounds/clik/clik1.mp3"), new Audio("sounds/clik/clik2.wav")];


function getRandomNumber(max) {
    return Math.round(Math.random() * max);
}

// Get stuff from LocalStorage
if (localStorage.getItem("clix") != null) {
    clix = parseInt(localStorage.getItem("clix"));
    dignity = parseInt(localStorage.getItem("dignity"));

    multiplier = parseInt(localStorage.getItem("multiplier"));

    clixetMultiplierCost = localStorage.getItem("clixetMultiplierCost");
} else {
    localStorage.setItem("clix", 0);
    localStorage.setItem("dignity", 0);

    localStorage.setItem("multiplier", 1);

    localStorage.setItem("clixetMultiplierCost", 2);
}

function gameRun() {
    // LocalStorage saving
    localStorage.setItem("clix", clix);
    localStorage.setItem("dignity", dignity);
    localStorage.setItem("multiplier", multiplier);
    localStorage.setItem("clixetMultiplierCost", clixetMultiplierCost);

    clixDisplay.innerHTML = `<span class="clix">${clix}</span> clix`;
    dignityDisplay.innerHTML = `<span class="dignity">${dignity}</span> dignity`;

    // stuff
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-
    // CLIXET LAND

    // clixet multiplier button
    clixetMultiplierBtn.innerHTML = `Upgrade click multiplier from ${multiplier} to ${multiplier + 1} for ${clixetMultiplierCost} clix`;
}

gameRun();

clikBtn.addEventListener("click", () => {
    clix += multiplier + comboMultiplier;
    gameRun();

    // Sound effects
    clikSounds[getRandomNumber(clikSounds.length - 1)].play(); // weird formula to get a random element out of the array just deal with it

    // Combo checker and display appropriate message
    if (comboActive === false) {
        comboMultiplier = 0;
    }

    // CLIK LAND
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-
    // CLIK MULTIPLIER DISPLAY LAND

    // Create clik multiplier display
    const clikMultiplierDisplay = document.createElement("p");
    clikMultiplierDisplay.classList.add("clik-multiplier-display");
    clikMultiplierDisplay.style.transition = "opacity 0.5s"; // To avoid the delay from the CSS

    // Checks if a combo is active, and if it is, apply special styles
    if (comboActive) {
        clikMultiplierDisplay.innerHTML = `+${multiplier + comboMultiplier}`;
        clikMultiplierDisplay.classList.add("combo");
    } else {
        clikMultiplierDisplay.innerHTML = `+${multiplier}`;
        clikMultiplierDisplay.classList.remove("combo");
    }

    // Add it to the page
    document.body.appendChild(clikMultiplierDisplay);

    // Randomize its position
    clikMultiplierDisplay.style.top = `${getRandomNumber(100)}%`;
    clikMultiplierDisplay.style.left = `${getRandomNumber(100)}%`;

    clikMultiplierDisplay.style.opacity = "1";

    setTimeout(() => {
        clikMultiplierDisplay.style.opacity = "0";
    }, 500); // wait until the number is fully displayed

    setTimeout(() => {
        clikMultiplierDisplay.remove();
    }, 500); // wait until the number is completely faded away
    
});

clikBtn.addEventListener("dblclick", () => {
    comboMultiplier++;
    comboActive = true;
});

// Removes the combo so it doesn't get to like 1000 or somethin idk
setInterval(() => {
    comboActive = false;
}, 1000)

// other clik stuf
// -=-=-=-=-=-=-=-=-=-=-=-=-=-
// CLIXET GANGSTA PROVINCE

clixetMultiplierBtn.addEventListener("click", () => {
    
    if (clixetMultiplierCost <= clix) {
        let answer = null;
        while (answer != "y" && answer != "n") {
            answer = prompt("Are you sure? (y/n)");
        }

        if (answer === "y") {
            clix -= clixetMultiplierCost;

            clixetMultiplierCost *= 2;

            multiplier++;
        } else {
            alert("ok");
        }

        gameRun();
    } else {
        alert("ya suck ya don't have enough");
    }
});

clixetDignityBtn.addEventListener("click", () => {
    const ask = parseInt(prompt("How much dignity would you like? (100 clix = 1 dignity)"));
    if (isNaN(ask)) {
        alert("There was trouble processing that.");
    } else {
        const cost = ask * 100;
        if (cost > clix) {
            alert("You don't have enough clix.");
        } else if (prompt("Are you sure? (type y to confirm)").toLowerCase() === "y") {
            clix -= cost;
            dignity += ask;

            gameRun();

            alert("Enjoy your newfound dignity!");
        }
    }
});




// clear 
document.querySelector("#delete-progress").addEventListener("click", () => {
    const answer = prompt("Bro, are you sure? Type in \"Yes bro, I am sure\" to erase your data.");

    if (answer.toLowerCase() === "yes bro, i am sure") {
        alert("Goodbye... :[");

        clix = 0;
        dignity = 0;

        multiplier = 1;

        clixetMultiplierCost = 2;

        gameRun();
    }
});