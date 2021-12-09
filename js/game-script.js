const clixDisplay = document.querySelector("#clix-display");
const clikBtn = document.querySelector("#clik");

// Sounds
const clikSounds = [new Audio("../sounds/clik/clik1.mp3"), new Audio("../sounds/clik/clik2.wav")];

// Clixet
const clixetMultiplierBtn = document.querySelector("#clixet-multiplier");
var clixetMultiplierCost = 2;

var comboMultiplier = 0;
var comboActive = false;

function getRandomNumber(max) {
    return Math.round(Math.random() * max);
}

if (localStorage.getItem("clix") != null) {
    clix = parseInt(localStorage.getItem("clix"));
    multiplier = parseInt(localStorage.getItem("multiplier"));
} else {
    localStorage.setItem("clix", 0);
    clix = 0;

    localStorage.setItem("multipler", 1);
    multiplier = 1;
}

function gameRun() {
    localStorage.setItem("clix", clix);
    localStorage.setItem("multiplier", multiplier);

    clixDisplay.innerHTML = `<span class="clix">${clix}</span> clix`;

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
    clikSounds[0].play(); // weird formula to get a random element out of the array just deal with it

    // CLIK LAND
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-
    // CLIK MULTIPLIER DISPLAY LAND

    // Create clik multiplier display
    const clikMultiplierDisplay = document.createElement("p");
    clikMultiplierDisplay.classList.add("clik-multiplier-display");

    // Combo checker and display appropriate message
    if (comboActive === false) {
        comboMultiplier = 0;
    }

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




// clear 
document.querySelector("#delete-progress").addEventListener("click", () => {
    const answer = prompt("Bro, are you sure? Type in \"Yes bro, I am sure\" to erase your data.");

    if (answer.toLowerCase() === "yes bro, i am sure") {
        alert("Goodbye... :[");

        clix = 0;
        multiplier = 1;
        clixetMultiplierCost = 2;
    }

    gameRun();
});