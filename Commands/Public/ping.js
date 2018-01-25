const moment = require("moment");

// Check if the bot is alive and well
module.exports = (bot, db, config, winston, userDocument, serverDocument, channelDocument, memberDocument, msg) => {
	let info = `🏓 **${msg.channel.guild.members.get(bot.user.id).nick || bot.user.username}** v${config.version} by Cori running for ${moment.duration(process.uptime(), "seconds").humanize()}.`;
	let responseTime = Math.floor((Date.now() - msg.timestamp)/10);
	msg.channel.createMessage({
		embed: {
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL,
                url: "https://windowsbot.us"				
            },
            color: 0x00FF00,
			description: info,
			footer: {
				text: `This message took ${responseTime}ms. Serving ${bot.users.size} user${bot.users.size==1 ? "" : "s"} in ${bot.guilds.size} server${bot.guilds.size==1 ? "" : "s."}`
			}
		}
	});
};
