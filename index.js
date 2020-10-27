const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const teemo = new Discord.MessageAttachment('./assets/teemo.gif');
const hehe = new Discord.MessageAttachment('./assets/moonwalk.gif');

const teemoEmbed = {
  title: 'Captain Teemo on duty!'
};

const helpEmbed = {
  title: "Welcome to the Help Desk",
  description: `
  1. !coinflip: will produce heads or tails;

2. !fire, !ca, !iscaonfire, !iscaliforniaonfire?: will link you to iscaliforniaonfire.com;

3. !teemo: gif of teemo dancing;

4. !roll # #: will roll the amount of dice for the dice you choose (ie: !roll 5 6 will roll 5 6 sided dice);

5. !hehe: gif of dog moonwalking;
  `
}

client.once('ready', () => {
  console.log('rollBot is ready to keep rollin, rollin, rollin');
});

client.on('message', message => {
  function diceRoll(rolls, size){
    const rollArray=[]
    const rollObj = {}
    let a = 0
    let total = 0
    let working  = 0
    if (size>5000){
      total = "Dice size must be below 5000"
      rollObj.total = total
      return rollObj
    }
    if (rolls<=5){
      while (a < rolls) {
        a = a + 1
        working = Math.floor(Math.random() * size + 1)
        total = total + working

        rollArray.push("Roll #" + a + ": " + working)
      }
    } else if (rolls > 5 && rolls < 500) {
      while (a < rolls) {
        a = a + 1
        working = Math.floor(Math.random() * size + 1)
        total = total + working
      }
    } else {
      total = "Dice amount must be below 500"
    }

    rollObj.array = rollArray;
    rollObj.total = total

    return rollObj
  }

  function random() {
    let number = Math.floor(Math.random() * 100)
    return number;
  }

  switch (message.content) {
    case "!coinflip":
      if (random() >= 50) {
        message.channel.send('Heads');
      } else {
        message.channel.send('Tails');
      }
      break;
    case "!fire":
    case "!ca":
    case "!iscaonfire":
    case "!iscaliforniaonfire?":
      message.channel.send('http://iscaliforniaonfire.com/');
      break;
    case "!teemo":
      message.channel.send({ embed: teemoEmbed })
      message.channel.send({ files: [teemo] });
      break;
    case "!help":
      message.channel.send({ embed: helpEmbed });
      break;
    case "!hehe":
      message.channel.send({ files: [hehe] });
      break;
    case "!dmx":
      if (random() > 50) {
        message.channel.send({ files: [dmx] })
      } else {
        message.channel.send('http://isdmxinjail.com/')
      }
  }

  if (message.content.includes("!roll")){
    let array = message.content.split(" ")
    let diceSize = parseInt(array[2])
    let diceNumber = parseInt(array[1])
    if (isNaN(diceSize) || isNaN(diceNumber)){
      return message.channel.send("You must use numbers.")
    }
    let rollReturn = diceRoll(diceNumber, diceSize)
    let rollTotal = {
      title: "Total",
      description: rollReturn.total
    }
    if (!rollReturn.array.length || !rollReturn.array){
      return message.channel.send(rollReturn.total)
    } else {
      let rolls = {
        title: "Rolls",
        description: rollReturn.array.toString()
      }
      message.channel.send({ embed: rolls })
      message.channel.send({ embed: rollTotal })
    }
  }

client.login(config.token);
