import React from 'react';

export class Entries extends React.Component {
  static propTypes = {
    deleteClasses: React.PropTypes.string,
    deleteText: React.PropTypes.string,
    entries: React.PropTypes.object,
    handleDelete: React.PropTypes.func,
    idVariable: React.PropTypes.string,
    nameVariable: React.PropTypes.string
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
    return this.props.entries && Object.keys(this.props.entries).length !== 0 ?
    (
      <div className="entries">
        {this.props.entries.map(entry => {
          return (
            <span className="entry" key={entry.get(this.props.idVariable)}>
              {entry.get(this.props.nameVariable)}
              <button
                  className={this.props.deleteClasses}
                  onClick={this.handleDelete(entry)}
              >
                {this.props.deleteText}
              </button>
            </span>
          );
        })}
      </div>
    ) : null;
  }
}
