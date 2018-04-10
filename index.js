var chats=Store.Chat.models;
for (chat in chats){
    var conversation=chats[chat];
    if(conversation.__x_isGroup===true) {
        if (conversation.__x_unreadCount >= 1) {
            var message = conversation.__x_previewMessage;
            var sender = message.__x_author;
            var text = message.__x_body;
            //console.log(sender + " " + text);
            /*Play with text now*/

        }
    }
}


I will, any low end smartphone with dual app support would work, looking for it on olx.