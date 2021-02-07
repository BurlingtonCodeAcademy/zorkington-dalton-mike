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
roomInv = undefined;
collectedItem = undefined;
userAnswer = undefined;
droppableItems = undefined;

/*-----------global take function that will remove item from the room's inventory and place it into the players inventory*/
let take = function (userAnswer) {
	if (roomInv.length > 0) {
		collectedItem.item.includes(userAnswer);
		roomInv.splice(roomInv.indexOf(collectedItem));
		playerInventory.push(collectedItem);
		console.log(`You collected a ${collectedItem.item}!`);
	} else {
		console.log('Its empty');
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
let lookAround = function (userAnswer) {
	if (roomInv.length !== 0) {
		console.log(roomDescription);
		console.log(`You see a ${collectedItem.item}`);
	} else if (roomInv.length === 0) {
		console.log(roomDescription);
		console.log("There's nothing here..");
	}
};

let checkInventory = function () {
	if (playerInventory.length > 0) {
		console.log(droppableItems.item);
	} else if (playerInventory.length <= 0) {
		console.log('Empty');
	}
};

//-----making a list of room descriptions to call on inside global look around functions
roomDescription = undefined;
let lakeRoomDescription = 'You are in a clearing with a small lake\n';

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

async function start() {
	console.log(
		`You fell asleep at your computer and woke up in a empty meadow scattered with wild flowers. To move north`
	);
	meadowRoom();
}

meadowRoomInv = {};
async function meadowRoom() {
	let userAnswer = await ask(
		'A foreboding mountain lies to the East and West. A path cuts through the woods to the north, and there is the sound of a river to the south\n_'
	);
	while (userAnswer === 'w' || userAnswer === 'e') {
		console.log('I cant go that way..');
		return meadowRoom();
	}
	if (userAnswer === 'n') {
		console.log('You approach a lake');
		lakeRoom();
	} else if (userAnswer === 's') {
		console.log('You come upon a massive river, obstructing all movement except to the north');
		riverRoom();
	} else if (userAnswer === 'look around') {
		console.log('You are in a meadow, which is empty aside for some wildflowers');
		return meadowRoom();
	} else {
		console.log('I am unsure what you mean...');
		return meadowRoom();
	}
}

riverRoomInv = {};
async function riverRoom() {
	userAnswer = await ask('_');
	if (userAnswer === 's' || userAnswer === 'e' || userAnswer === 'w') {
		console.log('I cant go that way..');
		riverRoom();
	} else if (userAnswer === 'n') {
		meadowRoom();
	} else if (userAnswer === 'look around') {
		console.log('There is massive river, obstructing all movement except to the north');
		return riverRoom();
	} else {
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
		console.log('You come to a forrest. It is shady, but something seems to be shimmering behind a nearby tree.');
		puzzleRoom();
	} else if (userAnswer === 's') {
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
	} else {
		console.log("I'm unsure of what you mean...");
		return lakeRoom();
	}
}

let puzzleRoomInv = { bucket: bucket };
async function puzzleRoom() {
	userAnswer = await ask('_');
	if (userAnswer === 'look around' && Object.keys(puzzleRoomInv).length !== 0) {
		let investigate = Object.keys(puzzleRoomInv);
		console.log('You are in a forrest.');
		console.log(`You see a ${investigate} must go to a well`); // this procces is a little wonkee need to add some catch alls
		return puzzleRoom();
	} else if (Object.keys(puzzleRoomInv).length === 0 && userAnswer === 'look around') {
		//this seems to catch most but not all braeking bugs
		console.log('You are in a forrest.');
		console.log("There's nothing here..");
		return puzzleRoom();
	}
	if (userAnswer === 'take' || userAnswer === 'add') {
		let userAnswer = await ask('take what?\n_');
		if (userAnswer === 'bucket') {
			bucket.take();
			delete puzzleRoomInv.bucket;
			return puzzleRoom();
		}
	} else if (userAnswer === 'n') {
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
		return puzzleRoom;
	} else console.log("I'm unsure of what you mean...");
	return puzzleRoom();
}
deadEndRoomInv = { rock: rock };
async function deadEndRoom() {
	userAnswer = await ask('_');
	if (userAnswer === 'look around') {
		console.log('You are standing at the edge of a cliff.');
		console.log(`You see a ${Object.keys(deadEndRoomInv)}`);
		return deadEndRoom();
	}
	if (userAnswer === 'take' || userAnswer === 'add') {
		let userAnswer = await ask('take what?\n_');
		if (userAnswer === 'rock') {
			rock.take();
			return deadEndRoom();
		}
	} else if (userAnswer === 'n' || userAnswer === 'e' || userAnswer === 'w') {
		userAnswer = await ask('There is nothing that way but certain death...\n');
	} else if (userAnswer === 's') {
		console.log('You come to a forrest. It is shady, but something seems to be shimering behind a nearby tree.');
		puzzleRoom();
	} else {
		console.log("I don't know what you mean..."); //else catch all keeps on getting trigged after look around
		return deadEndRoom();
	}
}
wellRoomInv = { goldCoin: goldCoin };
async function wellRoom() {
	userAnswer = await ask('_');
	if (userAnswer === 'look around' && Object.keys(wellRoomInv).length !== 0) {
		console.log('You are in a field with a well.');
		console.log("The well appears to have something shiny at the bottom, but it is missing it's bucket.");
		return wellRoom();
	}
	if (userAnswer === 'use bucket' && playerInventory.includes('bucket') && Object.keys(wellRoomInv).length !== 0) {
		goldCoin.take();
		delete wellRoomInv.goldCoin;
		return wellRoom();
	} else if (Object.keys(wellRoomInv).length === 0 && userAnswer === 'look around') {
		console.log("There's nothing in this field but an empty well.");
		return wellRoom();
	} else if (userAnswer === 'n') {
		puzzleRoom();
	} else if (userAnswer === 's') {
		console.log(
			'You come to a gate leading south, guarded by a troll. The troll exclaims "I will not let you through this gate, unless there is something in it for me!!"'
		);
		lockedRoom();
	} else if (userAnswer === 'e' || userAnswer === 'w') {
		console.log("I can't go that.\n");
	} else console.log("I don't know what you mean");
	return wellRoom();
}

lockedRoomInv = [];
async function lockedRoom() {
	userAnswer = await ask('_');
	if (userAnswer === 's' && lockedRoomInv.includes(goldCoin)) {
		// this is not working
		console.log('You now enter a cave with a portal to the south, the protal leads back to your computer and desk');
		finalRoom();
	} else if (userAnswer === 'n') {
		console.log('You come to a grassy field, it is all but empty besides a well.');
		wellRoom();
	} else if (userAnswer === 'give gold coin' && playerInventory.includes('gold coin')) {
		console.log('You paid the troll toll, he will now let you pass through the gate!!!');
		lockedRoomInv.push(goldCoin);
		delete playerInventory.goldCoin;
		return lockedRoom();
	} else if (
		(userAnswer === 'give stick' && playerInventory.includes('stick')) ||
		(userAnswer === 'give bucket' && playerInventory.includes('bucket'))
	) {
		console.log('The troll only accepts gold!!!');
		return lockedRoom();
	} else if (userAnswer === 's' && Object.keys(lockedRoomInv).length === 0) {
		console.log('The troll will not let you through the gate.');
		return lockedRoom();
	} else if (Object.keys(lockedRoomInv).length === 0 && userAnswer === 'look around') {
		console.log('There is a gate but it is gaurded by a troll');
		return lockedRoom();
	} else if (lockedRoomInv.includes('gold coin') && userAnswer === 'look around') {
		console.log('The troll will allow you to pass through the gate and carry onward south.');
		return lockedRoom();
	} else if (userAnswer === 'e' || userAnswer === 'w') console.log("I can't go that way...");
	else console.log("I don't know what you mean...");
	return lockedRoom();
}
finalRoomInv = [];
async function finalRoom() {
	userAnswer = await ask('_');
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
	} else console.log("I'm not sure what you mean...");
	return finalRoom();
}
