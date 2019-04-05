const MongoClient = require("mongodb");

function usage() {
    console.log("Usage: ");
    console.log("node", __filename, "<option>");
    console.log("Where option is one of:");
    console.log("	callbacks 	use callback paradigm");
    console.log("	promises 	use the promises paradigm");
    console.log("	generators 	use the generators paradigm");
    console.log("	async 	use the async module");
}

if (process.argv.length < 3) {
    console.log("Incorrect number of arguments");
    usage();
} else {
    if (process.argv[2] === "callbacks") {
        testWithCallbacks();
    } else if (process.argv[2] === "promises") {
        testWithPromises();
    } else if (process.argv[2] === "generators") {
        testWithGenerators();
    } else if (process.argv[2] === "async") {
        testWithAsync();
    } else {
        console.log("Invalid option: ", process.argv[2]);
        usage();
    }
}

function testWithCallbacks() {
    // connect to mongo
    MongoClient.connect("mongodb://localhost/playground", function(err, db) {
        // insert document
        db.collection("employees").insertOne(
            { id: 1, name: "A. Callback" },
            function(err, result) {
                console.log("result of insert:", result.insertedId);
                // display documents
                db.collection("employees")
                    .find({ id: 1 })
                    .toArray(function(err, docs) {
                        console.log("result of find:", docs);
                        db.close();
                    });
            }
        );
        // it can get even more deeply nested when you have to handle error conditions. Will have to write same statements multiple times
        // imagine db.close() in every condition. This is refered to as Callback Hell.
        // the only remedy if we have to stick to callback paradigm is to split each small piece of code into its own function and pass
        // that function as parameter to a call, chaining the callback along.
    });
}

function testWithPromises() {
    let db;
    MongoClient.connect("mongodb://localhost/playground")
        .then(connection => {
            db = connection;
            return db
                .collection("employees")
                .insertOne({ id: 1, name: "B. Promises" });
        })
        .then(result => {
            console.log("result of insert:", result.insertedId);
            return db
                .collection("employees")
                .find({ id: 1 })
                .toArray();
        })
        .then(docs => {
            console.log("result of find:", docs);
            db.close();
        })
        .catch(err => console.log("Error", err));
    // the result of every call is promise, on to which we attach a then, which returns another promise.
    // Assuming all calls throw error, you'll find that error handling isn't needed in each block,
    // just one catch() for errors at any stage is enough
}

function testWithGenerators() {
    const co = require("co");
    // writing a genrator with *
    co(function*() {
        const db = yield MongoClient.connect("mongodb://localhost/playground");
        const result = yield db
            .collection("employees")
            .insertOne({ id: 1, name: "C. Generators" });
        console.log("result of insert:", result.insertedId);
        const docs = yield db
            .collection("employees")
            .find({ id: 1 })
            .toArray();
        console.log("result of find:", docs);
        db.close();
    }).catch(err => console.log("Error", err));
    // every asynchronous call is preceeded by keyword yield.
    // this causes temporary return from function, after which the function can be
    // resumed from where it was left off, if called again.
    // co module does repeated calling
}

function testWithAsync() {
    const async = require("async");
    let db;
    async.waterfall(
        [
            next => {
                MongoClient.connection("mongodb://localhost/playground", next);
            },
            (connection, next) => {
                db = connection;
                db.collection("employees").insertOne(
                    { id: 1, name: "D. Async" },
                    next
                );
            },
            (insertResult, next) => {
                console.log("Insert result:", insertResult.insertedId);
                db.collection("employees")
                    .find({ id: 1 })
                    .toArray(next);
            },
            (docs, next) => {
                console.log("result of find:", docs);
                db.close();
                next(null, "All done");
            }
        ],
        (err, result) => {
            if (err) console.log("Error", err);
            else console.log(result);
        }
    );
}
