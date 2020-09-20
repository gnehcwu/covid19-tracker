import getCountryFlag from './countryFlag'

const BASE_URL = 'https://corona-api.com'

export const getAllCountries = async () => {
  const destination = `${BASE_URL}/countries`

  try {
    const res = await fetch(destination)
    const { data } = await res.json()
    return data.map(item => {
      return {
        name: item.name,
        code: item.code,
        flag: getCountryFlag(item.code),
        lastUpdate: item.updated_at,
        confirmedToday: item.today.confirmed,
        confirmed: item.latest_data.confirmed,
        recovered: item.latest_data.recovered,
        deaths: item.latest_data.detahs,
        deathRate: item.latest_data.calculated.death_rate
      }
    })
      .filter(item => item.confirmed > 0)
      .sort((item1, item2) => item2.confirmed - item1.confirmed)
  } catch (error) {
    return []
  }
}

export const getGlobalTimeline = async () => {
  const destination = `${BASE_URL}/timeline`;

  try {
    const res = await fetch(destination)
    const { data } = await res.json();
    // Looks like there is something wrong the data on 2020-08-17, filter the day out
    return {
      summary: data[0],
      updated: data[0].updated_at,
      country: 'Global',
      timeline: data.filter(item => item.date !== '2020-08-17').reverse()
    }
  } catch (error) {
    return [];
  }
}

export const getTimelineByCountry = async (slug) => {
  const destination = `${BASE_URL}/countries/${slug}`

  try {
    const res = await fetch(destination)
    const { data } = await res.json()
    const { confirmed, recovered, deaths } = data.latest_data
    return {
      summary: {
        confirmed,
        new_confirmed: data.today.confirmed,
        active: data.timeline[0].active,
        recovered,
        deaths
      },
      updated: data.updated_at,
      country: data.name,
      timeline: data.timeline.reverse()
    }
  } catch (error) {
    return {}
  }
}

export { default as getCountryFlag } from './countryFlag'
