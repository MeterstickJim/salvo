/***
 *    ███████╗ █████╗ ██╗    ██╗   ██╗ ██████╗
 *    ██╔════╝██╔══██╗██║    ██║   ██║██╔═══██╗
 *    ███████╗███████║██║    ██║   ██║██║   ██║
 *    ╚════██║██╔══██║██║    ╚██╗ ██╔╝██║   ██║
 *    ███████║██║  ██║███████╗╚████╔╝ ╚██████╔╝
 *    ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═══╝   ╚═════╝
 *
 *          ██████╗              ██████╗
 *         ██╔═══██╗            ██╔═══██╗
 *         ██║   ██║            ██║   ██║
 *         ██║   ██║            ██║   ██║
 *         ╚██████╔╝            ╚██████╔╝
 *          ╚═════╝              ╚═════╝
 *
 *                   ██╗   ██╗
 *         ▄ ██╗▄    ██║   ██║    ▄ ██╗▄
 *          ████╗    ██║   ██║     ████╗
 *         ▀╚██╔▀    ██║   ██║    ▀╚██╔▀
 *           ╚═╝     ╚██████╔╝      ╚═╝
 *                    ╚═════╝
 */

//    Salvo V 0.6 - "You've Got Mail!" Edition.

// Instantiation
const config = require('./config.json');
const Discord = require("discord.js");
var MailListener = require("mail-listener2");
const bot = new Discord.Client();
let newUsers = new Discord.Collection();
var isMaster = false;
var isBeta = false
var isConnectedToImapProtocol = false;
var ticketNumber = 1000;
var time = new Date();

//Mail Listener Definition
//////////////////////////
var mailListener = new MailListener({
  username: config.SALVOEMAIL,
  password: config.SALVOPASS,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX",
  markSeen: true,
  fetchUnreadOnStart: false,
  attachments: false, //See deactivated code block.
  attachmentOptions: { directory: "attachments/" }
});

// Function Definitions
////////////////////////////////////

// Returns a random element in the passed array.
function pickRandom(stuff) {
    return stuff[Math.floor(Math.random() * stuff.length)];
}
// End Function Definitions
////////////////////////////////////

// INITIIALIZATION PROTOCOLS
//////////////////////////////////////////////////////
// /!\ Implement Try/Catch block at some point.

console.log("Initializing Salvo...");
  bot.login(config.token);
  bot.on('ready', () => {
    bot.user.setGame('-Help for Help');
  })
console.log("Done!");
  mailListener.start();
console.log("Starting Mail Listener...");
  mailListener.on("server:connected", function(){
    isConnectedToImapProtocol = true;
  });
if(isConnectedToImapProtocol = true){
  console.log("Internet Message Access Protocol Connected");
} else console.log("ERROR: Unable to resolve Message Access Protocols");
console.log("Complete!")
console.log("Salvo online at " + time.toString());

//Connection Logging Commands

mailListener.on("server:disconnected", function(){
  console.log("Internet Message Access Protocol Disconnected");
});

// END INTIIALIZATION PROTOCOLS
////////////////////////////////////////////////////

//MAIL LISTENER MODULES
////////////////////////////////////////////////////

//Logs errors to the console.
mailListener.on("error", function(err){
  console.log(err);
});

//Reports emails.
mailListener.on("mail", function(mail){
  console.log(mail.from[0].address);
  if(mail.from[0].address == "garrett.pessink@gmail.com"){
    console.log("It's Garrett");
  }

/*
I don't expect anyone other than me to ever actually...
Like, see this code. But if you do, this is the area
where code will execute whenever Salvo gets an email
from UTTyler ACM. If you want to edit the code that
triggers when then happens, then do it right here.
*/

});

////////////////////////////////////////////////////
//END MAIL LISTENER MODULES


//SALVO CHAT COMMANDS
///////////////////////////////////////////////////
bot.on("message", (message) => {
  //console.log(message.author.username + ": " + message.content);
  //Method dormant.

  // Set the prefix
  let prefix = "-";
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;
  // Exit if any bot
  if (message.author.bot) return;
  // Check for Master
  if(message.author.id == config.masterID || message.author.id == config.specialID){
    isMaster = true;
  }

// Master Only Commands

  // Test of Master Only Command
    if (isMaster && message.content.startsWith(prefix + "doot")) {
      message.channel.sendMessage(right.getTime()).then((message => message.delete(5000)));
    }

// Common Commands

  // Ping Test Command
    if (message.content.startsWith(prefix + "ping")) {
      message.channel.sendMessage("pong!");
    } else

  // Submit a suggestion to the SuggestionBox Channel
    if (message.content.startsWith(prefix + "suggest")) {
      //Gets the message content
      let content = message.content.slice(8,message.content.length);
      //Send formatted message to the SuggestionBox Channel
      bot.channels.get(config.suggestions).sendMessage("Suggestion from " + message.author + ":\n" + content);
      //Tell the submitter that their message was successfully submitted.
      message.channel.sendMessage("Your suggestion has been submitted. Your ticket number is " + ticketNumber);
      ticketNumber++;
}
});
// END SALVO CHAT COMMANDS
//////////////////////////////////////////////////////

// CODE GRAVEYARD
/////////////////////////////////////////////////////
/* Disabled Attachement Code
mailListener.on("attachment", function(attachment){
  console.log("I got an attachment");
});

bot.channels.get(config.console).sendMessage("Salvo Online");
*/
////////////////////////////////////////////////////
