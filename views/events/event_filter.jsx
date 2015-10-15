var React = require('react');

var EventFilter = React.createClass({
  filterOptions: ['Upcoming', 'Invites', 'Past'],
  toggleFilter: function(filter) {
    console.log("test");
    this.props.changeFilter(filter);
  },
  getOptions: function() {
    var self = this;
    return this.filterOptions.map(function(option, i) {
      return (
        <p className="event-filter-option"
             onClick={self.toggleFilter.bind(self, option)}
             key = {i}>
          {option}
        </p>
      );
    })
  },
  render: function() {
    return (
      <div>
        {this.getOptions()}
      </div>
    );
  }
});

module.exports = EventFilter;
