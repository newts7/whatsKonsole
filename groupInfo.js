var chats=Store.Chat.models;
for (chat in chats){
    var conversation=chats[chat];
    if(conversation.__x_isGroup===true) {
        var groupName = conversation.__x_formattedTitle;
        var groupId = conversation.__x_id;
        if (groupName.search("cclub AMA") != -1) {   /*If group is cclub then*/

                var participants=conversation.__x_groupMetadata.participants.models;
                console.log(participants);
                /*Khel to yahan se shuru hoga*/
                console.log("\n");

        }
    }
}