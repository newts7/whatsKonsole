
var time=5000;

var dotask=setInterval(sendMessage,time);
var index=0;
var contacts=["917275493769",
];

function sendMessage()
{
    if(index==contacts.length) {
        clearInterval(dotask);
        return;
    }
    var Chats = Store.Chat.models;
    var contact = contacts[index];
    var message = "Hey, we have 700+ students from 8 colleges now and organising cclub is getting hard. Could you please reply back with the name of your college.?";
    contact = contact + "@c.us";


    flag = false;

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.contact = Chats[chat].__x__formattedTitle;
        temp.id = Chats[chat].__x_id;
        if (temp.id.search(contact) != -1) {
            flag = true;
        }
    }
    console.log(contact);
    if (!flag) {
        Store.Chat.gadd(contact);
    }

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.contact = Chats[chat].__x__formattedTitle;
        temp.id = Chats[chat].__x_id;
        if (temp.id.search(contact) != -1) {
            Chats[chat].sendMessage(message);

        }
    }
    index++;
    console.log(index);
}