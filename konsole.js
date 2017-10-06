var processedMessages={};
var time=30000;
var dowork=setInterval(main,time);
var firstrun=true;

function main() {
    var newMsg=checkMessage();
    if(firstrun){
        console.log("This was first run");
        firstrun=false;
        return ;
    }
    if(newMsg!=null){
        console.log(newMsg);
        if(isCommand(newMsg)) {
            console.log("It's a command");
            switch (checktype(newMsg))
            {
                case 'i':console.log("individual");
                    processIndividualMessage(newMsg);
                    break;
                case 'g': console.log("group");
                    processGroupParticipants(newMsg);
                    break;
            }

            //process(newMsg);
        }
    }
    else{
        console.log("No new Message to process");
    }
}

function checktype(newMsg) {
    var c=newMsg[8];
    console.log(c);
    return c;
}

function checkMessage() {
    var chats = Store.Chat.models;
    for (chat in chats) {
        var conversation = chats[chat];
        if (conversation.__x_formattedTitle ==="cclub production") {
            var messages = conversation.__x_previewMessage;
            var msgBody = messages.__x_body;
            var msgId = messages.__x_id.id;
            if(msgId in processedMessages)
                return null;
            else {
                console.log(msgBody+" "+msgId);
                processedMessages[msgId]=true;
                return msgBody;
            }
        }
    }
}

function isCommand(newMsg){
    if(newMsg[0]=='$')
        return true;
    else
        return false;
}

function processGroupParticipants(newMsg) {
    var res=newMsg.slice(10,newMsg.length);
    var groupName="";
    var message="";
    var flag=false;
    for(var i=0;i<res.length;i++){
        if(res[i]===','&&flag===false){
            flag=true;
            continue;
        }
        if(flag)
            message=message+res[i];
        else
            groupName=groupName+res[i];
    }
    console.log("group name is- "+groupName);
    console.log(groupName.length);
    console.log("message is- "+message);

    sendMessageToParticipants(groupName,message);
}

function processIndividualMessage(newMsg) {
    var res=newMsg.slice(10,newMsg.length);
    var individualName="";
    var message="";
    var flag=false;
    for(var i=0;i<res.length;i++){
        if(res[i]===','&&flag===false){
            flag=true;
            continue;
        }
        if(flag)
            message=message+res[i];
        else
            individualName=individualName+res[i];
    }
    console.log("Individual id is- "+individualName);
    console.log(individualName.length);
    console.log("message is- "+message);

    sendMessageToIndividual(individualName,message);
}

function sendMessageToIndividual(contact,message) {

    var Chats = Store.Chat.models;
    contact=contact+"@c.us";


    flag = false;

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.contact = Chats[chat].__x__formattedTitle;
        temp.id = Chats[chat].__x_id;
        if (temp.id.search(contact) != -1 ) {
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
        if (temp.id.search(contact) != -1 ) {
            Chats[chat].sendMessage(message);

        }
    }

}



function sendMessageToParticipants(group,message) {
    console.log(group);
    var chats = Store.Chat.models;
    var map={};


    for (chat in chats) {
        var conversation = chats[chat];
        if (conversation.__x_isGroup === true) {
            var groupName = conversation.__x_formattedTitle;
            var groupId = conversation.__x_id;
            if (groupName===group) {   /*If group is cclub then*/

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

