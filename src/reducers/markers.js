import * as types from '../constants/ActionTypes'

const markersInitialState = [{
  id: 0,
  name: 'Hello',
  coords: {
    lat: 25.0,
    lng: 25.0
  },
  checked: true,
}, {
  id: 1,
  name: 'World',
  coords: {
    lat: 50.0,
    lng: 50.0
  },
  checked: false,
}];

function markers(state = markersInitialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.ADD_MARKER:
      return [...state, {
        id: state.reduce((maxId, marker) => Math.max(marker.id, maxId), -1) + 1,
        name: payload.marker.name,
        coords: payload.marker.coords,
        checked: false,
      }]

    case types.REMOVE_MARKER:
      return state.filter(marker => marker.id !== payload.id)

    case types.EDIT_MARKER:
      return state.map(marker => marker.id === payload.marker.id ? Object.assign({}, marker, payload.marker) : marker)

    case types.TOGGLE_MARKER:
      return state.map(marker => {
        if (marker.id === payload.id) {
          return Object.assign({}, marker, {
            checked: !marker.checked
          })
        }
        return marker
      })

    default:
      return state
  }
}

export default markers;