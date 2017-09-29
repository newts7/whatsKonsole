

    var chats = Store.Chat.models;
var map={};

    for (chat in chats) {
        var conversation = chats[chat];
        if (conversation.__x_isGroup === true) {
            var groupName = conversation.__x_formattedTitle;
            var groupId = conversation.__x_id;
            if (groupName.search("cclub /dev/testing") != -1) {   /*If group is cclub then*/

                var participants = conversation.__x_groupMetadata.participants.models;
                console.log(participants);
                if (participants.length === 0)
                    continue;

                for (i in participants) {
                    var userId = participants[i].__x_id;

                    if (userId === undefined || groupId === undefined)
                        continue;
                    console.log(userId + " " + groupId);

                    //Addded message part here*
                    var Chats = Store.Chat.models;
                    var contact = userId;
                    var message = " \*Niti is our next AMA speaker\*"+" \n";
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
                        var message = "Niti is our next AMA speaker \n" +
                            "She co-founded Offrd- they help with non-technical jobs based on hiring tests. She is also India's first woman to get through the Draper university's entrepreneur bootcamp.\n" +
                            "\n" +
                            "But the question was How?\n" +
                            "\n" +
                            "Only a month was left for the April batch and I didn’t have a visa. The bigger problem was funds. \n" +
                            "\n" +
                            "Even though I got a good scholarship amount of 4,500$. I had to arrange for 5,500$. \n" +
                            "\n" +
                            "I requested Draper University to defer my admission for the next batch to help me buy some time.For a young professional with hardly 4 years of experience with 3 career switches, there was no chance of the term called savings. Family money — no way, I stopped that ever since I graduated.\n" +
                            "\n" +
                            "https://medium.com/@shree_niti/story-of-crowdfunding-my-way-to-draper-university-30529c7a8862";
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
