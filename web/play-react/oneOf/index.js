const PropTypes = require('prop-types');
const styles = ['success', 'warning', 'danger', 'info', 'default', 'primary', 'link'];
const propType = PropTypes.oneOf(styles);
console.log(`propType = ${propType('warning')}`);
