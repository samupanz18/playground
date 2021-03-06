'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var issues = [{
    id: 1,
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when clicking Add'
}, {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel'
}];

var IssueFilter = function (_React$Component) {
    _inherits(IssueFilter, _React$Component);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is a placehold for the Issue Filter.'
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

var BorderWrap = function (_React$Component2) {
    _inherits(BorderWrap, _React$Component2);

    function BorderWrap() {
        _classCallCheck(this, BorderWrap);

        return _possibleConstructorReturn(this, (BorderWrap.__proto__ || Object.getPrototypeOf(BorderWrap)).apply(this, arguments));
    }

    _createClass(BorderWrap, [{
        key: 'render',
        value: function render() {
            var borderedStyle = { border: "1px solid silver", padding: 6 };

            return React.createElement(
                'div',
                { style: borderedStyle },
                this.props.children
            );
        }
    }]);

    return BorderWrap;
}(React.Component);

var IssueRow = function IssueRow(props) {
    var _props$issue = props.issue,
        id = _props$issue.id,
        status = _props$issue.status,
        owner = _props$issue.owner,
        created = _props$issue.created,
        effort = _props$issue.effort,
        completionDate = _props$issue.completionDate,
        title = _props$issue.title;


    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            id
        ),
        React.createElement(
            'td',
            null,
            status
        ),
        React.createElement(
            'td',
            null,
            owner
        ),
        React.createElement(
            'td',
            null,
            created.toDateString()
        ),
        React.createElement(
            'td',
            null,
            effort
        ),
        React.createElement(
            'td',
            null,
            completionDate ? completionDate.toDateString() : ''
        ),
        React.createElement(
            'td',
            null,
            title
        )
    );
};
IssueRow.propTypes = {
    issue: React.PropTypes.object.isRequired
};

var IssueTable = function IssueTable(props) {
    var issues = props.issues;


    return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'Id'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                React.createElement(
                    'th',
                    null,
                    'Created'
                ),
                React.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                React.createElement(
                    'th',
                    null,
                    'Completion Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Title'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            issues.map(function (issue) {
                return React.createElement(IssueRow, { key: issue.id, issue: issue });
            })
        )
    );
};

var IssueAdd = function (_React$Component3) {
    _inherits(IssueAdd, _React$Component3);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        var _this3 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

        _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
        return _this3;
    }

    _createClass(IssueAdd, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.issueAdd;
            this.props.createIssue({
                owner: form.owner.value,
                title: form.title.value,
                status: 'New',
                created: new Date()
            });
            form.owner.value = '';
            form.title.value = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { name: 'issueAdd', onSubmit: this.handleSubmit },
                    React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                    React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                    React.createElement(
                        'button',
                        null,
                        'Add'
                    )
                )
            );
        }
    }]);

    return IssueAdd;
}(React.Component);

var IssueList = function (_React$Component4) {
    _inherits(IssueList, _React$Component4);

    function IssueList(props) {
        _classCallCheck(this, IssueList);

        var _this4 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this, props));

        _this4.state = {
            issues: []
        };

        _this4.createIssue = _this4.createIssue.bind(_this4);
        return _this4;
    }

    _createClass(IssueList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this5 = this;

            setTimeout(function () {
                _this5.setState({
                    issues: issues
                });
            }, 500);
        }
    }, {
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var newIssues = this.state.issues.slice();
            newIssue.id = this.state.issues.length + 1;
            newIssues.push(newIssue);
            this.setState({
                issues: newIssues
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Issue Tracker'
                ),
                React.createElement(IssueFilter, null),
                React.createElement('hr', null),
                React.createElement(IssueTable, { issues: this.state.issues }),
                React.createElement('hr', null),
                React.createElement(IssueAdd, { createIssue: this.createIssue })
            );
        }
    }]);

    return IssueList;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode);