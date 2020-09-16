import { useReducer } from 'react'

const ACTIONS = {
  UPDATE_COUTRIES: 'update-coutries',
  UPDATE_TIMELINE: 'update_timeline',
  SWITCH_COUNTRY: 'switch-country'
}

export default function useCovid19Reducer() {
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_COUTRIES:
        return { ...state, countries: action.payload.countries }
      case ACTIONS.UPDATE_TIMELINE:
        return { ...state, timeline: action.payload.timeline, summary: action.payload.summary }
      case ACTIONS.SWITCH_COUNTRY:
        return { ...state, selectedCountry: action.payload.country }
      default:
        return state
    }
  }

  const [trackerData, dispatch] = useReducer(reducer, {
    selectedCountry: 'Global',
    countries: [],
    summary: {},
    timeline: []
  })

  return [trackerData, dispatch]
}

export { ACTIONS }
