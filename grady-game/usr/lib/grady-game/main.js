#!/usr/bin/node
var prompt = require('@thecoder08/prompt');
var locationNumber = 0;
var inventory = [];
var locations = [
  {
    name: 'Your Room',
    description: 'You are in your room. There is an envelope labeled "1" on the floor. Proceeding leads into a hallway.'
  },
  {
    name: 'Hallway',
    description: 'You are in a hallway. Proceeding leads into a large room.'
  },
  {
    name: 'Main Room',
    description: 'You are in a large room. Over in the corner is a shovel. Proceeding leads out the door.'
  },
  {
    name: 'Front Yard',
    description: 'You are in a yard at the front of the house. It is covered in snow. Proceeding leads down to the basement, however, the game isn\'t build that far.'
  }
];
console.log('Welcome to your game, Grady!');
console.log('Type "help" for help.');
console.log(locations[locationNumber].description);
process.stdout.write(locations[locationNumber].name);
prompt.interface('> ', function(data) {
  var args = data.toString().split(require('os').EOL)[0].split(' ');
  if (args[0] == 'fwd') {
    locationNumber += 1;
  }
  else if (args[0] == 'back') {
    locationNumber -= 1;
  }
  else if (args[0] == 'take') {
    if (locationNumber == 0 && args[1] == 'envelope1') {
      inventory.push('envelope1');
      console.log('Taken.');
    }
    else if (locationNumber == 2 && args[1] == 'shovel') {
      inventory.push('shovel');
      console.log('Taken.');
    }
    else {
      console.log('Object "' + args[1] + '" not found.');
    }
  }
  else if (args[0] == 'use') {
    if (args[1] == 'envelope1' && inventory.includes('envelope1')) {
      console.log('The envelope says:');
      console.log('Dear Grady,');
      console.log('This is a clue to a big adventure you\'re about to go on.');
      console.log('There will be a big treasure at the end.');
      console.log('The next clue can be found below the surface in the centre of the blanket of snow.');
      console.log('Sincerely, LM');
    }
    else if (args[1] == 'envelope2' && inventory.includes('envelope2')) {
      console.log('The envelope says:');
      console.log('Dear Grady,');
      console.log('Congradulations! You found the second clue in your adventure!');
      console.log('Your next clue can be found where this one was, but inside.');
      console.log('Sincerely, LM');
      console.log('That\'s all the game for now! Thanks for playing!');
      process.exit();
    }
    else if (args[1] == 'random' && inventory.includes('random')) {
      console.log('The envelope says:');
      console.log('Hé mi boi.');
      console.log('U found my eNvElOpE.');
      console.log('im a RaNdOm DuDe that stucked a EnVeLoPe in a crack.');
      console.log('from: RaNdOm DuDe');
    }
    else if (args[1] == 'shovel' && inventory.includes('shovel')) {
      if (locationNumber == 2) {
        inventory.push('random');
        console.log('Using the shovel here reveals an envelope labeled "random". You put it in your inventory.');
      }
      else if (locationNumber == 3) {
        inventory.push('envelope2');
        console.log('Using the shovel here reveals an envelope labeled "2". You put it in your inventory.');
      }
      else {
        console.log('Using the shovel here reveals nothing.');
      }
    }
    else {
      console.log('Object "' + args[1] + '" not found.');
    }
  }
  else if (args[0] == 'quit') {
    process.exit();
  }
  else if (args[0] == 'help') {
    console.log('Commands:');
    console.log('fwd: move forward one location');
    console.log('back: move backward one location');
    console.log('take [item]: take the specified item');
    console.log('use [item] [other arguments]: use the specified with the other arguments if needed');
    console.log('quit: exit the game');
    console.log('help: opens this menu');
  }
  else {
    console.log('I don\'t understand "' + args[0] + '".');
  }
  console.log(locations[locationNumber].description);
  process.stdout.write(locations[locationNumber].name);
});
