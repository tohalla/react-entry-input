import React from 'react';

export class Suggestions extends React.Component {
  static propTypes = {
    activeSuggestion: React.PropTypes.object,
    className: React.PropTypes.string,
    displaySuggestions: React.PropTypes.bool,
    handleClick: React.PropTypes.func,
    handleHover: React.PropTypes.func.isRequired,
    handleOut: React.PropTypes.func.isRequired,
    idVariable: React.PropTypes.string,
    minQueryLength: React.PropTypes.number,
    nameVariable: React.PropTypes.string,
    query: React.PropTypes.string,
    suggestions: React.PropTypes.object
  };
  static defaultProps = {
    className: 'suggestions',
    displaySuggestions: true,
    idVariable: 'id',
    nameVariable: 'name'
  };
  constructor(props, context) {
    super(props, context);
    this.highlight = this.highlight.bind(this);
    this.hoverListeners = {};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.suggestions && nextProps.suggestions.size > 0) {
      nextProps.suggestions.map(item => {
        this.hoverListeners[item.get(this.props.idVariable)] = () => {
          return nextProps.handleHover(item, false);
        };
      });
    } else {
      this.hoverListeners = {};
    }
    if (
      nextProps.suggestions &&
      !nextProps.activeSuggestion
    ) {
      const suggestion = nextProps.suggestions.size === 1 ?
        nextProps.suggestions.first() :
        nextProps.suggestions.filter(suggestion => {
          return suggestion.get(nextProps.nameVariable) === nextProps.query;
        }
      ).first();
      if (suggestion) {
        this.hoverListeners[suggestion.get(this.props.idVariable)]();
      }
    }
  }
  highlight(text) {
    const location = text.toLowerCase().indexOf(this.props.query.toLowerCase());
    return (<span>
      {text.substr(0, location)}
      <mark>{text.substr(location, this.props.query.length)}</mark>
      {text.substr(location + this.props.query.length)}
    </span>);
  }
  render() {
    return !this.props.displaySuggestions ||
    this.props.query.length < this.props.minQueryLength ||
    !this.props.suggestions || this.props.suggestions.size === 0 ?
    null : (
      <div className={this.props.className}>
        <ul>
          {this.props.suggestions.valueSeq().map((item, index) => {
            return (
              <li
                  className={
                    this.props.activeSuggestion &&
                      this.props.activeSuggestion === item ? 'active' :
                      'default'
                  }
                  key={index}
                  onClick={this.props.handleClick}
                  onMouseOut={this.props.handleOut}
                  onMouseOver={
                    this.hoverListeners[item.get(this.props.idVariable)]
                  }
              >
                {this.highlight(item.get(this.props.nameVariable))}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
