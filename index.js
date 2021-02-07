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
roomItems = undefined;

/*-----------global take function that will remove item from the room's inventory and place it into the players inventory*/
let take = function (userAnswer) {
	if (immovableItemsTable.includes(userAnswer)) {
		console.log(`I cant take this...${userAnswer}`);
	} else if (roomInv.length > 0 && collectedItem.item === userAnswer) {
		roomInv.splice(roomInv.indexOf(collectedItem));
		playerInventory.push(collectedItem);
		console.log(`You collected a ${collectedItem.item}!`);
	} else if (roomInv.length === 0) {
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
			collectedItem = roomItems.item;
		}
		console.log('\n' + roomDescription);
		for (let roomItems of roomInv) {
			console.log('you see a ' + roomItems.item);
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
			droppableItems = items;
			console.log(droppableItems.item + ': ' + droppableItems.description);
		}
	} else if (playerInventory.length <= 0) {
		console.log('Empty');
	}
};

//-----making a list of room descriptions to call on inside global look around functions
roomDescription = undefined;
let lakeRoomDescription =
	'You are in a clearing with a small lake.. the water looks questionable, but you are so terribly thirsty...\n';
let riverRoomDescription = 'There is massive river, obstructing all movement except to the north\n';
let meadowRoomDescription =
	'A foreboding mountain lies to the East and West. A path cuts through the woods to the north, and there is the sound of a river to the south\n';
let puzzleRoomDescription =
	'You come to a forrest. It is shady, but something seems to be shimmering behind a nearby tree, it appears to be a bucket.';
let deadEndRoomDescription = 'You now stand at the edge of a giant cliff.';
let wellRoomDescription = 'You are in a field with a well.';
let lockedRoomDescription =
	'You now come to a gate, guarded by a troll. The troll will not let you pass, unless he is paid off.';
let finalRoomDescription =
	'You are in a cave. There is a portal to the south, which appears to lead home, but not much else.';

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

immovableItemsTable = ['rock'];
let acceptableNorthCommands = ['n', 'N', 'North', 'NORTH'];
let acceptableSouthCommands = ['s', 'S', 'South', 'SOUTH'];
let acceptableEastCommands = ['e', 'E', 'east', 'EAST'];
let acceptableWestCommands = ['w', 'W', 'West', 'WEST'];
let acceptableTakeCommands = ['take', 'Take', 'TAKE'];
let acceptableLookCommands = ['scan', 'look around', 'LOOK', 'LOOK AROUND', 'look'];

async function start() {
	console.log(
		`You fell asleep at your computer and woke up in a empty meadow scattered with wild flowers. To move north enter "n", south "s", west "w", and east "e". To add an item to your inventory enter "take" and then enter the item's name, to check your inventory enter "i", to get a description of the room you're in enter "look around", and to use an item enter "use item name", for example "use stick". To drop an item enter "drop" and then item name.`
	);
	meadowRoom();
}

meadowRoomInv = [rock, stick]; //keeping the array outside the function allows it to stay persistent throughout room travel
async function meadowRoom() {
	let userAnswer = await ask('_');
	userAnswer = userAnswer.trim(" ")
  roomInv = meadowRoomInv;
	roomDescription = meadowRoomDescription;

	for (let roomItems of roomInv) {
		collectedItem = roomItems;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}

	if (acceptableWestCommands.includes(userAnswer) || acceptableEastCommands.includes(userAnswer)) {
		console.log('I cant go that way..');
		return meadowRoom();
	} else if (acceptableNorthCommands.includes(userAnswer)) {
		console.log('You approach a clearing with a small lake');
		lakeRoom();
	} else if (acceptableSouthCommands.includes(userAnswer)) {
		console.log('You come upon a massive river, obstructing all movement except to the north');
		riverRoom();
	} else if (acceptableLookCommands.includes(userAnswer)) {
		lookAround();
		return meadowRoom();
	} else if (acceptableTakeCommands.includes(userAnswer)) {
		let userAnswer = await ask('take what?\n_');
		take(userAnswer);
		return meadowRoom();
	} else if (userAnswer === 'drop') {
		drop();
		return meadowRoom();
	} else if (userAnswer === 'i') {
		checkInventory();
		return meadowRoom();
	} else if (userAnswer === 'use stick' || userAnswer === 'use gold coin' || userAnswer === 'use bucket') {
		console.log('That item is of no use in this area');
		return meadowRoom();
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
  userAnswer = userAnswer.trim(" ")
	if (
		acceptableSouthCommands.includes(userAnswer) ||
		acceptableEastCommands.includes(userAnswer) ||
		acceptableWestCommands.includes(userAnswer)
	) {
		console.log('I cant go that way..');
		riverRoom();
	} else if (acceptableNorthCommands.includes(userAnswer)) {
		console.log(' you enter the meadow you woke up in...' + meadowRoomDescription);
		meadowRoom();
	} else if (acceptableLookCommands.includes(userAnswer)) {
		lookAround();
		return riverRoom();
	} else if (acceptableTakeCommands.includes(userAnswer)) {
		take();
		return riverRoom();
	} else if (userAnswer === 'i') {
		checkInventory();
	} else if (userAnswer === 'drop') {
		drop();
	} else if (userAnswer === 'use stick' || userAnswer === 'use gold coin' || userAnswer === 'use bucket') {
		console.log('That item is of no use in this area');
		return riverRoom();
	} else {
		console.log('I am unsure of what you mean');
		return riverRoom();
	}
}

lakeRoomInv = [stick];
async function lakeRoom() {
	let userAnswer = await ask('_');
	userAnswer = userAnswer.trim(" ")
  roomInv = lakeRoomInv;
	roomDescription = lakeRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}

  if (acceptableLookCommands.includes(userAnswer)) {
		lookAround();
		return lakeRoom();
	} else if (userAnswer === 'drink') {
		console.log('The water is tainted and made you ill. You died, loser!');
		process.exit();
	} else if (userAnswer === 'i') {
		checkInventory();
		return lakeRoom();
	} else if (acceptableWestCommands.includes(userAnswer)) {
		console.log(
			'You come to a forrest. It is shady, but something seems to be shimmering behind a nearby tree, it appears to be a bucket.'
		);
		puzzleRoom();
	} else if (acceptableSouthCommands.includes(userAnswer)) {
		console.log('You are back in the meadow you woke up in.');
		meadowRoom();
	} else if (acceptableNorthCommands.includes(userAnswer) || acceptableEastCommands.includes(userAnswer)) {
		console.log('I cant go that way..\n');
		return lakeRoom();
	} else if (acceptableTakeCommands.includes(userAnswer)) {
		let userAnswer = await ask('take what?\n_');
		take(userAnswer);
		return lakeRoom();
	} else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		drop(userAnswer);
		return lakeRoom();
	} else if (userAnswer === 'i') {
		checkInventory();
		return lakeRoom();
	} else if (userAnswer === 'use stick' || userAnswer === 'use gold coin' || userAnswer === 'use bucket') {
		console.log('That item is of no use in this area');
		return lakeRoom();
	} else {
		console.log("I'm unsure of what you mean...");
		return lakeRoom();
	}
}

puzzleRoomInv = [bucket];
async function puzzleRoom() {
	userAnswer = await ask('_');
	userAnswer = userAnswer.trim(" ")
  roomInv = puzzleRoomInv;
	roomDescription = puzzleRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (acceptableLookCommands.includes(userAnswer)) {
		lookAround();
		return puzzleRoom();
	}
	if (acceptableNorthCommands.includes(userAnswer)) {
		console.log('You now stand at the edge of a giant cliff.');
		deadEndRoom();
	} else if (acceptableSouthCommands.includes(userAnswer)) {
		console.log('You come to a grassy field, it is all but empty besides a well.');
		wellRoom();
	} else if (acceptableEastCommands.includes(userAnswer)) {
		lakeRoom();
		console.log('You approach a lake.');
	} else if (acceptableWestCommands.includes(userAnswer)) {
		console.log('I cant go that way..');
		return puzzleRoom();
	} else if (acceptableTakeCommands.includes(userAnswer)) {
		let userAnswer = await ask('take what?\n_');
		take(userAnswer);
		return puzzleRoom();
	} else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		drop(userAnswer);
		return puzzleRoom();
	} else if (userAnswer === 'i') {
		checkInventory();
		return puzzleRoom();
	} else if (userAnswer === 'use stick' || userAnswer === 'use gold coin' || userAnswer === 'use bucket') {
		console.log('That item is of no use in this area.');
		return puzzleRoom();
	} else {
		console.log("I'm unsure of what you mean...");
		return puzzleRoom();
	}
}

deadEndRoomInv = [rock];
async function deadEndRoom() {
	userAnswer = await ask('_');
	userAnswer = userAnswer.trim(" ")
  roomInv = deadEndRoomInv;
	roomDescription = deadEndRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (acceptableLookCommands.includes(userAnswer)) {
		lookAround();
		return deadEndRoom();
	} else if (
		acceptableNorthCommands.includes(userAnswer) ||
		acceptableEastCommands.includes(userAnswer) || acceptableWestCommands.includes(userAnswer)
	) {
		console.log('There is nothing that way but certain death...');
    return deadEndRoom()
	} else if (acceptableSouthCommands.includes(userAnswer)) {
		console.log(
			'You come to a forrest. It is shady, but something seems to be shimmering behind a nearby tree, it appears to be a bucket.".'
		);
		puzzleRoom();
	} else if (acceptableTakeCommands.includes(userAnswer)) {
		let userAnswer = await ask('take what?\n_');
		take(userAnswer);
		return deadEndRoom();
	} else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		drop(userAnswer);
		return deadEndRoom();
	} else if (userAnswer === 'i') {
		checkInventory();
		return deadEndRoom();
	} else if (userAnswer === 'use stick' || userAnswer === 'use gold coin' || userAnswer === 'use bucket') {
		console.log('That item is of no use in this area');
		return deadEndRoom();
	} else {
		console.log("I don't know what you mean..."); //else catch all keeps on getting trigged after look around : update fixed
		return deadEndRoom();
	}
}

wellRoomInv = [goldCoin];
async function wellRoom() {
	userAnswer = await ask('_');
	userAnswer = userAnswer.trim(" ")
  roomInv = wellRoomInv;
	roomDescription = wellRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (acceptableLookCommands.includes(userAnswer)) {
		lookAround();
		return wellRoom();
	}
	if (userAnswer === 'use bucket' && playerInventory.includes(bucket)) {
		console.log('You attach the bucket to the well and send it down');
		userAnswer = await ask('You see a gold coin!\n_');
		if (acceptableTakeCommands.includes(userAnswer)) { //changed from acceptableSouthCommands 
			userAnswer = await ask('take what?\n_');
			take(userAnswer);
			return wellRoom();
		} else {
			console.log("I don't know what you mean...");
			return wellRoom();
		}
	} else if (acceptableLookCommands.includes(userAnswer)) {
		console.log('You enter forest...');
		puzzleRoom();
	} else if (acceptableSouthCommands.includes(userAnswer)) {
		console.log(
			'You come to a gate leading south, guarded by a troll. The troll exclaims "I will not let you through this gate, unless there is something in it for me!!"'
		);
		lockedRoom();
	} else if (acceptableEastCommands.includes(userAnswer) || acceptableWestCommands.includes(userAnswer)) {
		console.log("I can't go that.\n");
	} else if (
		(acceptableTakeCommands.includes(userAnswer) && wellRoomInv.includes(goldCoin)) ||
		(userAnswer === "add" && wellRoomInv.includes(goldCoin))
	) {
		console.log(
			'There appears to be some gold at the bottom of the well but you will need to use a bucket to get it.'
		);
		return wellRoom();
	} else if (acceptableTakeCommands.includes(userAnswer) && wellRoomInv === 0) {
		console.log("There's nothing here."); //may cause some problems if an item is dropped in this room
	} else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		drop(userAnswer);
		return wellRoom();
	} else if (userAnswer === 'i') {
		checkInventory();
		return wellRoom();
	} else if (userAnswer === "use stick" || userAnswer === "use gold coin") {
		console.log("That item is of no use in this area")
		return wellRoom()
	} else {
		console.log("I don't know what you mean");
		return wellRoom();
	}
}

lockedRoomInv = [];
trollInv = [];
async function lockedRoom() {
	userAnswer = await ask('_');
	userAnswer = userAnswer.trim(" ")
  roomInv = lockedRoomInv;
	roomDescription = lockedRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}

	if (userAnswer === 'look around') {
		lookAround();
		return lockedRoom();
	}

	if (acceptableSouthCommands.includes(userAnswer) && trollInv.includes(goldCoin)) {
		// this is not working
		console.log('You now enter a cave with a portal to the south, the protal leads back to your computer and desk');
		finalRoom();
	} else if (acceptableNorthCommands.includes(userAnswer)) {
		console.log('You come to a grassy field, it is all but empty besides a well.');
		wellRoom();
	} else if (userAnswer === 'use gold coin' && playerInventory.includes(goldCoin)) {
		//may be able to create a
		console.log('You paid the troll toll, he will now let you pass through the gate!!!');
		trollInv.push(goldCoin);
		delete playerInventory.goldCoin;
		return lockedRoom();
	} else if (
		(userAnswer === 'use stick' && playerInventory.includes('stick')) ||
		(userAnswer === 'use bucket' && playerInventory.includes('bucket'))
	) {
		console.log('The troll only accepts gold!!!');
		return lockedRoom();
	} else if (acceptableSouthCommands.includes(userAnswer) && !trollInv.includes(goldCoin)) {
		console.log('The troll will not let you through the gate.');
		return lockedRoom();
	} else if (!trollInv === 0 && userAnswer === 'look around') {
		console.log('There is a gate but it is guarded by a troll');
		return lockedRoom();
	} else if (acceptableLookCommands.includes(userAnswer) && trollInv.includes('gold coin')) {
		console.log('The troll will allow you to pass through the gate and carry onward south.');
		return lockedRoom();
	} else if (acceptableEastCommands.includes(userAnswer) || acceptableWestCommands.includes(userAnswer)) {
		console.log("I can't go that way...");
	} else if (userAnswer === 'i') {
		checkInventory();
		return lockedRoom();
	} else {
		console.log("I don't know what you mean...");
		return lockedRoom();
	}
}

finalRoomInv = [];
async function finalRoom() {
	userAnswer = await ask('_');
	userAnswer = userAnswer.trim(" ")
  roomInv = finalRoomInv;
	roomDescription = finalRoomDescription;

	for (let items of roomInv) {
		collectedItem = items;
	}

	for (let items of playerInventory) {
		droppableItems = items;
	}
	if (acceptableLookCommands.includes(userAnswer)) {
		lookAround();
		return finalRoom();
	}

	if (acceptableNorthCommands.includes(userAnswer)) {
		console.log('You are back in the room with the troll.');
		return lockedRoom();
	} else if (acceptableSouthCommands.includes(userAnswer)) {
		console.log(
			'The protal has taken you back to your desk. Congrulations you made it through the game. You win!!!!'
		);
		process.exit();
	} else if (acceptableEastCommands.includes(userAnswer) || acceptableWestCommands.includes(userAnswer)) {
		console.log("I can't go that way...");
		return finalRoom();
	} else if (acceptableLookCommands.includes(userAnswer)) {
		console.log(
			'You are in a cave. There is a portal to the south, which appears to lead home, but not much else.'
		);
		return finalRoom();
	} else if (userAnswer === 'i') {
		checkInventory();
		return finalRoom();
	} else if (userAnswer === "use stick" || userAnswer === "use gold coin" || userAnswer === "use bucket") {
		console.log("That item is of no use in this area")
		return finalRoom(); //would be nice to create a function for "use" but hard coding works for now (super redundant though)
	}
	else {
		console.log("I'm not sure what you mean...");
		return finalRoom();
	}
}
