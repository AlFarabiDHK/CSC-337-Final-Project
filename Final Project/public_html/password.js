var crypto = require('crypto');

var hash = crypto.createHash('sha512');

var toHash = 'password' + Math.floor(Math.random() * 1000000000000);
data = hash.update(toHash, 'utf-8');
gen_hash = data.digest('hex');

console.log('to hash : ' + toHash)
console.log('  hash  : ' + gen_hash);