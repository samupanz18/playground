const contentNode = document.getElementById('contents');

const issues = [
    {
        id: 1, 
        status: 'Open', 
        owner: 'Ravan',
        created: new Date('2016-08-15'), 
        effort: 5, 
        completionDate: undefined, 
        title: 'Error in console when clicking Add',
    }, {
        id: 2, 
        status: 'Assigned', 
        owner: 'Eddie', 
        created: new Date('2016-08-16'), 
        effort: 14, 
        completionDate: new Date('2016-08-30'), 
        title: 'Missing bottom border on panel',
    },
];

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placehold for the Issue Filter.</div>
        );
    }
}

class BorderWrap extends React.Component {
    render() {
        const borderedStyle = {border: "1px solid silver", padding: 6};

        return (
            <div style={borderedStyle}>
                {this.props.children}
            </div>
        );
    }
}

class IssueRow extends React.Component {
    static get propTypes() {
        return {
            issue: React.PropTypes.object.isRequired,
        };
    }
    render() {
        const {
            id, 
            status,
            owner,
            created,
            effort,
            completionDate,
            title,
        } = this.props.issue;

        return (
            <tr>
                <td>{id}</td>
                <td>{status}</td>
                <td>{owner}</td>
                <td>{created.toDateString()}</td>
                <td>{effort}</td>
                <td>{completionDate ? completionDate.toDateString() : ''}</td>
                <td>{title}</td>
            </tr>
        );
    }
}

class IssueTable extends React.Component {
    render() {
        const {issues} = this.props;

        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Completion Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map(issue => <IssueRow key={issue.id} issue={issue} />)}
                </tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    render() {
        return (
            <div>This is a placehold for an Issue Add entry form.</div>
        );
    }
}

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issues,
        };

        setTimeout(::this.createTestIssue, 2000);
    }
    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({
            issues: newIssues,
        });
    }
    createTestIssue() {
        this.createIssue({
            status: 'New',
            owner: 'Pieta',
            created: new Date(),
            title: 'Completion date should be optional',
        });
    }
    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues}/>
                <hr />
                <IssueAdd />
            </div>
        );
    }
}

ReactDOM.render(<IssueList />, contentNode);
