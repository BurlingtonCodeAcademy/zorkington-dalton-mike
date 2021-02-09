const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}

start();

let playerInventory = [];

//assigning variables as undefined in order to make global functions out of the scope of the room's

collectedItem = undefined;
userAnswer = undefined;
droppableItems = undefined;
roomItems = undefined
/*-----------global take function that will remove item from the room's inventory and place it into the players inventory*/
let take = function (userAnswer) {
	if (immovableItemsTable.includes(userAnswer)){
    console.log(`I cant take this...${userAnswer}`)
	} else if (roomInv.length > 0 && collectedItem.item === userAnswer) {
		roomInv.splice(roomInv.indexOf(collectedItem));
		playerInventory.push(collectedItem);
		console.log(`You collected a ${collectedItem.item}!`); 
  } else if (roomInv.length === 0){
		console.log("There's nothing here...");
	}
};

/*-------------global drop function that will remove item from players inventory and drop it into the rooms inventory-------------------*/
let drop = function () {
	if (playerInventory.length > 0) {
		droppableItems.item.includes(userAnswer);
		playerInventory.splice(playerInventory.indexOf(droppableItems));
		roomInv.push(droppableItems);
		console.log(`You dropped a ${droppableItems.item}`);
	} else {
		console.log('I cant...');
	}
};

//--------Global look around function to be called on in any room --------//
let lookAround = function () {
	if (roomInv.length !== 0) {
    for (let roomItems of roomInv) {
      collectedItem = roomItems.item
    }
		console.log("\n" + roomDescription);
		for (let roomItems of roomInv) {
      console.log('you see a ' + roomItems.item)
    }
	} else if (roomInv.length === 0) {
		console.log(roomDescription);
		console.log("There's nothing here..");
	}
};

//-------global check inventory function that will take the items in the player inventory array and display there item name.
let checkInventory = function () {
	if (playerInventory.length > 0) {
    for (let items of playerInventory) {
      droppableItems = items
		console.log(droppableItems.item + ": " + droppableItems.description)}
	} else if (playerInventory.length <= 0) {
		console.log('Empty');
	}
}


//-----making a list of room descriptions to call on inside global look around functions
roomDescription = undefined;
let lakeRoomDescription = 'You are in a clearing with a small lake\n';
let riverRoomDescription = 'There is massive river, obstructing all movement except to the north\n'
let meadowRoomDescription = "A foreboding mountain lies to the East and West. A path cuts through the woods to the north, and there is the sound of a river to the south\n"
let puzzleRoomDescription = "You come to a forrest. It is shady, but something seems to be shimmering behind a nearby tree, it appears to be a bucket."
let deadEndRoomDescription = "You now stand at the edge of a giant cliff."
let wellRoomDescription = 'You are in a field with a well.'
let lockedRoomDescription = "You now come to a gate, guarded by a troll. The troll will not let you pass, unless he is paid off."
let endRoomDescription = "You are in a cave. There is a portal to the south, which appears to lead home, but not much else."

class Item {
	constructor(item, description, collectable) {
		this.item = item;
		this.description = description;
		this.collectable = collectable || false;
  }
}




let stick = new Item('stick', "Just a plain ol' stick nothing interesting", true);

let bucket = new Item('bucket', 'Could be used to get water from a well', true);

let rock = new Item('rock', 'this rock is too heavy to lift', false);

let goldCoin = new Item('gold coin', 'could be used to pay someone off', true);

immovableItemsTable = ["rock"];
let acceptableNorthCommands = [];
let acceptableSouthCommands = [];
let acceptableEastCommands = [];
let acceptableWestCommands = [];
let acceptableTakeCommands = [];
let acceptableLookCommands =[]


async function start() {
	console.log(
		`You fell asleep at your computer and woke up in a empty meadow scattered with wild flowers. To move north enter "n", south "s", west "w", and east "e". To add an item to your inventory enter "take" and then enter the item's name, to check your inventory enter "i", to get a description of the room you're in enter "look around", and to use and item enter "use item name", for example "use stick".`);
		meadowRoom()
}

meadowRoomInv = [rock, stick]//keeping the array outside the function allows it to stay persistent throughout room travel
async function meadowRoom() {
  let userAnswer = await ask('_');
  roomInv = meadowRoomInv;
	roomDescription = meadowRoomDescription;

for (let roomItems of roomInv) {
      collectedItem = roomItems
    }

for (let items of playerInventory) {
      droppableItems = items
    }

	if (userAnswer === 'w' || userAnswer === 'e') {
		console.log('I cant go that way..');
		return meadowRoom();
	}
	else if (userAnswer === 'n') {
		console.log('You approach a clearing with a small lake');
		lakeRoom();
	} else if (userAnswer === 's') {
		console.log('You come upon a massive river, obstructing all movement except to the north');
		riverRoom();
	} else if (userAnswer === 'look around') {
		lookAround()
		return meadowRoom();
	} else if(userAnswer === 'take'){
    let userAnswer = await ask("take what?\n_")
    take(userAnswer)
    return meadowRoom()
  } else if (userAnswer === 'drop') {
    drop()
    return meadowRoom()
  }else if (userAnswer === 'i'){
    checkInventory()
    return meadowRoom()
  } else {
		console.log('I am unsure what you mean...');
		return meadowRoom();
	}
}

riverRoomInv = [];
async function riverRoom() {
  roomInv = riverRoomInv;
	roomDescription = riverRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	userAnswer = await ask('_');
	if (userAnswer === 's' || userAnswer === 'e' || userAnswer === 'w') {
		console.log('I cant go that way..');
		riverRoom();
	} else if (userAnswer === 'n') {
    console.log(' you enter the meadow you woke up in...' + meadowRoomDescription)
		meadowRoom();
	} else if (userAnswer === 'look around') {
		lookAround()
		return riverRoom();
	} else if(userAnswer === 'take') {
    take();
    return riverRoom()
  }else if (userAnswer === 'i'){
    checkInventory()
  }else if(userAnswer === 'drop'){
    drop()
  }else {
		console.log('I am unsure of what you mean');
		return riverRoom();
	}
}

lakeRoomInv = [stick];
async function lakeRoom() {
	roomInv = lakeRoomInv;
	roomDescription = lakeRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}

	let userAnswer = await ask('_');
	if (userAnswer === 'look around') {
		lookAround();
		return lakeRoom();
	} else if (userAnswer === 'drink') {
		console.log('The water is tainted and made you ill. You died, loser!');
		process.exit();
	} else if (userAnswer === 'i') {
		checkInventory();
		return lakeRoom();
	} else if (userAnswer === 'w') {
		console.log('You come to a forrest. It is shady, but something seems to be shimmering behind a nearby tree, it appears to be a bucket.".');
		puzzleRoom();
	} else if (userAnswer === 's') {
    console.log('You are back in the meadow you woke up in.')
		meadowRoom();
	} else if (userAnswer === 'n' || userAnswer === 'e') {
		console.log('I cant go that way..\n');
		return lakeRoom();
	} else if (userAnswer === 'take' || userAnswer === 'add') {
		let userAnswer = await ask('take what?\n_');
		take(userAnswer);
		return lakeRoom();
	} else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		drop(userAnswer);
		return lakeRoom();
	}	else if (userAnswer === 'i'){
			checkInventory()
			return lakeRoom()
	} else {
		console.log("I'm unsure of what you mean...");
		return lakeRoom();
	}
}

puzzleRoomInv = [bucket]
async function puzzleRoom() {
	userAnswer = await ask('_');
	roomInv = puzzleRoomInv;
	roomDescription = puzzleRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (userAnswer === 'look around') {
		lookAround();
		return puzzleRoom();
		}
	if (userAnswer === 'n') {
		console.log('You now stand at the edge of a giant cliff.');
		deadEndRoom();
	} else if (userAnswer === 's') {
		console.log('You come to a grassy field, it is all but empty besides a well.');
		wellRoom();
	} else if (userAnswer === 'e') {
		lakeRoom();
		console.log('You approach a lake.');
	} else if (userAnswer === 'w') {
		console.log('I cant go that way..');
		return puzzleRoom();
	} else if (userAnswer === 'take' || userAnswer === 'add') {
		let userAnswer = await ask('take what?\n_');
		take(userAnswer);
		return puzzleRoom();
	} else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		drop(userAnswer);
		return puzzleRoom();
	} else if (userAnswer === 'i'){
		checkInventory()
		return puzzleRoom()
	} else { console.log("I'm unsure of what you mean...");
	return puzzleRoom(); 
	}
}

deadEndRoomInv = [rock];
async function deadEndRoom() {
	userAnswer = await ask('_');
	roomInv = deadEndRoomInv;
	roomDescription = deadEndRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (userAnswer === 'look around') {
		lookAround();
		return deadEndRoom()
		}
	else if (userAnswer === 'look around') {
			lookAround();
			return deadEndRoom()
			}
	 else if (userAnswer === 'n' || userAnswer === 'e' || userAnswer === 'w') {
		userAnswer = await ask('There is nothing that way but certain death...\n');
	} else if (userAnswer === 's') {
		console.log('You come to a forrest. It is shady, but something seems to be shimmering behind a nearby tree, it appears to be a bucket.".');
		puzzleRoom();
	} else if (userAnswer === 'take' || userAnswer === 'add') {
		let userAnswer = await ask('take what?\n_');
		take(userAnswer);
		return deadEndRoom();
	} else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		drop(userAnswer);
		return deadEndRoom(); 
	} else if (userAnswer === 'i'){
		checkInventory()
		return deadEndRoom() 
	} else {console.log("I don't know what you mean..."); //else catch all keeps on getting trigged after look around : update fixed
		return deadEndRoom();
	}
	
}

wellRoomInv = [goldCoin]
async function wellRoom() {
	userAnswer = await ask('_');
	roomInv = wellRoomInv;
	roomDescription = wellRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (userAnswer === 'look around') {
		lookAround();
		return wellRoom()
		}
	if (userAnswer === 'use bucket' && playerInventory.includes(bucket)) {
    console.log('You attach the bucket to the well and send it down')
    userAnswer = await ask('You see a gold coin!\n_')
    if (userAnswer === 'take'){
    userAnswer = await ask('take what?\n_')
		take(userAnswer)
		return wellRoom();}
		else {
		console.log("I don't know what you mean...")
		return wellRoom();
	}
	
	} else if (userAnswer === 'n') {
		puzzleRoom();
	} else if (userAnswer === 's') {
		console.log(
			'You come to a gate leading south, guarded by a troll. The troll exclaims "I will not let you through this gate, unless there is something in it for me!!"'
		);
		lockedRoom();
	} else if (userAnswer === 'e' || userAnswer === 'w') {
		console.log("I can't go that.\n");
	}  else if (userAnswer === 'take' && wellRoomInv.includes(goldCoin) || userAnswer === 'add' && wellRoomInv.includes(goldCoin) ) {
		console.log("There appears to be some gold at the bottom of the well but you will need to use a bucket to get it.")
		return wellRoom();
	} else if (userAnswer === "take" && !wellRoomInv === 0 || userAnswer === 'add' && wellRoomInv === 0) {
		console.log("There's nothing here.")  //may cause some problems if an item is dropped in this room
	} else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		drop(userAnswer);
		return wellRoom(); 
	} else if (userAnswer === 'i'){
		checkInventory()
		return wellRoom() 
  } else {console.log("I don't know what you mean");
	return wellRoom();}
}

lockedRoomInv = [];
trollInv = []
async function lockedRoom() {
	userAnswer = await ask('_');
	roomInv = lockedRoomInv
	roomDescription = lockedRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (userAnswer === 'look around') {
		lookAround();
		return lockedRoom()
		}
	
	if (userAnswer === 's' && trollInv.includes(goldCoin)) {
		// this is not working
		console.log('You now enter a cave with a portal to the south, the protal leads back to your computer and desk');
		finalRoom();
	} else if (userAnswer === 'n') {
		console.log('You come to a grassy field, it is all but empty besides a well.');
		wellRoom();
	} else if (userAnswer === 'use gold coin' && playerInventory.includes(goldCoin)) { //may be able to create a 
		console.log('You paid the troll toll, he will now let you pass through the gate!!!');
		trollInv.push(goldCoin);
		delete playerInventory.goldCoin;
		return lockedRoom();
	} else if (
		(userAnswer === 'use stick' && playerInventory.includes('stick')) ||
		(userAnswer === 'use bucket' && playerInventory.includes('bucket'))
	)  {
		console.log('The troll only accepts gold!!!');
		return lockedRoom();
	} else if (userAnswer === 's' && !trollInv.includes(goldCoin)) {
		console.log('The troll will not let you through the gate.');
		return lockedRoom();
	} else if (!trollInv === 0 && userAnswer === 'look around') {
		console.log('There is a gate but it is guarded by a troll');
		return lockedRoom();
	} else if (trollInv.includes('gold coin') && userAnswer === 'look around') {
		console.log('The troll will allow you to pass through the gate and carry onward south.');
		return lockedRoom();
	} else if (userAnswer === 'e' || userAnswer === 'w') {
		console.log("I can't go that way...");
	} else if (userAnswer === 'i'){
	checkInventory()
	return lockedRoom() 
	}
	else {console.log("I don't know what you mean...");
	return lockedRoom();}
}

finalRoomInv = [];
async function finalRoom() {
	userAnswer = await ask('_');
	userAnswer = await ask('_');
	roomInv = finalRoomInv
	roomDescription = finalRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (userAnswer === 'look around') {
		lookAround();
		return finalRoom()
		}
	
	if (userAnswer === 'n') {
		console.log('You are back in the room with the troll.');
		return lockedRoom();
	} else if (userAnswer === 's') {
		console.log(
			'The protal has taken you back to your desk. Congrulations you made it through the game. You win!!!!'
		);
		process.exit();
	} else if (userAnswer === 'e' || userAnswer === 'w') {
		console.log("I can't go that way...");
		return finalRoom();
	} else if (userAnswer === 'look around') {
		console.log(
			'You are in a cave. There is a portal to the south, which appears to lead home, but not much else.'
		);
		return finalRoom();
	} else if (userAnswer === 'i'){
		checkInventory()
	return finalRoom() 
	} else {
		 console.log("I'm not sure what you mean...");
	return finalRoom();
	}
}