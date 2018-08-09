/** VARIABLES */

// Values for how often each fighter can attack
var ENEMY_ATTACK_SPEED = 4;
var PLAYER_ATTACK_SPEED = 3;

var attackBtn = $('.attack');           // Reference to the attack button
var startBtn = $(".start");             // Reference to the start button
var combatLog = $("#message-box");      // Reference to the combat message box

// Enemy Data
var enemy = {
    name: 'Gork the Orc',
    hp: 50,
    hpSpot: $("#enemy-hp"),
    attackInterval: null,
    damage: 7,
};

// Player Data
var player = {
    name: 'Player',
    hp: 50,
    hpSpot: $("#player-hp"),
    damage: 8,
};




/** Game Flow on Load */

// Add names to the DOM
$("#player-name").text(player.name);
$("#enemy-name").text(enemy.name);

// hide the attack button
attackBtn.hide();

// add event listeners to each button
startBtn.on("click", startGame);
attackBtn.on("click", playerAttack);




/** FUNCTIONS */

function startGame() {
    startBtn.hide();    // Hide the start button
    attackBtn.show();   // Show the attack button

    // Start the enemy's attack cycle
    enemy.attackInterval = setInterval(enemyAttack, 1000 * ENEMY_ATTACK_SPEED); // Frequency based on attack speed
};

function playerAttack() {
    disableAttack();    // Disable the attack for the player
    enemy.hp -= player.damage;
    enemy.hp = enemy.hp < 1 ? 0 : enemy.hp; // Don't show negative hp values

    // update the hp on the DOM
    enemy.hpSpot.text(enemy.hp);

    // send message to combat log
    // by using the msg() function to create the html element
    combatLog.prepend( msg(`You hit the enemy for ${player.damage} damage!`) );
    // check if the game is over
    checkForEndGame();
}

// function that creates a div for a message and returns it.
function msg(text) {
    return $(`<div class="message">${text}</div>`)
}

function disableAttack() {
    attackBtn.prop("disabled", true); // Disable the button
    setTimeout( enableAttack, 1000 * PLAYER_ATTACK_SPEED);  // turn attack back on based on speed
}
function enableAttack() {
    attackBtn.prop("disabled", false);  // Enable the button
}

function enemyAttack() {
    player.hp -= enemy.damage;
    player.hp = player.hp < 1 ? 0 : player.hp; // No negative numbers
    player.hpSpot.text(player.hp);
    checkForEndGame();  // Check if game is over

    // send message to combat log
    combatLog.prepend( msg(`Enemy hits you for ${enemy.damage} damage!`) );
}

// Check if game is over
function checkForEndGame() {
    if (player.hp < 1 ) {
        return victory(false);  // return statements exit a function
    }

    if ( enemy.hp < 1 ) {
        return victory(true);
    }

    // if neither conditions above are met, we do nothing
};

function victory(condition) {
    // stop the enemy attack cycle
    clearInterval(enemy.attackInterval);
    // hide the attack button from the player
    attackBtn.hide();

    // message is the text shown to the player, result will hold the class name
    // to color the text based on the end condition
    var message, result;

    if ( condition ) {
        message = "You Win!!";
        result = "victory"
    } else {
        message = "You Lose!";
        result = 'failure'
    }

    // Push result message to the DOM
    $("#result-message").addClass(result).text(message);
};
