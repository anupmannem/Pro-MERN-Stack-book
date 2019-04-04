const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("static"));
app.use(bodyParser.json());

const issue = [
    {
        id: 1,
        status: "Open",
        owner: "Ravan",
        created: new Date("2019-03-29"),
        effort: 5,
        completionDate: undefined,
        title: "Error in console when clicking Add"
    },
    {
        id: 2,
        status: "Assigned",
        owner: "Eddie",
        created: new Date("2019-03-30"),
        effort: 14,
        completionDate: new Date("2019-04-5"),
        title: "Missing border bottom on panel"
    }
];

// server-side validation
const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
}

const issueFieldType = {
    id: "required",
    status: "required",
    owner: "required",
    effort: "required",
    created: "required",
    completionDate: "optional",
    title: "required"
}

// validation handler function
function validateIssue(issue) {
    for(const field in issueFieldType) {
        const type = issueFieldType[field];
        if(!type) {
            delete issue[field];
        } else if(type === 'required' && !issue[field]) {
            return `${field} is required.`;
        }        
    }    
    if(!validIssueStatus[issue.status]) return `${issue.status} is not a valid status.`;
    return null;
}

app.get("/api/issues", (req, res) => {
    const metadata = { total_count: issue.length };
    res.json({ _metadata: metadata, records: issue });
});

app.post("/api/issues", (req, res) => {
	const newIssue = req.body;
	newIssue.id = issue.length + 1;
	newIssue.create = new Date();

	if(!issue.status) issue.status = "New";
    const err = validationIssue(issue);
    if(err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }

	issue.push(newIssue);
	res.json(newIssue);
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});
