let bot = new RiveScript();

const brains = [
  './js/brain.rive'
// './another-category-sample.rive
];
bot.loadFile(brains).then(botReady).catch(botNotReady);

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');

form.addEventListener('submit', (e) => {
e.preventDefault();
selfReply(input_box.value);
input_box.value = '';
});

function botReply(message){
message_container.innerHTML += `<div class="bot">${message}</div>`;
// location.href = '#edge';
}

function selfReply(message){
const messageNoAccents = message.normalize('NFD').replace(/[\u0300-\u036f]/g,"");;
message_container.innerHTML += `<div class="self">${message}</div>`;
// location.href = '#edge';

bot.reply("local-user", messageNoAccents).then(function(reply) {
botReply(reply);
});
}

function botReady(){
bot.sortReplies();
botReply('Hola, buen señor!');
}

function botNotReady(err){
console.log("An error has occurred.", err);
}