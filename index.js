const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}

start();

let playerInventory = [];

class Item {
	constructor(item, description, collectable) {
		// may need to include an action or description
		this.item = item;
		this.description = description;
		this.collectable = collectable || false;
	}

	take() {
		if (this.collectable) {
			playerInventory.push(this.item);
			console.log(`You collected ${this.item}`);
		} else {
			console.log("you can't take that!");
		}
	}
}

let stick = new Item('stick', "Just a plain ol' stick nothing interesting", true);

async function start() {
	console.log(`You fell asleep at your computer and woke up in a empty meadow scattered with wild flowers.`);
	meadowRoom();
}
async function meadowRoom() {
	let roomInv = [];
	let userAnswer = await ask(
		`A foreboding mountain lies to the East and West. A path cuts through the woods to the north, and there is the sound of a river to the south\n_`
	);
	while (userAnswer !== 's' && userAnswer !== 'n') {
		userAnswer = await ask('I cant go that way..\n');
	}
	if (userAnswer === 'n') {
		console.log('You approach a lake');
		lakeRoom();
	} else if (userAnswer === 's') {
		riverRoom();
	}
}

async function riverRoom() {
	let roomInv = [];
	userAnswer = await ask('There seems to be a massive river, obstructing all movement except to the north \n');
	if (userAnswer !== 'n') {
		userAnswer = await ask('I cant go that way..\n');
	} else if (userAnswer === 'n') {
		meadowRoom();
	}
}

async function lakeRoom() {
	roomInv = { stick: stick };
	let userAnswer = await ask('_');
	if (userAnswer === 'look around') {
		let investigate = Object.keys(roomInv);
		console.log(`You see a ${investigate}\n`);
		return lakeRoom();
	}
	if (userAnswer === 'take' || userAnswer === 'add') {
		let userAnswer = await ask('take what?\n_');
		if (userAnswer === 'stick') {
			stick.take();
			return lakeRoom();
		}
	} else if (userAnswer === 'drink') {
		console.log('The water is tainted and made you ill. You died, loser!');
		process.exit();
	} else if (userAnswer === 'i') {
		console.log(playerInventory);
		lakeRoom();
	}
}

async function puzzleRoom() {
	userAnswer = await ask(
		'You come to a forrest. It is shady, but something seems to be (shimering behind a nearby tree.\n'
	);
	if (userAnswer === 'examine') {
		console.log('It appears to be a bucket, must go to a well.');
	} else if (userAnswer === 's') {
	}
}
/*let rooms = meadowRoom 

let transitions = {
  meadowRoom: ['lakeRoom', 'riverRoom'],
  riverRoom:['meadowRoom'],
  lakeRoom: ['meadowRoom', 'puzzleRoom'], 
  puzzleRoom: ['lakeRoom', 'deadEnd', 'wellRoom'],
  deadEnd: ['puzzleRoom'],
  wellRoom: ['lockedRoom', 'puzzleRoom'],
  lockedRoom: ['wellRoom']
*/
