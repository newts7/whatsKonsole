
var time=5000;

var dotask=setInterval(sendMessage,time);
var index=0;
var contacts=["917275493769@c.us",
             "919045321537@c.us",
    "918860547260@c.us"
];

function sendMessage()
{
    if(index==contacts.length) {
        clearInterval(dotask);
        return;
    }
    var Chats = Store.Chat.models;
    var contact = contacts[index];
    var message = "Hi, I am cclub adminReply with your question for AMA";
//    contact = contact + "@c.us";


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