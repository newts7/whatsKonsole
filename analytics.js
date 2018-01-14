var chats=Store.Chat.models;
for( var i=0;i<chats.length;i++) {
    var conversation = chats[i];
    if(isNaN(i))
    {
        continue;
    }
    var isGroup = conversation.__x_isGroup;
    var groupName=conversation.__x_formattedTitle;
    if(isGroup){
        if(groupName.search("xyz")!=-1){
            var msgs=conversation.getAllMsgs();
            for(var j=0; j<msgs.length;j++){
                var  msg=msgs[j];
                //console.log(msg);
                var msgId=msg.__x_id.id;
                var type=msg.__x_type;
                var subtype=msg.__x_subtype;
               // console.log(type);
               // console.log(subtype);
                if(type=="gp2"&&(subtype=="add"||subtype=="invite"||subtype=="leave")){
                    console.log(msg);
                    var recipient=msg.__x_recipients[0];
                    console.log(groupName+" - "+recipient+" - "+subtype);
                }
            }
        }
    }
}