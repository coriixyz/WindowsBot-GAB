module.exports = (bot, db, config, winston, userDocument, serverDocument, channelDocument, memberDocument, msg, suffix, commandData) => {
	let member;
	if(!suffix || suffix.toLowerCase()=="me") {
		member = msg.member;
	} else {
		member = bot.memberSearch(suffix, msg.channel.guild);
	}
	if(member) {
		msg.channel.createMessage({
			embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                    url: "https://github.com/Corii/WindowsBot"
                },
                color: 0x00FF00,
				title: member.user.username + `'s avatar`,
                image: {
                    url: member.user.avatarURL || member.user.defaultAvatarURL
                }
			}
		});
	} else {
		winston.warn(`Requested member does not exist so ${commandData.name} cannot be shown`, {svrid: msg.channel.guild.id, chid: msg.channel.id, usrid: msg.author.id});
		msg.channel.createMessage({
			embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                    url: "https://github.com/Corii/WindowsBot"
                },
                color: 0x9ECDF2,
				description: `:exclamation: User not found! They must be in the server and must be mentionable by the bot.`
			}
		});
	}
};
