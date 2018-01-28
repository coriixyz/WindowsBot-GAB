const moment = require("moment");

// Gets text chat user profile
module.exports = (bot, config, usr, userDocument, titleName) => {
	const firstMember = bot.getFirstMember(usr);
	const mutualServersCount = bot.guilds.filter(svr => {
		return svr.members.has(usr.id);
	}).length;
	let embed_fields = [
	{
		name: "Username",
		value: `${usr.username}#${usr.discriminator}`,
		inline: false
	},
	{
		name: "User ID",
		value: `${usr.id}`,
		inline: false
	},
	{
		name: "Status",
		value: `${firstMember.status}${firstMember.game ? (`, playing **\`${firstMember.game.name}\`**`) : ""}`,
		inline: false
	},
	{
		name: "Created",
		value: `${moment(usr.createdAt).fromNow()}`,
		inline: false
	}];
	embed_fields.push({
		name: "Mutual Servers",
		value: `${mutualServersCount} mutual server${mutualServersCount==1 ? "" : "s"} with ${bot.user.username}`,
		inline: false
	});
	if(!usr.bot && userDocument) {
		if(firstMember.status!= "online" && userDocument.last_seen) {
			embed_fields.push({
				name: "Last seen:",
				value: `${moment(userDocument.last_seen).fromNow()}`,
				inline: false
			});
		}
		if (userDocument.profile_fields) {
			for(const key in userDocument.profile_fields) {
				embed_fields.push({
					name: `ℹ️ ${key}:`,
					value: `${userDocument.profile_fields[key]}`,
					inline: false
				});
			}
		}
	}
	const embed = {
		color: 0x9ECDF2,
		author: {
			name: bot.user.username,
			icon_url: bot.user.avatarURL,
			url: "https://github.com/Corii/WindowsBot"
		},
		fields: embed_fields,
		footer: {
			text: `${usr.username}'s avatar!`,
			icon_url: `${usr.avatarURL || usr.defaultAvatarURL}`
		}
	};
	return embed;
};
