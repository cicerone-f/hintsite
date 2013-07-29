var ChannelSubscription = {
	subscribeTo: function (channel, userId, callbacks) {
		console.log('ChannelSubscription: subscribeTo() called with channel name: "' + channel + '"')

		cordova.exec(
			callbacks.success,
			callbacks.error,
			'com.hintsite.app.ChannelSubscription',	// mapped to the Java class
			'subscribeToChannel',					// action name - as defined inside the above Java class
			[channel, userId]						// array of stuff - strings, objects - passed as a parameter for the Java code
		);
	}
}