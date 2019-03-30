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

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssues({
            owner: form.owner.value,
            title: form.title.value,
            status: "New",
            created: new Date()
        });
        // clear the input fields for next value
        form.owner.value = "";
        form.title.value = "";
    }
    render() {
        return (
            <div>
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        // binding this method, since it's now being called from another component
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }
    loadData() {
        setTimeout(() => {
            this.setState({ issues: issue });
        }, 500);
    }
    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({ issues: newIssues });
    }

    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssues={this.createIssue} />
            </div>
        );
    }
}

ReactDOM.render(<IssueList />, contentNode);
