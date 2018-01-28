const moment = require("moment");

module.exports = (bot, db, config, winston, userDocument, serverDocument, channelDocument, memberDocument, msg) => {
	let embed_fields = [
		{
			name: `Name`,
			value: `__**${msg.channel.guild.name}**__`,
			inline: false
		},
		{
			name: `ID`,
			value: `${msg.channel.guild.id}`,
			inline: false
		},
		{
			name: `Creation Date`,
			value: `${moment(msg.channel.guild.createdAt).fromNow()}`,
			inline: false
		},
		{
			name: `Server Owner`,
			value: `<@${msg.channel.guild.ownerID}>`,
			inline: false
		},
		{
			name: "Member Count",
			value: `${msg.channel.guild.members.size} members`,
			inline: false
		}
	];
	let image_url = "";
	if(msg.channel.guild.iconURL) {
		image_url = msg.channel.guild.iconURL;
	}
	embed_fields.push(
		{
			name: `Messages Today`,
			value: `${serverDocument.messages_today} message${serverDocument.messages_today == 1 ? "" : "s"} today`,
			inline: true
		}
	);
	msg.channel.createMessage({
		embed: {
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL,
                url: "https://github.com/GilbertGobbels/GAwesomeBot"
            },
            color: 0x00FF00,
			fields: embed_fields,
			image: {
				url: image_url
			}
		}
	});
};
