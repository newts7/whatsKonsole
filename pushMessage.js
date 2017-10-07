var chats=Store.Chat.models
for(chat in chats) {
    var conversation = chats[chat];
    if (conversation.__x_isUser === true) {
        var pendingMessageCount = conversation.__x_unreadCount;
        if (pendingMessageCount == 0)
            continue;
        //console.log(conversation);
        var userName = conversation.__x_formattedTitle;
        var userId = conversation.__x_id;
        var firstMessageinConversation = conversation.__x_previewMessage;
        var text = firstMessageinConversation.__x_body;
        var isunRead = firstMessageinConversation.__x_isUnreadType;
        var sender = firstMessageinConversation.__x_from;
        if (isunRead){
            //console.log(sender + " " + isunRead + " " + text);
            var message=sender+" "+"says- "+text;
            console.log(message);
            sendMessage(message);
        }
    }
}

function sendMessage(message) {

    var Chats = Store.Chat.models;
    var groupName = "cclub mouth";


    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        };
        //console.log(chat);
        if (Chats[chat].__x_isGroup === true) {
            if (Chats[chat].__x_formattedTitle == groupName) {

                Chats[chat].sendMessage(message);
            };
        }
    }

};