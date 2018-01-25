module.exports = (bot, db, config, winston, userDocument, serverDocument, channelDocument, memberDocument, msg, suffix) => {
	if(suffix && ["bug", "suggestion", "feature", "issue", "request"].indexOf(suffix.toLowerCase())>-1) {
		msg.channel.createMessage({
			embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                    url: "https://windowsbot.us"
                },
                color: 0x9ECDF2,
				description: `🐜 Please file your ${suffix.toLowerCase()} [here](https://github.com/Corii/WindowsBot)`
			}
		});
	} else {
		msg.channel.createMessage({
			embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                    url: "https://windowsbot.us"
                },
                color: 0x9ECDF2,
				description: `Hello! I'm ${bot.user.username}! Use \`${bot.getCommandPrefix(msg.channel.guild, serverDocument)}help\` to list all the commands.\n
• Created by GG142, modified by Cori. 
• Go [here](${config.hosting_url}) to learn more. 
• Join our Discord server [here](${config.discord_link})
• File bugs [here](https://github.com/Corii/WindowsBot)`
			}
		});
	}
};
