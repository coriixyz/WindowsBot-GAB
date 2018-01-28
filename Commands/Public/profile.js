const getUserProfile = require("./../../Modules/UserProfile.js");
const moment = require("moment");

module.exports = (bot, db, config, winston, userDocument, serverDocument, channelDocument, memberDocument, msg, suffix, commandData) => {
	let member;
	if(suffix && suffix.toLowerCase() != "me") {
		member = bot.memberSearch(suffix, msg.channel.guild);
	} else {
		member = msg.member;
	}
	const showProfile = targetUserDocument => {
		msg.channel.createMessage({
			embed: getUserProfile(bot, config, member.user, targetUserDocument, bot.getName(msg.channel.guild, serverDocument, member)),
		}).then(() => {
			let embed_fields = [
			{
				name: `Joined server`,
				value: `${moment(member.joinedAt).fromNow()}`,
				inline: false
			}];
			if(member.nick) {
				embed_fields.push({
					name: `Nickname`,
					value: `${member.nick}`,
					inline: false
				});
			}
			embed_fields.push({
				name: `Roles`,
				value:  `${member.roles.map(roleid => {
                    return msg.channel.guild.roles.get(roleid).name;
                }).join(", ") || "@everyone"}`,
				inline: false
			});
			if(!member.user.bot) {
				let targetMemberDocument = serverDocument.members.id(member.id);
				if(!targetMemberDocument) {
					serverDocument.members.push({_id: member.id});
					targetMemberDocument = serverDocument.members.id(member.id);
				}
				embed_fields.push({
					name: `Message Count`,
					value: `${targetMemberDocument.messages} text message${targetMemberDocument.messages == 1 ? "" : "s"} this week`,
					inline: false
				});
				if(targetMemberDocument.voice > 0) {
					const voiceActivityDuration = moment.duration(targetMemberDocument.voice*6000).humanize();
					embed_fields.push({
						name: "Voice Activity",
						value: `${voiceActivityDuration.charAt(0).toUpperCase()}${voiceActivityDuration.slice(1)} active on voice chat this week`,
						inline: false
					});
				}
				embed_fields.push({
					name: `Strikes`,
					value: `${targetMemberDocument.strikes.length} so far`,
					inline: false
				});
				if(targetMemberDocument.profile_fields) {
					for(const key in targetMemberDocument.profile_fields) {
						embed_fields.push({
							name: `ℹ ${key}:`,
							value: `${targetMemberDocument.profile_fields[key]}`,
							inline: true
						});
					}
				}
			}
			msg.channel.createMessage({
				embed: {
					title: `**On ${msg.channel.guild.name}:**`,
                    color: 0x9ECDF2,
					fields: embed_fields
				},
				disableEveryone: true
			});
		});
	};

	if(member) {
		if(member.id == msg.author.id) {
			showProfile(userDocument);
		} else if(!member.user.bot) {
			db.users.findOrCreate({_id: member.id}, (err, targetUserDocument) => {
				showProfile(targetUserDocument);
			});
		} else {
			showProfile();
		}
	} else {
		winston.warn(`Requested member does not exist so ${commandData.name} cannot be shown`, {svrid: msg.channel.guild.id, chid: msg.channel.id, usrid: msg.author.id});
		msg.channel.createMessage({
			embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                    url: "https://github.com/GilbertGobbels/GAwesomeBot"
                },
                color: 0xFF0000,
				description: "I don't know who that is, so I can't tell you anything about them 💤"
			}
		});
	}
};
