


var processedMsgs={};
var chats=Store.Chat.models;
var time=30000;
var doWork=setInterval(main,time);
var speakerGroup="cclub speaker";
var amaGroups=["cclub AMA testing 1","cclub AMA testing 2"];
var speakerName="speakerName";
var runCount=0;
function main() {
console.log(runCount);


var toSendMessages=[];
    for (var i = 0; i < chats.length; i++) {
        var conversation = chats[i];
        if (conversation.__x_formattedTitle === speakerGroup) {
            if (conversation.unreadCount > 0) {
                var newMsgCount = conversation.unreadCount;
                console.log(newMsgCount);
                var getMsgs = conversation.getAllMsgs();
                var unreadMsgs = getMsgs.splice(getMsgs.length - newMsgCount, getMsgs.length);
                console.log(unreadMsgs);
                isnewMsg=false;
                for (var i = 0; i < unreadMsgs.length; i++) {
                    var Msg = unreadMsgs[i];
                    var sender = Msg.__x_author;
                    var body = Msg.__x_body;
                    var id = Msg.__x_id.id;
                    if (id in processedMsgs)
                        continue;
                    processedMsgs[id] = true;
                    var fromMe = Msg.__x_id.fromMe;
                    if (fromMe)
                        continue;

                    console.log(Msg);
                    isnewMsg=true;
                    if(isFromSpeaker(body)){
                        console.log('Yes, from speaker');
                        console.log(sender);
                        console.log(body);
                        var t_body=body.slice(1,body.length);
                        var finalMsg=speakerName+" says "+t_body;
                        console.log(finalMsg);
                        toSendMessages.push(finalMsg);
                    }


                }
                if(!isnewMsg){
                    console.log("No new Message to process");
                }

            }
        }
        conversation.sendSeen();
    }

if(runCount==0){
        console.log("first run");
        runCount++;
        return ;
}
runCount++;

    console.log(toSendMessages);
    for (var i=0;i<toSendMessages.length;i++){
        sendMessage((toSendMessages[i]));
    }

}

function  isFromSpeaker(body) {
    if(body[0]=='#')
        return true;
    else
        return false;
}


function sendMessage(message) {
for(var i=0;i<amaGroups.length;i++) {
    var Chats = Store.Chat.models;
    var groupName = amaGroups[i];


    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        //console.log(chat);
        if (Chats[chat].__x_isGroup === true) {
            if (Chats[chat].__x_formattedTitle == groupName) {

                Chats[chat].sendMessage(message);
            }
        }
    }
}
}