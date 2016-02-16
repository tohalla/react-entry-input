import React from 'react';

import {Suggestions} from './Suggestions';
import {Entries} from './Entries';

export class EntryInput extends React.Component {
  static propTypes = {
    actionAddEntryToState: React.PropTypes.func.isRequired,
    actionRemoveEntryFromState: React.PropTypes.func.isRequired,
    deleteClasses: React.PropTypes.string,
    deleteText: React.PropTypes.string,
    entries: React.PropTypes.object.isRequired,
    idVariable: React.PropTypes.string,
    limitEntries: React.PropTypes.number,
    minQueryLength: React.PropTypes.number,
    nameVariable: React.PropTypes.string,
    newTagOn: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    suggestions: React.PropTypes.object.isRequired
  };
  static defaultProps = {
    deleteClasses: 'delete-entry',
    deleteText: 'x',
    minQueryLength: 1,
    idVariable: 'id',
    limitEntries: 0,
    nameVariable: 'name',
    newTagOn: [13, 9],
    placeholder: 'entries'
  };
  constructor(props, context) {
    super(props, context);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.updateSuggestions = this.updateSuggestions.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.handleSuggestionHover = this.handleSuggestionHover.bind(this);
    this.handleSuggestionOut = this.handleSuggestionOut.bind(this);
    this._input = c => this.input = c;
    this._suggestions = c => this.suggestions = c;
    this.state = {
      query: '',
      activeSuggestion: null,
      displaySuggestions: false,
      suggestions: null
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.suggestions === this.props.suggestions &&
      prevProps.entries === this.props.entries &&
      prevState.query === this.state.query &&
      prevState.activeSuggestion === this.state.activeSuggestion
    ) {
      return;
    }
    this.updateSuggestions();
    return;
  }
  handleChange(event) {
    const query = event.target.value.trim();
    this.setState({query, activeSuggestion: null, displaySuggestions: true});
  }
  handleFocus() {
    this.setState({displaySuggestions: true});
  }
  handleBlur() {
    if (!this.state.activeSuggestion) {
      this.setState({displaySuggestions: false});
    }
  }
  handleKeyDown(event) {
    let location = 0;
    let selected = this.state.activeSuggestion ?
      this.state.suggestions.indexOf(this.state.activeSuggestion) : null;
    if (event.keyCode === 27) {
      this.setState({query: '', displaySuggestions: false});
    } else if (event.keyCode === 38) {
      if (this.state.activeSuggestion) {
        location = selected === 0 ?
          this.state.suggestions.size - 1 : selected - 1;
      }
      this.suggestions.hoverListeners[
        this.state.suggestions.get(location).get(this.props.idVariable)
      ](true);
    } else if (event.keyCode === 40) {
      if (this.state.activeSuggestion) {
        location = selected === this.state.suggestions.size - 1 ?
          0 : selected + 1;
      }
      this.suggestions.hoverListeners[
        this.state.suggestions.get(location).get(this.props.idVariable)
      ](true);
    } else if (
        this.state.activeSuggestion &&
        this.props.newTagOn.indexOf(event.keyCode) >= 0
    ) {
      this.handleAddition(this.state.activeSuggestion);
    } else {
      return;
    }
    event.preventDefault();
  }
  handleAddition(entry) {
    if (
      this.props.limitEntries !== 0 &&
      this.props.limitEntries <= this.props.entries.size
    ) {
      return;
    }
    this.setState({query: ''});
    if (
      Object.keys(this.props.entries).length === 0 ||
      this.props.entries.indexOf(entry) === -1
    ) {
      this.props.actionAddEntryToState(entry);
    }
    this.input.focus();
  }
  handleDelete(entry) {
    this.props.actionRemoveEntryFromState(entry);
    this.input.focus();
  }
  handleSuggestionHover(entry, updateQuery) {
    this.setState({
      activeSuggestion: entry,
      query: updateQuery ? entry.get(this.props.nameVariable) : this.state.query
    });
  }
  handleSuggestionOut() {
    this.setState({activeSuggestion: null});
  }
  handleSuggestionClick() {
    if (this.state.activeSuggestion) {
      this.handleAddition(this.state.activeSuggestion);
    }
  }
  updateSuggestions() {
    this.setState({suggestions: this.props.suggestions.filter(entry =>
      entry.get(this.props.nameVariable).toLowerCase()
        .indexOf(this.state.query.toLowerCase()) !== -1
    )});
  }
  render() {
    return (
      <div>
        <div className="add-entries">
          <Entries
              className="entries"
              deleteClasses={this.props.deleteClasses}
              deleteText={this.props.deleteText}
              entries={this.props.entries}
              handleDelete={this.handleDelete}
              idVariable={this.props.idVariable}
          />
          <div className="input">
            <input
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                placeholder={this.props.placeholder}
                ref={this._input}
                type={
                  this.props.limitEntries === 0 ||
                  !this.props.entries ||
                  this.props.limitEntries > this.props.entries.size ?
                    'text' : 'hidden'
                }
                value={this.state.query}
            />
            <Suggestions
                activeSuggestion={this.state.activeSuggestion}
                displaySuggestions={this.state.displaySuggestions}
                handleClick={this.handleSuggestionClick}
                handleHover={this.handleSuggestionHover}
                handleOut={this.handleSuggestionOut}
                idVariable={this.props.idVariable}
                minQueryLength={this.props.minQueryLength}
                nameVariable={this.props.nameVariable}
                query={this.state.query}
                ref={this._suggestions}
                suggestions={
                  this.props.limitEntries === 0 ||
                  !this.props.entries ||
                  this.props.limitEntries > this.props.entries.size ?
                    this.state.suggestions : null
                }
            />
          </div>
        </div>
      </div>
    );
  }
}
