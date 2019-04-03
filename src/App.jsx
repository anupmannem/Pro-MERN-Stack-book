var contentNode = document.getElementById("contents");

class IssueFilter extends React.Component {
    render() {
        return <div>This is placeholder for the issue filter.</div>;
    }
}

// stateless component
function IssueTable(props) {
    const issueRows = props.issues.map(issue => (
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

// stateless component
const IssueRow = props => (
    <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>
            {props.issue.completionDate
                ? props.issue.completionDate.toDateString()
                : ""}
        </td>
        <td>{props.issue.title}</td>
    </tr>
);

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
        // initializing the state
        this.state = { issues: [] };
        // binding this method, since it's now being called from another component
        this.createIssue = this.createIssue.bind(this);
    }

    // react hook, when component is loaded, load data
    componentDidMount() {
        this.loadData();
    }
    // loading data from source to the state
    loadData() {
        setTimeout(() => {
            this.setState({ issues: issue });
        }, 500);
    }
    // function to modify the state
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
