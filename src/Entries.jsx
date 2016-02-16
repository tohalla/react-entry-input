import React from 'react';

export class Entries extends React.Component {
  static propTypes = {
    entries: React.PropTypes.object,
    handleDelete: React.PropTypes.func,
    idVariable: React.PropTypes.string,
    nameVariable: React.PropTypes.string
  };
  static defaultProps = {
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
                  className="icon-delete icon"
                  onClick={this.handleDelete(entry)}
              />
            </span>
          );
        })}
      </div>
    ) : null;
  }
}
