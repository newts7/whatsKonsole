


var processedMessages = {};
var processedEvents={};
var duplicateList = {};
var spamList = {
  "16502898894@c.us": true,
  "918218962520@c.us": true,
  "917983354236@c.us": true,
  "919414367835@c.us": true,
  "919458046050@c.us": true,
  "919997554207@c.us": true,
  "918955333413@c.us": true,
  "919008767748@c.us": true,
  "919456889843@c.us": true,
  "919627784730@c.us": true,
  "918826654535@c.us": true,
  "917060447169@c.us": true,
  "919555472138@c.us": true,
  "918447719975@c.us": true,
  "919887465969@c.us": true,
  "919458824315@c.us": true
};
var time = 30000;
var dowork = setInterval(main, time);
var firstrun = true;
var consoleGroup = "cclub production";

var recieveGroup = "cclub mouth";

var mode = "DM";
var mouthGroup = "cclub mouth";
var feedbackGroup = "cclub feedback";
var amaQuestionGroup = "cclub ama questions";


var amaFlag = false;
var duplicateFlag = false;

var amaRunCount = 0;
var speakerGroup = "cclub speaker";
var amaGroups = ["Bot testing 1", "Bot testing 2","cclub AMA","cclub AMA 2","cclub AMA 3","cclub AMA 4"];

var amaRecipient=[];

var speakerName = "xyz";
var logs = [];
var lock= false;
var actionGroups = {
"#stop" : "action #stop",
"#group" : "action #groups",
"#cclub" : "action #cclub",
"#invite" : "action #invite",
"#careerchat" : "action #careerchat",
"#bugreport" : "action #bugreport"
};

function main() {

console.log("Printing value of lock");
console.log(lock);
  if(lock == true){
  console.log("Clearing new thread of main ");
  return ;
  }
console.log(">> Setting lock for this thread <<");
lock = true;

  pushMessage();
  analytics();
  var newMsg = checkMessage();
  if (firstrun) {
    console.log("This was first run");
    logs.push("*WhatsKonsole* is live!");
    pushLog();
    lock = false;
    firstrun = false;
    return;
  }
  if (newMsg != null) {
    console.log(newMsg);
    if (isCommand(newMsg)) {
      console.log("It's a command");
      switch (checktype(newMsg)) {
        case 'i':
          console.log("individual");
          logs.push("Individual message mode on!");
          processIndividualMessage(newMsg);
          break;
        case 'g':
          console.log("group");
          logs.push("Group Message mode on!");
          processGroupParticipants(newMsg);
          break;
        case 'c':
          console.log("check for whatsKonsole ....");
          logs.push("checking for  whatsKonsole .....");
          console.log(newMsg);
          var serviceName = processService(newMsg);
          console.log(serviceName);
          switch (serviceName) {
            case 'status':
              console.log("checking for status");
              var statusMessage = "";

              if (amaFlag)
                statusMessage = statusMessage + "AMA mode is ON\n";
              else
                statusMessage = statusMessage + "AMA mode is OFF\n";

              if (duplicateFlag)
                statusMessage = statusMessage + "Remove Duplicate Mode is ON\n";
              else
                statusMessage = statusMessage + "Remove Duplicate Mode is OFF\n";

              if (recieveGroup === mouthGroup)
                statusMessage = statusMessage + "Messages will be pushed to mouth group\n";
              if (recieveGroup === amaQuestionGroup)
                statusMessage = statusMessage + "Messages will be pushed to ama question group\n";
              if (recieveGroup === feedbackGroup)
                statusMessage = statusMessage + "Messages will be pushed to feedback Group\n";

              logs.push(statusMessage);
              break;
            case 'manual':
              var manualMessage = "Following are the list of commands supported in Production - \n" +
                "1. Check Health Status/Manual\n\n" +
                "$ sudo -c \n" +
                "$ sudo -c manual\n" +
                "$ sudo -c status\n" +
                "2. Starting Service\n\n" +
                "$ sudo -s ama\n" +
                "$ sudo -s rd\n" +
                "$ sudo -s f\n" +
                "3. Stopping Service\n\n" +
                "$ sudo -x ama\n" +
                "$ sudo -x rd\n" +
                "$ sudo -x f\n" +
                "4. Broadcast/Unicast\n\n" +
                "$ sudo -g groupName,Message\n" +
                "$ sudo -i phoneNumber,Message\n";
              logs.push(manualMessage);
              break;
            default:
              logs.push("Yes whatsKonsole is live!");
          }
          break;
        case 's':
          console.log("start a Service");
          logs.push("Starting a service! ");
          console.log(newMsg);
          var serviceName = processService(newMsg);
          console.log(serviceName);
          switch (serviceName) {
            case 'ama':
              amaFlag = true;
              mode = "ama";
              recieveGroup = amaQuestionGroup;
              console.log("AMA service is started");
              logs.push("AMA service is started!");
              break;
            case 'rd':
              duplicateFlag = true;
              console.log("Remove Duplicate mode is on");
              logs.push("Remove Duplicate service is started!");
              break;
            case 'f':
              recieveGroup = feedbackGroup;
              mode = "feedback";
              logs.push("Feedback mode is started replies will now be pushed to feedback group");
              break;
          }
          break;
        case 'x':
          console.log("stop a Service");
          console.log(newMsg);
          var serviceName = processService(newMsg);
          console.log(serviceName);
          switch (serviceName) {
            case 'ama':
              amaFlag = false;
              amaRunCount = 0;
              recieveGroup = mouthGroup;
              mode = "DM";
              console.log("AMA service is stopped");
              logs.push("AMA service is stopped !");
              break;
            case 'rd':
              duplicateFlag = true;
              duplicateList = {};
              console.log("Remove Duplicate mode is off");
              logs.push("Remove Duplicate service is stopped! ");
              break;
            case 'f':
              recieveGroup = mouthGroup;
              mode = "DM";
              logs.push("Feedback mode is stopped replies will now be pushed to mouth group");
              break;
          }
          break;
      }

      //process(newMsg);
    }
  } else {
    console.log("No new Message to process");
  }
  if (amaFlag)
    ama();
  pushLog();
lock = false;
}

function checktype(newMsg) {
  var c = newMsg[8];
  console.log(c);
  return c;
}

function checkMessage() {
  var chats = Store.Chat.models;
  for (chat in chats) {
    var conversation = chats[chat];
    if (conversation.__x_formattedTitle === consoleGroup) {
      var messages = conversation.__x_previewMessage;
      var msgBody = messages.__x_body;
      var msgId = messages.__x_id.id;
      if (msgId in processedMessages)
        return null;
      else {
        console.log(msgBody + " " + msgId);
        processedMessages[msgId] = true;
        return msgBody;
      }
    }
  }
}

function isCommand(newMsg) {
  if (newMsg[0] == '$')
    return true;
  else
    return false;
}

function processGroupParticipants(newMsg) {
  var res = newMsg.slice(10, newMsg.length);
  var groupName = "";
  var message = "";
  var flag = false;
  for (var i = 0; i < res.length; i++) {
    if (res[i] === ',' && flag === false) {
      flag = true;
      continue;
    }
    if (flag)
      message = message + res[i];
    else
      groupName = groupName + res[i];
  }
  console.log("group name is- " + groupName);
  console.log(groupName.length);
  console.log("message is- " + message);

  sendMessageToParticipants(groupName, message);
}

function processIndividualMessage(newMsg) {
  var res = newMsg.slice(10, newMsg.length);
  var individualName = "";
  var message = "";
  var flag = false;
  for (var i = 0; i < res.length; i++) {
    if (res[i] === ',' && flag === false) {
      flag = true;
      continue;
    }
    if (flag)
      message = message + res[i];
    else
      individualName = individualName + res[i];
  }
  console.log("Individual id is- " + individualName);
  console.log(individualName.length);
  console.log("message is- " + message);

  sendMessageToIndividual(individualName, message);
}

function sendMessageToIndividual(contact, message) {

  var Chats = Store.Chat.models;
  contact = contact + "@c.us";

  if (contact in spamList) {
    console.log("Number is in spamList");
    return;
  }

  flag = false;

  for (chat in Chats) {
    if (isNaN(chat)) {
      continue;
    };
    var temp = {};
    temp.contact = Chats[chat].__x__formattedTitle;
    temp.id = Chats[chat].__x_id;
    if (temp.id.search(contact) != -1) {
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
    };
    var temp = {};
    temp.contact = Chats[chat].__x__formattedTitle;
    temp.id = Chats[chat].__x_id;
    if (temp.id.search(contact) != -1) {
      Chats[chat].sendMessage(message);

    }
  }

}



function sendMessageToParticipants(group, message) {
  console.log(group);
  var chats = Store.Chat.models;
  var map = {};
  var totalDelivery = 0;

  for (chat in chats) {
    var conversation = chats[chat];
    if (conversation.__x_isGroup === true) {
      var groupName = conversation.__x_formattedTitle;
      var groupId = conversation.__x_id;
      if (groupName === group) { /*If group is cclub then*/

        var participants = conversation.__x_groupMetadata.participants.models;
        console.log(participants);
        if (participants.length === 0)
          continue;

        for (i in participants) {

          var userId = participants[i].__x_id;

          if (userId in spamList) {
            console.log("Number in spam list");
            continue;
          }

          if (userId === undefined || groupId === undefined)
            continue;

          if (duplicateFlag === true) {
            if (userId in duplicateList) {
              console.log(userId + " is in duplicate list ");
              continue;
            } else {
              duplicateList[userId] = true;
            }
          }


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
                else {
                  map[temp.id] = true;
                  Chats[chat].sendMessage(message);
                  totalDelivery++;
                }
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

  logs.push("Total Successful Deliveries - " + totalDelivery);
}

function pushMessage() {
  var chats = Store.Chat.models;
  var ownId = "917678138666@c.us";
  var toSendMessages = [];
  for (var chat = 0; chat < chats.length; chat++) {
    var conversation = chats[chat];
    if (conversation.isUser) {
      if (conversation.unreadCount > 0) {
        conversation.sendSeen();
        var newMsgCount = conversation.unreadCount;
        //console.log(newMsgCount);
        var getMsgs = conversation.getAllMsgs();
        ///console.log(getMsgs);
        var unreadMsgs = getMsgs.splice(getMsgs.length - newMsgCount, getMsgs.length);
        console.log(unreadMsgs);
        for (var i = 0; i < unreadMsgs.length; i++) {
          var Msg = unreadMsgs[i];
          var sender = Msg.__x_from;
          var body = Msg.__x_body;
          var msgId = Msg.__x_id.id;
          if (msgId in processedMessages)
            continue;
          processedMessages[msgId] = true;
          if (sender != ownId && sender != undefined) {
            console.log("Sender is- " + sender);
            console.log("Message is- " + body);
            toSendMessages.push(sender + " says- " + body);
//            $.ajax({
//              type: 'POST',
//              url: 'http://search-elasticsearch-cclub-lkbc5wtkdx76ijfw2w237hvmum.us-east-1.es.amazonaws.com/whatsapp/GROUP/',
//              data: JSON.stringify({
//                message: JSON.stringify(Msg),
//                sender: sender,
//                id: msgId,
//                type: mode
//              }), //
//              success: function(data) {
//                console.log(data);
//              },
//              contentType: "application/json; charset=utf-8",
//              dataType: 'json'
//            });
          }
        }


      }
    }
  }

  console.log(toSendMessages);
  for (var i = 0; i < toSendMessages.length; i++) {
    sendMessage((toSendMessages[i]));

  }

   for (var i = 0; i < toSendMessages.length; i++) {
    pushAction((toSendMessages[i]));
  }

  }


function pushAction(message){

for (i in actionGroups){
if (message.search(i)!=-1){
sendMessageToGroup(actionGroups[i],message);
}
}

}

  function sendMessage(message) {

    var Chats = Store.Chat.models;
    var groupName = recieveGroup;


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


function processService(newMsg) {
  var serviceName = newMsg.slice(10, newMsg.length);
  serviceName = serviceName.toLowerCase();
  return serviceName;
}

function ama() {

  console.log("AMA chal raha hai bhaiya");
  speakerTochannels();
  amaRunCount++;
}

function speakerTochannels() {
  console.log("speaker->channels");
  var toSendMessages = [];
  var chats = Store.Chat.models;
  for (var i = 0; i < chats.length; i++) {
    var conversation = chats[i];
    if (conversation.__x_formattedTitle === speakerGroup) {
      if (conversation.unreadCount > 0) {
        var newMsgCount = conversation.unreadCount;
        console.log(newMsgCount);
        var getMsgs = conversation.getAllMsgs();
        var unreadMsgs = getMsgs.splice(getMsgs.length - newMsgCount, getMsgs.length);
        console.log(unreadMsgs);
        isnewMsg = false;
        for (var j = 0; j < unreadMsgs.length; j++) {
          var Msg = unreadMsgs[j];
          var sender = Msg.__x_author;
          var body = Msg.__x_body;
          var id = Msg.__x_id.id;
          if (id in processedMessages)
            continue;
          processedMessages[id] = true;
          var fromMe = Msg.__x_id.fromMe;
          if (fromMe)
            continue;
          console.log(Msg);
          if(unreadMsgs[j].__x_isMedia){
          continue;
          }
          if (isAMACommand(body)) {
            console.log('Yes, from speaker and a command');
            console.log(Msg);
            console.log(Msg.quotedMsgObj());
            toSendMessages.push(Msg.quotedMsgObj());

            //Posting to this  server
            /*                      $.ajax({
                            type: 'POST',
                            url: 'https://search-elasticsearch-cclub-lkbc5wtkdx76ijfw2w237hvmum.us-east-1.es.amazonaws.com/',
                            data: JSON.stringify(Msg.quotedMsgObj), // or JSON.stringify ({name: 'jonas'}),
                            success: function(data) {console.log(data); },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json'
                        });
*/
          }


        }
        if (!isnewMsg) {
          console.log("No new Message to process in speaker group");
        }

      }
    }
    conversation.sendSeen();
  }


  if (amaRunCount === 0)
    return;
  console.log(toSendMessages);

if(toSendMessages.length>0){
console.log(">>>Sending message of ama started <<<");
  sendMessageMultimedia(toSendMessages);
}
}

function sendMessageMultimedia(unreadMsgs) {

    /*for( var i=0;i<amaRecipient.length;i++)
    {
        sendMessageUsingForward(amaRecipient[i],unreadMsgs);
    }*/
    console.log("Inside Send Message Multimedia");
    var index = 0;
    var writeAma = setInterval(function(){
    console.log(index);
    if(index ==  amaRecipient.length){
    console.log("This message of ama has been delivered");
    clearInterval(writeAma);
    }
    console.log("Sending AMA message to user number");
    console.log(index);
    sendMessageUsingForward(amaRecipient[index],unreadMsgs);
    index++;
    },1000);

/*
  for (var i = 0; i < amaGroups.length; i++) {
    var recieverName = amaGroups[i];
    var chats = Store.Chat.models;
    for (chat in chats) {
      var conversation = chats[chat];
      var groupName = conversation.__x_formattedTitle;
      if (groupName === recieverName) {
        conversation.forwardMessages(unreadMsgs);
        break;
      }
    }
  }
*/

}




function isAMACommand(body) {
  if (body[0] == '#')
    return true;
  else
    return false;
}

function pushLog() {

  for (var i = 0; i < logs.length; i++) {
    sendMessageToGroup(consoleGroup, logs[i]);
  }
  logs = [];
}

function sendMessageToGroup(groupName, message) {
  var chats = Store.Chat.models;
  for (chat in chats) {
    var conversation = chats[chat];
    if (conversation.__x_formattedTitle === groupName) {
      conversation.sendMessage(message);
    }
  }
}

function analytics() {
   // leaveJoin();
}

function leaveJoin() {
    var leavefolks={};
    var joinfolks={};
    var chats=Store.Chat.models;
     var toSendMessages = [];
for( var i=0;i<chats.length;i++) {
    var conversation = chats[i];
    if(isNaN(i))
    {
        continue;
    }
    var isGroup = conversation.__x_isGroup;
    var groupName=conversation.__x_formattedTitle;
    if(isGroup){
        if(groupName.search("cclub")!=-1){
            var msgs=conversation.getAllMsgs();
            for(var j=0; j<msgs.length;j++){
                var  msg=msgs[j];
                var msgId=msg.__x_id.id;
                var type=msg.__x_type;
                var subtype=msg.__x_subtype;
                if(msgId in processedEvents){
                  continue;
                }
                processedEvents[msgId]=true;
                if(type=="gp2"&&(subtype=="add"||subtype=="invite"||subtype=="leave")){
                    console.log(msg);
                    var recipient=msg.__x_recipients[0];
                    console.log(groupName+" - "+recipient+" - "+subtype);
                    if(subtype=="add"||subtype=="invite") {
                        toSendMessages.push(recipient + " joined " + groupName);
                        joinfolks[recipient]=groupName;
                    }
                    else {
                        toSendMessages.push(recipient + " left " + groupName);
                        leavefolks[recipient]=groupName;
                    }
                }
            }
        }
    }
}

if(firstrun)
  return ;
else {
  for(var i=0;i<toSendMessages.length;i++){
    sendMessageToGroup("cclub events",toSendMessages[i]);
    for(var i in leavefolks)
    {
      var number=i.replace('@c.us','');
      var message="Hi, Prachi this side from cclub and apologies if " +
          "I am bothering You. \n\n"
          +"I noticed that you recently left "+
          leavefolks[i]+
          " group. Could you help us understand what we can do" +
          "better to stay relevant to you ?";
        sendMessageToIndividual(number,message);
    }
  }

}

}


function  sendMessageUsingForward(id,messages) {

    var Chats = Store.Chat.models;
    var contact = id;

    flag = false;

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.id = Chats[chat].__x_id;
        if (temp.id===id) {
            flag = true;
        }
    }
    if (!flag) {
        Store.Chat.gadd(contact);
    }

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.id = Chats[chat].__x_id;
        if (temp.id===id) {
            console.log("Forwarding Message");
            try{
                Chats[chat].forwardMessages(messages);
            }catch(e){

                console.log("Maa chudao");
            }
        }
    }


}
