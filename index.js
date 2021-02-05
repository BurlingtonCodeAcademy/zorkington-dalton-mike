const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

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

  drop(){
	  if (this.collectable) {
		  
	  }
  }
}

let stick = new Item(
  "stick",
  "Just a plain ol' stick nothing interesting",
  true
);

let bucket = new Item("bucket", 
"Could be used to get water from a well", 
true);

let rock = new Item("rock", "Seems to be sharp may be useful", false)

async function start() {
  console.log(
    `You fell asleep at your computer and woke up in a empty meadow scattered with wild flowers.`
  );
  meadowRoom();
}

meadowRoomInv = {}
async function meadowRoom() {
  let userAnswer = await ask("A foreboding mountain lies to the East and West. A path cuts through the woods to the north, and there is the sound of a river to the south\n_")
  while (userAnswer === 'w' || userAnswer === "e") {
    console.log("I cant go that way..");
	return meadowRoom()
  } if (userAnswer === "n") {
    console.log("You approach a lake");
    lakeRoom();
  } else if (userAnswer === "s") {
	console.log( "You come upon a massive river, obstructing all movement except to the north")
    riverRoom();
  } else if (userAnswer === 'look around'){
  console.log("The meadow is empty aside for some wildflowers")
  return meadowRoom()
} else {
	console.log('I am unsure what you mean...')
	return meadowRoom()
}
}

riverRoomInv = {}
async function riverRoom() {
  userAnswer = await ask("_");
  if (userAnswer === "s"|| userAnswer === 'e'|| userAnswer === 'w' ) {
    console.log("I cant go that way..");
	riverRoom()
  }
  else if (userAnswer === "n") {
    meadowRoom();
  }else {
	  console.log("I am unsure of what you mean")
	  return riverRoom()
  }
}

lakeRoomInv = { stick: stick };
async function lakeRoom() {
	let userAnswer = await ask('_');
	if (userAnswer === 'look around' && Object.keys(lakeRoomInv).length !==0) {
		let investigate = Object.keys(lakeRoomInv);
		console.log(`You see a ${investigate}\n`);
			return lakeRoom()
		} else if (Object.keys(lakeRoomInv).length === 0 && userAnswer === 'look around')
		{
			console.log("There's nothing here..")
			return lakeRoom() }
		
	if (userAnswer === 'take' || userAnswer === 'add') {
		let userAnswer = await ask('take what?\n_');
		if (userAnswer === 'stick') {
			stick.take();
			delete lakeRoomInv.stick;
			return lakeRoom();
		}
	} else if (userAnswer === 'drink') {
		console.log('The water is tainted and made you ill. You died, loser!');
		process.exit();
	} else if (userAnswer === 'i') {
		console.log(playerInventory);
		return lakeRoom()
	} else if (userAnswer === 'w') {
		console.log("You entered the puzzle room")
		puzzleRoom();
	} else if (userAnswer === 's') {
		meadowRoom();
	} else if (userAnswer === 'n'|| userAnswer === 'e'){ 
		console.log ('I cant go that way..\n');
		return lakeRoom()
	}else console.log("I'm unsure of what you mean...")
		return lakeRoom()
}


async function puzzleRoom() {
  let puzzleRoomInv = { bucket: bucket };
  userAnswer = await ask("_");
  if (userAnswer === "look around" && Object.keys(puzzleRoomInv).length !== 0) {
    let investigate = Object.keys(puzzleRoomInv);
    console.log(`You see a ${investigate} must go to a well`);
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
    deadEndRoom();
  } else if (userAnswer === "s") {
    wellRoom();
  } else if (userAnswer === "e") {
    lakeRoom();
    console.log("You approach a lake.");
  } else {
    userAnswer = await ask("I cant go that way..\n");
  }
}

async function deadEndRoom() {
  userAnswer = await ask("You now stand at the edge of a giant cliff. \n");
  while (userAnswer !== "s") {
    userAnswer = await ask("I cant go that way..\n");
  }
  if (userAnswer === "s") {
    puzzleRoom();
    console.log(
      "You come to a forrest. It is shady, but something seems to be shimering behind a nearby tree."
    );
  }
}

async function wellRoom() {
  userAnswer = await ask(
    "You come to a grassy field, it is all but empty besides a well.\n"
  );
  if (userAnswer === "n") {
    puzzleRoom();
  } else if (userAnswer === "s") {
    lockedRoom();
  }
}

async function lockedRoom() {
  userAnswer = await ask(
    'You come to a gate leading south, guarded by a troll. The troll exclaims "I will not let you through this gate, unless there is something in it for me!!". \n'
  );
  if (userAnswer === "n") {
    wellRoom();
  }
}
