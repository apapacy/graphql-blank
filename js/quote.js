import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

class Quote extends React.Component {
  static propTypes = {
    quote: PropTypes.object
  };
  render() {
    return (
      <blockquote>
        <p>{this.props.quote.text}</p>
        <footer>{this.props.quote.author}</footer>
      </blockquote>
    );
  }
}
const QuoteContainer =  Relay.createContainer(Quote, {
  fragments: {}
});

export default QuoteContainer;
