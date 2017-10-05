

function sendMessageToParticipants(group,message) {

var chats = Store.Chat.models;
var map={};


for (chat in chats) {
    var conversation = chats[chat];
    if (conversation.__x_isGroup === true) {
        var groupName = conversation.__x_formattedTitle;
        var groupId = conversation.__x_id;
        if (groupName.search(group) != -1) {   /*If group is cclub then*/

            var participants = conversation.__x_groupMetadata.participants.models;
            console.log(participants);
            if (participants.length === 0)
                continue;

            for (i in participants) {
                //window.reload(5000);
                setTimeout(myFunction, 5000)
                function myFunction() {
                    console.log("Hello");
                }
                var userId = participants[i].__x_id;

                if (userId === undefined || groupId === undefined)
                    continue;
                console.log(userId + " " + groupId);

                //Addded message part here*
                var Chats = Store.Chat.models;
                var contact = userId;

                var flag = false;
                for (chat in Chats) {
                    if (!isNaN(chat)) {
                        var temp = {};
                        temp.contact = Chats[chat].__x__formattedTitle;
                        temp.id = Chats[chat].__x_id;
                        if (temp.id === contact && temp.id.search('g.us') === -1) {
                            flag = true;
                            break;
                        }
                    }

                }



                if (!flag) {
                    Store.Chat.gadd(userId);
                }
                var Chats = Store.Chat.models;
                var contact = userId;


                var flag = false;
                for (chat in Chats) {
                    if (!isNaN(chat)) {
                        var temp = {};
                        temp.contact = Chats[chat].__x__formattedTitle;
                        temp.id = Chats[chat].__x_id;
                        if (temp.id === contact) {
                            flag = true;

                            if (temp.id in map)
                                continue;
                            else
                                map[temp.id]=true;Chats[chat].sendMessage(message);
                            console.log(temp.id);
                            break;
                        }

                    }


                }


            }
            console.log("\n");


        }
    }
}

}
