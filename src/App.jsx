var contentNode = document.getElementById("contents");
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

class IssueFilter extends React.Component {
    render() {
        return <div>This is placeholder for the issue filter.</div>;
    }
}

class IssueTable extends React.Component {
    render() {
        const issueRows = this.props.issues.map(issue => (
            <IssueRow key={issue.id} issue={issue} />
        ));
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Completion Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>{issueRows}</tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    render() {
        return <div>This is placeholder for an issue add entry form.</div>;
    }
}

class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>
                    {issue.completionDate
                        ? issue.completionDate.toDateString()
                        : ""}
                </td>
                <td>{issue.title}</td>
            </tr>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: issue };
        setTimeout(this.createTestIssue.bind(this), 2000);
    }

    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({ issues: newIssues });
    }
    createTestIssue() {
        this.createIssue({
            status: "New",
            owner: "Pieta",
            created: new Date(),
            title: "Completion date should be optional"
        });
    }
    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd />
            </div>
        );
    }
}

ReactDOM.render(<IssueList />, contentNode);
