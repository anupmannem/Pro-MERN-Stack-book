var contentNode = document.getElementById("contents");

class IssueFilter extends React.Component {
    render() {
        return <div>This is placeholder for the issue filter.</div>;
    }
}

class IssueTable extends React.Component {
    render() {
        const borderdStyle = { border: "1px solid silver", padding: 6 };
        return (
            <table style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={borderdStyle}>ID</th>
                        <th style={borderdStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow
                        issue_id={1}
                        issue_title="Error in console when clicking Add"
                    />
                    <IssueRow
                        issue_id={2}
                        issue_title="Missing bottom border on panel"
                    />
                </tbody>
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
        const borderdStyle = { border: "1px solid silver", padding: 4 };
        return (
            <tr>
                <td style={borderdStyle}>{this.props.issue_id}</td>
                <td style={borderdStyle}>{this.props.issue_title}</td>
            </tr>
        );
    }
}

class IssueList extends React.Component {
    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </div>
        );
    }
}

ReactDOM.render(<IssueList />, contentNode);
