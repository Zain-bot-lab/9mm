module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        // Send the first message "Hello, I am here!"
        api.sendMessage("Hello, I am here!", threadID, () => {
            // Send the bot connection message
            const fs = require("fs");
            return api.sendMessage("", event.threadID, () => api.sendMessage({
                body: `╰⊱✿ ʙᴏᴛ ᴄᴏɴɴᴇᴄᴛᴇᴅ ✿⊱╮
                
🌟🍇 ʜᴇʟʟᴏ ɢᴜʏs, ᴍʏ ɴᴀᴍᴇ ɪs 🌼🍉🌸•••✧ʙᴏᴛ✧•••✨🌹

... (Rest of your bot message content remains here) ...
`, 
                attachment: fs.createReadStream(__dirname + "/cache/botjoin.mp4")
            }, threadID));
        });
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
 
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinvideo");
            const pathGif = join(path, `${threadID}.video`);
 
            var mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);
            
            (typeof threadData.customJoin == "undefined") ? msg = "Hello  {name},\n─────────────────\n You're The {soThanhVien}Member ─────────────────\nOf {threadName} Group\n─────────────────\nPlease Enjoy Your Stay\n─────────────────\nAnd Make Lots Of Friends =)\n──────-°°__𝗧𝗿𝘂𝘀𝘁 𝗺e 🔐 °__!!>☁️✨❤️ My Owner  ✦͙͙͙͙❥⃝∗⁎.ʚ ZAIN JUTT ɞ.⁎∗❥⃝**͙✦͙͙͙ ❤️ Love you 😘 ummmma ❤️😍" : msg = threadData.customJoin;
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);
 
            if (existsSync(path)) mkdirSync(path, { recursive: true });
 
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
 
            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathvideo), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }
 
            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
}
