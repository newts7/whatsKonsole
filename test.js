$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/user',
    data: JSON.stringify({"UserId":"fsfsf","GroupId":"ddgdr"}), // or JSON.stringify ({name: 'jonas'}),
    success: function(data) {console.log(data); },
    contentType: "application/json; charset=utf-8",
    dataType: 'json'
});

/*sxdrctfvgbhunjmk

var Chats = Store.Chat.models;
                    var contact = userId;
                    var message = "Hi I'm cclub admin, I'll be your personal guide to cclub, Have you applied for the project: front end dev yet?";
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
                        var message = "Hi  I'm cclub admin, I'll be your personal guide to cclub, Have you applied for the project: front end dev yet?";
                        var flag = false;
                        for (chat in Chats) {
                            if (!isNaN(chat)) {
                                var temp = {};
                                console.log("hii");
                                temp.contact = Chats[chat].__x__formattedTitle;
                                temp.id = Chats[chat].__x_id;
                                if (temp.id === contact) {
                                    flag = true;
                                    Chats[chat].sendMessage(message);
                                    console.log(temp.id);
                                    break;
                                }

                            }


                        }


                }
 */