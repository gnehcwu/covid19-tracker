import { useReducer } from 'react'

const ACTIONS = {
  UPDATE_COUTRIES: 'update-coutries',
  UPDATE_TIMELINE: 'update_timeline',
  SWITCH_COUNTRY: 'switch-country',
  UPDATE_GLOBAL_CASE: 'update-global-case'
}

export default function useCovid19Reducer() {
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_COUTRIES:
        return { ...state, countries: action.payload.countries }
      case ACTIONS.UPDATE_TIMELINE:
        const { timeline, summary, updated } = action.payload
        return {
          ...state,
          timeline,
          summary,
          updated
        }
      case ACTIONS.SWITCH_COUNTRY:
        const { country: selectedCountry, countryName: selectedCountryName } = action.payload
        return {
          ...state,
          selectedCountry,
          selectedCountryName
        }
      case ACTIONS.UPDATE_GLOBAL_CASE:
        return {
          ...state,
          globalConfirmed: action.payload.globalConfirmed
        }
      default:
        return state
    }
  }

  const [trackerData, dispatch] = useReducer(reducer, {
    updated: Date.now(),
    selectedCountry: 'Global',
    selectedCountryName: 'Global',
    countries: [],
    summary: {},
    timeline: [],
    globalConfirmed: 0
  })

  return [trackerData, dispatch]
}

export { ACTIONS }
