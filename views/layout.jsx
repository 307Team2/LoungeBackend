var React = require('react');
var Navigation = require('./common/navigation.jsx');

var DefaultLayout = React.createClass({
  getNavigation: function() {
    if (this.props.page !== "homepage") {
      return <Navigation/>;
    }
  },

  render: function() {
    return (
      <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

          <title>{this.props.title}</title>

          <link href='https://fonts.googleapis.com/css?family=Abril+Fatface|Source+Sans+Pro:400,700,300,300italic,400italic,700italic' rel='stylesheet' type='text/css'/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"/>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

          <link rel="stylesheet" href="/stylesheets/application.css"/>
        </head>
        <body className={this.props.page}>
          {this.getNavigation()}
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;
