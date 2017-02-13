import React, {Component, PropTypes} from 'react'
import MarkerNameInput from '../MarkerNameInput'

export default class Marker extends Component {
  static propTypes = {
    marker: PropTypes.object.isRequired,
    editMarker: PropTypes.func.isRequired,
    removeMarker: PropTypes.func.isRequired,
    toggleMarker: PropTypes.func.isRequired,
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({editing: true})
  }

  handleSave = (id, name) => {
    if (name.length === 0) {
      this.props.removeMarker(id)
    } else {
      this.props.editMarker(id, Object.assign({}, this.props.marker, {name: name}))
    }
    this.setState({editing: false})
  }

  render() {
    const {marker, toggleMarker, removeMarker} = this.props;
    let item;

    if (this.state.editing) {
      item = (<MarkerNameInput input={marker.name} editing={this.state.editing} onSave={(name) => this.handleSave(marker.id, name)}/>)
    } else {
      item = (
        <div>
          <input type="checkbox" checked={marker.checked} onChange={() => toggleMarker(marker.id)}></input>
          <label onDoubleClick={this.handleDoubleClick}>
            {marker.name}
          </label>
          {"\t"}
          <label>
            ({marker.coords.lat}x{marker.coords.lng})
          </label>
          <button type="button" onClick={() => {
              console.log(marker.id);
              removeMarker(marker.id)
          }}>x</button>
        </div>
      )
    }

    return (
      <li>
        {item}
      </li>
    )
  }
}