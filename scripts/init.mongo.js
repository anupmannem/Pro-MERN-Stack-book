db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.insert([
	{
		state: 'Open', owner: 'Raven',
		created: new Date('2019-04-04'), effort: 5,
		completionDate: undefined,
		title: 'Error in console when clicking add',
	},
	{
		status: 'Assigned', owner: 'Eddie',
		created: new Date('2019-04-04'), effort: 14,
		completionDate: new Date('2019-04-10'),
		title: 'Missing bottom border on panel',
	},
]);

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });