

    var chats = Store.Chat.models;
var map={};

    for (chat in chats) {
        var conversation = chats[chat];
        if (conversation.__x_isGroup === true) {
            var groupName = conversation.__x_formattedTitle;
            var groupId = conversation.__x_id;
            if (groupName.search("cclub-II IT KIET") != -1) {   /*If group is cclub then*/

                var participants = conversation.__x_groupMetadata.participants.models;
                console.log(participants);
                if (participants.length === 0)
                    continue;

                for (i in participants) {
                    var userId = participants[i].__x_id;

                    if (userId === undefined || groupId === undefined)
                        continue;
                   // console.log(userId + " " + groupId);

                    //Addded message part here*
                    var Chats = Store.Chat.models;
                    var contact = userId;
                    var message = "Hi I'm cclub admin, I'll be your personal point of contact to cclub. Have you applied for the project: front end dev yet?";
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
                        var message = "Hi  I'm cclub admin, I'll be your personal guide to cclub, AMA for this week is scheduled to be on Saturday. Please suggest what kind of speaker you want this week";
                        var flag = false;
                        for (chat in Chats) {
                            if (!isNaN(chat)) {
                                var temp = {};
                                console.log("hii");
                                temp.contact = Chats[chat].__x__formattedTitle;
                                temp.id = Chats[chat].__x_id;
                                if (temp.id === contact) {
                                    flag = true;

                                    if (temp.id in map)
                                        continue;
                                    else
                                    map[temp.id]=true,Chats[chat].sendMessage(message);
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
