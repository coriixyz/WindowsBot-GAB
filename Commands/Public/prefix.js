module.exports = (bot, db, config, winston, userDocument, serverDocument, channelDocument, memberDocument, msg, suffix) => {
let info = `:robot: To use this bot, the prefix is **/** `;
	if(suffix) {
	{
		}
			msg.channel.createMessage({
		embed: {
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL,
                url: "https://windowsbot.us"				
            },
            color: 0x00FF00,
			description: info
		}
		});
	} else {
		msg.channel.createMessage(`The command prefix is **/** `);
	}
};
