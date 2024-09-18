const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = {
    start: {
        text: "It's friday! Your favorite day of the week because that means Friday Night Magic! Time to choose which deck we will play tonight: (Rakdos - Red/Black, Boros - Red/White, Selesnya - Green/White",
        rakdos: 'frontDoor',
        boros: 'frontDoor',
        selesnya: 'frontDoor'
    },
    frontDoor: {
        text: "Great choice! You head out the front door to realize that the bus is coming down the road. Do you want to take the bus or walk to the store? (bus/walk)",
        bus: 'busStop',
        walk: 'park'
    },
    busStop: {
        text: "You've arrived at the bus stop. However as you get on the bus you realize that someone has stolen your backpack that has your favorite deck. Type 'exit' to leave."
    },
    park: {
        text: "You decide to walk. On the way, you see a park. Do you take a break or keep walking? (break/walk)",
        break: 'rest',
        walk: 'fnm'
    },
    rest: {
        text: "You decide to take a break. After enjoying the scenery for a while would you like to continue taking a break or continue your walk to the shop? (break/walk)",
        break: 'rest',
        walk: 'fnm'
    },
    fnm: {
        text: "You made it to Friday Night Magic! Enjoy the games! Type 'exit' to leave.",
    }
};

const playGame = (location) => {
    const currentLocation = game[location];
    
    if (!currentLocation) {
        console.log("Invalid choice. Type 'exit' to leave.");
        return rl.question("What do you want to do? ", (answer) => playGame(answer));
    }
    
    console.log(currentLocation.text);
    
    if (currentLocation.text.includes("enjoy the games") || currentLocation.text.includes("leave")) {
        return rl.question("", (answer) => {
            if (answer.toLowerCase() === 'exit') {
                console.log("Thanks for playing!");
                rl.close();
            } else {
                console.log("Invalid input. Type 'exit' to leave.");
                rl.close();
            }
        });
    }
    
    rl.question("", (answer) => {
        const nextLocation = currentLocation[answer.toLowerCase()];
        if (nextLocation) {
            playGame(nextLocation);
        } else {
            console.log("Invalid choice. Type 'exit' to leave.");
            playGame(location);
        }
    });
};

console.log("Welcome to the Friday Night Magic Adventure!");
console.log("Welcome Plainswalker. In this adventure you must find your way to your favorite Local Game Store to continue your claim as game master. The adventure won't be easy, but your fate is in your hands.")
playGame('start');
