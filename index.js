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

let bucket = new Item('bucket', 'Could be used to get water from a well', true);

let rock = new Item('rock', 'this rock is too heavy to lift', false);

let goldCoin = new Item('gold coin', 'could be used to pay someone off', true);

async function start() {
	console.log(`You fell asleep at your computer and woke up in a empty meadow scattered with wild flowers.`);
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
		console.log('The meadow is empty aside for some wildflowers');
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

lakeRoomInv = [stick]
async function lakeRoom() {
	roomInv = lakeRoomInv;

  for(let items of roomInv){
    collectedItem = items}

    for (let items of playerInventory){
      droppableItems = items}
    
	let userAnswer = await ask('_');
	if (userAnswer === 'look around' && lakeRoomInv.length !== 0) {
		console.log('You are in a clearing with a small lake\n');
		console.log(`You see a ${collectedItem.item}`)
		return lakeRoom();
	} else if (roomInv.length === 0 && userAnswer === 'look around') {
		console.log('You are in a clearing with a small lake\n');
		console.log("There's nothing here..");
		return lakeRoom();

  } else if (userAnswer === 'take' || userAnswer === 'add') {
		let userAnswer = await ask('take what?\n_');
		if (collectedItem.item.includes(userAnswer)) {
      roomInv.splice(roomInv.indexOf(collectedItem))
      playerInventory.push(collectedItem)
      console.log(`You collected a ${collectedItem.item}!`)
      return lakeRoom()
		}
  } else if (userAnswer === 'drop') {
		let userAnswer = await ask('drop what?\n_');
		if (droppableItems.item.includes(userAnswer)) {
			playerInventory.splice(playerInventory.indexOf(droppableItems));
			roomInv.push(droppableItems)
			console.log(playerInventory);
      return lakeRoom()
    } else {
      console.log("I can't...")}
  
  } else if (userAnswer === 'drink') {
		console.log('The water is tainted and made you ill. You died, loser!');
		process.exit();
	} else if (userAnswer === 'i' && playerInventory.length > 0){
		console.log(droppableItems.item)
		return lakeRoom();
  
  }else if (userAnswer === 'i' && playerInventory.length <= 0){
    console.log("Empty")
    return lakeRoom()
	
  }else if (userAnswer === 'w') {
		console.log('You come to a forrest. It is shady, but something seems to be shimmering behind a nearby tree.');
		puzzleRoom();
	
  } else if (userAnswer === 's') {
		meadowRoom();

  } else if (userAnswer === 'n' || userAnswer === 'e') {
		console.log('I cant go that way..\n');
		return lakeRoom();
	
  } else console.log("I'm unsure of what you mean...");
	return lakeRoom();
}

let puzzleRoomInv = { bucket: bucket };
async function puzzleRoom() {
  userAnswer = await ask("_");
  if (userAnswer === "look around" && Object.keys(puzzleRoomInv).length !== 0) {
    let investigate = Object.keys(puzzleRoomInv);
    console.log(`You see a ${investigate} must go to a well`); // this procces is a little wanking need to add some catch alls
    return puzzleRoom();
  } else if (
    Object.keys(puzzleRoomInv).length === 0 &&
    userAnswer === "look around"
  ) {
    //this seems to catch most but not all braeking bugs
    console.log("There's nothing here..");
    return puzzleRoom();
  }
  if (userAnswer === "take" || userAnswer === "add") {
    let userAnswer = await ask("take what?\n_");
    if (userAnswer === "bucket") {
      bucket.take();
      delete puzzleRoomInv.bucket;
      return puzzleRoom();
    }
  } else if (userAnswer === "n") {
    console.log("You now stand at the edge of a giant cliff.");
    deadEndRoom();
  } else if (userAnswer === "s") {
    console.log(
      "You come to a grassy field, it is all but empty besides a well."
    );
    wellRoom();
  } else if (userAnswer === "e") {
    lakeRoom();
    console.log("You approach a lake.");
  } else if (userAnswer === "w") {
    console.log("I cant go that way..");
    return puzzleRoom;
  } else console.log("I'm unsure of what you mean...");
  return puzzleRoom();
}
deadEndRoomInv = { rock: rock };
async function deadEndRoom() {
  userAnswer = await ask("_");
  if (userAnswer === "look around") {
    console.log(`You see a ${Object.keys(deadEndRoomInv)}`);
    return deadEndRoom();
  }
  if (userAnswer === "take" || userAnswer === "add") {
    let userAnswer = await ask("take what?\n_");
    if (userAnswer === "rock") {
      rock.take();
      return deadEndRoom();
    }
  } else if (userAnswer === "n" || userAnswer === "e" || userAnswer === "w") {
    userAnswer = await ask("There is nothing that way but certain death...\n");
  } else if (userAnswer === "s") {
    console.log(
      "You come to a forrest. It is shady, but something seems to be shimering behind a nearby tree."
    );
    puzzleRoom();
  } else {
    console.log("I don't know what you mean..."); //else catch all keeps on getting trigged after look around
    return deadEndRoom();
  }
}
wellRoomInv = { goldCoin: goldCoin };
async function wellRoom() {
  userAnswer = await ask("_");
  if (userAnswer === "look around" && Object.keys(wellRoomInv).length !== 0) {
    console.log(
      "The well appears to have something shiny at the bottom, but it is missing it's bucket."
    );
    return wellRoom();
  }
  if (
    userAnswer === "use bucket" &&
    playerInventory.includes("bucket") &&
    Object.keys(wellRoomInv).length !== 0
  ) {
    goldCoin.take();
    delete wellRoomInv.goldCoin;
    return wellRoom();
  } else if (
    Object.keys(wellRoomInv).length === 0 &&
    userAnswer === "look around"
  ) {
    console.log("There's nothing here but an empty well.");
    return wellRoom();
  } else if (userAnswer === "n") {
    puzzleRoom();
  } else if (userAnswer === "s") {
    console.log(
      'You come to a gate leading south, guarded by a troll. The troll exclaims "I will not let you through this gate, unless there is something in it for me!!"'
    );
    lockedRoom();
  } else if (userAnswer === "e" || userAnswer === "w") {
    console.log("I can't go that.\n");
  } else console.log("I don't know what you mean");
  return wellRoom();
}

lockedRoomInv = [];
async function lockedRoom() {
  userAnswer = await ask("_");
  if (userAnswer === "s" && lockedRoomInv.includes(goldCoin)) {
    // this is not working
    console.log(
      "You now enter a cave with a portal to the south, the protal leads back to your computer and desk"
    );
    finalRoom();
  } else if (userAnswer === "n") {
    console.log(
      "You come to a grassy field, it is all but empty besides a well."
    );
    wellRoom();
  } else if (
    userAnswer === "give gold coin" &&
    playerInventory.includes("gold coin")
  ) {
    console.log(
      "You paid the troll toll, he will now let you pass through the gate!!!"
    );
    lockedRoomInv.push(goldCoin);
    delete playerInventory.goldCoin;
    return lockedRoom();
  } else if (
    (userAnswer === "give stick" && playerInventory.includes("stick")) ||
    (userAnswer === "give bucket" && playerInventory.includes("bucket"))
  ) {
    console.log("The troll only accepts gold!!!");
    return lockedRoom();
  } else if (userAnswer === "s" && Object.keys(lockedRoomInv).length === 0) {
    console.log("The troll will not let you through the gate.");
    return lockedRoom();
  } else if (userAnswer === "e" || userAnswer === "w")
    console.log("I can't go that way...");
  else console.log("I don't know what you mean...");
  return lockedRoom();
}

finalRoomInv = {}
async function finalRoom() {
  userAnswer = await ask("_");
  if (userAnswer === "n") {
    console.log("You are back in the room with the troll.");
    return lockedRoom();
  } else if (userAnswer === "s") {
    console.log(
      "The protal has taken you back to your desk. Congrulations you made it through the game. You win!!!!"
    );
    process.exit();
  } else if (userAnswer === "e" || userAnswer === "w") {
    console.log("I can't go that way...");
    return finalRoom();
  } else console.log("I'm not sure what you mean...");
  return finalRoom();
}
