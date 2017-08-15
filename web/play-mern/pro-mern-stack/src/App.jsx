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

const IssueRow = props => {
    const {
        id, 
        status,
        owner,
        created,
        effort,
        completionDate,
        title,
    } = props.issue;

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
};
IssueRow.propTypes = {
    issue: React.PropTypes.object.isRequired,
};

const IssueTable = props => {
    const {issues} = props;
    
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

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = ::this.handleSubmit;
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date(),
        });
        form.owner.value = '';
        form.title.value = '';
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
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
        };

        this.createIssue = ::this.createIssue;
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        setTimeout(() => {
            this.setState({
                issues,
            });
        }, 500);
    }
    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({
            issues: newIssues,
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
                <IssueAdd createIssue={this.createIssue}/>
            </div>
        );
    }
}

ReactDOM.render(<IssueList />, contentNode);
