import React from 'react';

export class Entries extends React.Component {
  static propTypes = {
    deleteClasses: React.PropTypes.string,
    deleteText: React.PropTypes.string,
    entries: React.PropTypes.object,
    handleDelete: React.PropTypes.func,
    idVariable: React.PropTypes.string,
    nameVariable: React.PropTypes.string,
    textIfNoEntries: React.PropTypes.string
  };
  static defaultProps = {
    deleteClasses: 'delete-entry',
    deleteText: 'x',
    idVariable: 'id',
    nameVariable: 'name'
  };
  constructor(props, context) {
    super(props, context);
  }
  handleDelete(entry) {
    return () => {
      this.props.handleDelete(entry);
    };
  }
  render() {
    if (this.props.entries && Object.keys(this.props.entries).length !== 0) {
      return (
        <div className="entries">
          {this.props.entries.map(entry => {
            return (
              <span className="entry" key={entry.get(this.props.idVariable)}>
                {entry.get(this.props.nameVariable)}
                {this.props.handleDelete ?
                  <button
                      className={this.props.deleteClasses}
                      onClick={this.handleDelete(entry)}
                      type="button"
                  >
                    {this.props.deleteText}
                  </button> : null
              }
              </span>
            );
          })}
        </div>
      );
    }
    return this.props.textIfNoEntries ?
      <div className="entries">{this.props.textIfNoEntries}</div> : null;
  }
}
