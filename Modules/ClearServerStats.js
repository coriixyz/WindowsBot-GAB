
// Clear activity stats for a server
module.exports = (bot, db, winston, svr, serverDocument, callback) => {

	// Reset game and command data
	serverDocument.games = [];
	serverDocument.command_usage = {};
	serverDocument.markModified("command_usage");

	// Reset stats timestamp
	serverDocument.stats_timestamp = Date.now();

	// Save changes to serverDocument
	serverDocument.save(err => {
		if(err) {
			winston.error(`Failed to clear stats for server '${svr.name}'`, {svrid: svr.id});
		} else {
			winston.info(`Cleared stats for server '${svr.name}'`, {svrid: svr.id});
		}
		callback();
	});
};
