var Discord = require('discord.io');
var auth = require('./auth.json');

console.log(auth.token);
var client = new Discord.Client({
    autorun: true,
    token: auth.token
});

client.on('ready', function () {
    console.log("Successfully connected: " + client.username + " - (" + client.id + ")");
});

client.on('message', (user, userId, channelID, message, event) => {
    console.log(user + " -> " + message);
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        if (args.length == 0) {
            return;
        }
        switch (cmd) {
            case 'random':
                client.sendMessage({
                    to: channelID,
                    message: "```css\n The dream team is: " + shuffle(args).slice(0, 4).join(', ') + "\n```"
                });
                break;
        }
    }
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}