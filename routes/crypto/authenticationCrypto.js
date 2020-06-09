(function() {
    module.exports.encrypt = function(algorithm, encryptionKey, text) {
    	
    	var crypto = require('crypto');
    	var cipher = crypto.createCipher(algorithm, encryptionKey);
    	var encryptedText = cipher.update(text,'utf8','hex')
    	encryptedText += cipher.final('hex');
    	
    	return encryptedText;
    }    

    module.exports.getRandomChars = function(targetLength) {
    	
    	var crypto = require('crypto');
		var sourceChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		var sourceCharsLength = sourceChars.length;
		
		var randomBytes = crypto.randomBytes(targetLength);
		var array = new Array(targetLength);
		var cursor = 0;

		for (var i = 0; i < targetLength; i++) {
		    cursor += randomBytes[i];
		    array[i] = sourceChars[cursor % sourceCharsLength];
		}
		
		var randomChars = array.join('');
		return randomChars;
    }
}());