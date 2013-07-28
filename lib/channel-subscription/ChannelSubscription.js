var ChannelSubscription = {
	subscribeTo: function (channel) {
		alert('subscribeTo called from ChannelSubscription.js with channel: ' + channel);

		cordova.exec(
			function() { alert('success') },
			function() { alert('error') },
			'com.hintsite.app.ChannelSubscription',	// mapped to the Java class
			'subscribeToChannel',	// action name - as defined inside the above Java class
			[channel]
		);
	}
}