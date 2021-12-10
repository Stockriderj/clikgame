// [>-[ HEAD ]-<]
const head = document.querySelector("head");

// Meta Tags
head.innerHTML += `
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
`;

// Link to CSS
head.innerHTML += `
<link rel="stylesheet" href="css/style.css">
`;

// Favicon
head.innerHTML += `
<link rel="icon" href="favicon.png">
`;

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// [>-[ NAVBAR ]-<]
const navbarSlot = document.querySelector("#navbarSlot");
navbarSlot.innerHTML = `
<nav class="navbar navbar-expand-md navbar-dark fixed-bottom">
  
    <div class="container-fluid">

        <a class="navbar-brand" href="index.html">clikgame</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li><a class="nav-link" href="index.html">Home</a></li>

                    <li><a class="nav-link" href="game.html">Play</a></li>

            </ul>
        </div>

    </div>

</nav>
`;