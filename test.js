


var processedMsgs={};
var chats=Store.Chat.models;
var time=30000;
var doWork=setInterval(main,time);
var speakerGroup="cclub speaker";
var amaGroups=["Bot testing 1","Bot testing 2"];
var speakerName="*Aishwarya Singh*";
var mouthGroup="cclub mouth";
var runCount=0;

function main()
{
    console.log(runCount);
    speakerTochannels();
    runCount++;
}

function  isCommand(body)
{
    if(body[0]=='#')
        return true;
    else
        return false;
}



function speakerTochannels(){
    console.log("speaker->channels");
    var toSendMessages=[];
    for (var i = 0; i < chats.length; i++)
    {
        var conversation = chats[i];
        if (conversation.__x_formattedTitle === speakerGroup)
        {
            if (conversation.unreadCount > 0)
            {
                var newMsgCount = conversation.unreadCount;
                console.log(newMsgCount);
                var getMsgs = conversation.getAllMsgs();
                var unreadMsgs = getMsgs.splice(getMsgs.length - newMsgCount, getMsgs.length);
                console.log(unreadMsgs);
                isnewMsg=false;
                for (var j = 0; j < unreadMsgs.length; j++) {
                    var Msg = unreadMsgs[j];
                    var sender = Msg.__x_author;
                    var body = Msg.__x_body;
                    var id = Msg.__x_id.id;
                    if (id in processedMsgs)
                        continue;
                    console.log(id);
                    processedMsgs[id] = true;
                    var fromMe = Msg.__x_id.fromMe;
                    if (fromMe)
                        continue;
                   // console.log(Msg);
                    if(isCommand(body)){

                        console.log(Msg);
                        console.log(Msg.quotedMsgObj());
                        toSendMessages.push(Msg.quotedMsgObj());
                    }


                }
                if(!isnewMsg)
                {
                    console.log("No new Message to process in speaker group");
                }

            }
        }
        conversation.sendSeen();
    }


    if(runCount===0)
        return ;
    console.log(toSendMessages);
sendMessageMultimedia(toSendMessages);
}

function  sendMessageMultimedia(unreadMsgs) {
    var recieverName="Bot testing 1";
    for (chat in chats)
    {
        var conversation=chats[chat];
        var groupName = conversation.__x_formattedTitle;
        if(groupName===recieverName)
        {
            conversation.forwardMessages(unreadMsgs);
            break;
        }
    }
}
