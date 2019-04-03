const express = require("express");

const app = express();
app.use(express.static("static"));

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

app.get("/api/issues", (req, res) => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issue });
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});
