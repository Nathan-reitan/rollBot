const Discord = require('discord.js');
const config = require('./config.json');
const embeds = require('./embeds.js');
const client = new Discord.Client();
const teemo = new Discord.MessageAttachment('./assets/teemo.gif');
const hehe = new Discord.MessageAttachment('./assets/moonwalk.gif');

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

  if (message.content === '!coinflip'){
    let fiftyfifty = Math.floor(Math.random() * 100)
    if(fiftyfifty>=50){
      message.channel.send('Heads');
    } else {
      message.channel.send('Tails');
    }
  }

  if (message.content === '!fire' || message.content === '!ca' || message.content === '!iscaonfire' || message.content === '!iscaliforniaonfire?') {
      message.channel.send('http://iscaliforniaonfire.com/')
    }
  if (message.content === '!teemo'){
    message.channel.send({embed: embeds.teemoEmbed})
    message.channel.send({files: [teemo]})
  }
  if (message.content === '!help'){
    message.channel.send({embed: embeds.helpEmbed})
  }

  if (message.content ==='!hehe'){
    message.channel.send({ files: [hehe] })
  }
});

client.login(config.token);
