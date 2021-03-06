const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(express.static("static"));
app.use(bodyParser.json());

let db;

// server-side validation
const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true
};

const issueFieldType = {
  status: "required",
  owner: "required",
  effort: "required",
  created: "required",
  completionDate: "optional",
  title: "required"
};

// validation handler function
function validateIssue(issue) {
  for (const field in issueFieldType) {
    const type = issueFieldType[field];
    if (!type) {
      delete issue[field];
    } else if (type === "required" && !issue[field]) {
      return `${field} is required.`;
    }
  }
  if (!validIssueStatus[issue.status])
    return `${issue.status} is not a valid status.`;
  return null;
}

app.get("/api/issues", (req, res) => {
  db.collection("issues")
    .find()
    .toArray()
    .then(issues => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal server error ${error}` });
    });
});

app.post("/api/issues", (req, res) => {
  const newIssue = req.body;
  newIssue.create = new Date();

  if (!issue.status) issue.status = "New";
  const err = validationIssue(issue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  db.collection("issues")
    .insertOne(newIssue)
    .then(result => {
      db.collection("issues")
        .find({ _id: result.insertedId })
        .limit(1)
        .next();
    })
    .then(newIssue => res.json(newIssue))
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal server error: ${error}` });
    });
});

MongoClient.connect("mongodb://localhost:27017/issuetracker")
  .then(connection => {
    db = connection;
    app.listen(3000, function() {
      console.log("App started on port 3000");
    });
  })
  .catch(error => {
    console.log("Error:", error);
  });
