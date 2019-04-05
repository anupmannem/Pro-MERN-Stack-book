const MongoClient = require('mongodb');

function usage() {
	console.log('Usage: ');
	console.log('node', __filename, '<option>');
	console.log('Where option is one of:');
	console.log('	callbacks 	use callback paradigm');
	console.log('	promises 	use the promises paradigm');
	console.log('	generators 	use the generators paradigm');
	console.log('	async 	use the async module');
}

if(process.argv.length < 3) {
	console.log("Incorrect number of arguments");
	usage();
} else {
	if(process.argv[2] === 'callbacks') {
		testWithCallbacks();
	} else if(process.argv[2] === 'promises') {
		testWithPromises();
	} else if(process.argv[2] === 'generators') {
		testWithGenerators();
	} else if(process.argv[2] === 'async') {
		testWithAsync();
	} else {
		console.log("Invalid option: ", process.argv[2]);
		usage();
	}
}

function testWithCallbacks() {
	// connect to mongo
	MongoClient.connect('mongodb://localhost/playground', function(err, db) {
		// insert document
		db.collection('employees').insertOne({id: 1, name: 'A Callback'},
			function(err, result) {
				console.log("result of insert:", result.insertedId);
				// display documents
				db.collection('employees').find({id: 1}).toArray(function(err, docs) {
					console.log('result of find:', docs);
					db.close();
				});
			});	
	// it can get even more deeply nested when you have to handle error conditions. Will have to write same statements multiple times
	// imagine db.close() in every condition. This is refered to as Callback Hell.
	// the only remedy if we have to stick to callback paradigm is to split each small piece of code into its own function and pass 
	// that function as parameter to a call, chaining the callback along.
	});
}

