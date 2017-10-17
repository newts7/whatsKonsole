
var time=5000;

var dotask=setInterval(sendMessage,time);
var index=0;
var spamList={
    "919045321537@c.us":true,
    "16502898894@c.us":true,
    "918218962520@c.us":true,
    "917983354236@c.us":true,
    "918860175382@c.us":true
};
var contacts=["917275493769@c.us",
             "919045321537@c.us",
    "918860175382@c.us"
];

function sendMessage()
{
    if(index==contacts.length) {
        clearInterval(dotask);
        return;
    }
    var Chats = Store.Chat.models;
    var contact = contacts[index];
    var message = "Hello it's me, and i have been wondering that after all these years, you'd like to meet, HellOoooo";
//    contact = contact + "@c.us";

    if(contact in spamList) {
        return;
    }

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