import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'

jest.mock('react-chartjs-2', () => {
  const MockLine = jest.fn(() => null)
  return { Line: MockLine }
})

const BASE_URL = 'https://corona-api.com'

const server = setupServer(
  rest.get(`${BASE_URL}/countries`, (req, res, ctx) => {
    return res(ctx.json({
      "data": [
        {
          "coordinates": {
            "latitude": 33,
            "longitude": 65
          },
          "name": "Test country",
          "code": "TTT",
          "population": 1000,
          "updated_at": "2020-03-20T22:38:42.275Z",
          "today": {
            "deaths": 0,
            "confirmed": 2
          },
          "latest_data": {
            "deaths": 0,
            "confirmed": 100,
            "recovered": 50,
            "critical": 0,
            "calculated": {
              "death_rate": 0,
              "recovery_rate": 50,
              "recovered_vs_death_ratio": 0,
              "cases_per_million_population": 0.6
            }
          }
        },
      ]
    }))
  }),
  rest.get(`${BASE_URL}/countries/TTT`, (req, res, ctx) => {
    return res(ctx.json({
      "data": {
        "coordinates": {
          "latitude": 1,
          "longitude": 0
        },
        "name": "Test Country",
        "code": "TTT",
        "population": 1000,
        "updated_at": "2020-03-20T22:38:42.275Z",
        "today": {
          "deaths": 0,
          "confirmed": 2
        },
        "latest_data": {
          "deaths": 0,
          "confirmed": 100,
          "recovered": 50,
          "critical": 0,
          "calculated": {
            "death_rate": 0,
            "recovery_rate": 50,
            "recovered_vs_death_ratio": 0,
            "cases_per_million_population": 0.6
          }
        },
        "timeline": [
          {
            "updated_at": "2020-03-20T20:44:58.707Z", // Date
            "date": "2020-03-20", // Date
            "deaths": 0,
            "confirmed": 100,
            "recovered": 50,
            "active": 50,
            "new_confirmed": 40,
            "new_recovered": 30,
            "new_deaths": 0,
            "is_in_progress": true // Boolean
          }
        ]
      }
    }))
  }),
  rest.get(`${BASE_URL}/timeline`, (req, res, ctx) => {
    return res(ctx.json({
      "data": [
        {
          "updated_at": "2020-03-20T20:44:58.707Z",
          "date": "2020-03-20",
          "deaths": 0,
          "confirmed": 100,
          "recovered": 50,
          "active": 50,
          "new_confirmed": 40,
          "new_recovered": 30,
          "new_deaths": 0,
          "is_in_progress": true
        },
        {
          "updated_at": "2020-03-19T19:13:08.000Z",
          "date": "2020-03-19",
          "deaths": 0,
          "confirmed": 60,
          "recovered": 20,
          "active": 40,
          "new_confirmed": 20,
          "new_recovered": 10,
          "new_deaths": 0,
        },
      ],
    }
    ))
  })
)

beforeAll(() => server.listen())

afterAll(() => server.close())

afterEach(() => server.resetHandlers())

test('should render app structure successfully', async () => {
  const { getByText } = render(<App />)
  await wait(() => getByText(/global/i))
  expect(getByText(/global/i).parentElement.parentElement).toHaveClass('selected')
  expect(getByText(/test country/i)).toBeInTheDocument()
  expect(getByText(/covid-19 tracker/i)).toBeInTheDocument()
  expect(getByText(/total confirmed cases/i)).toBeInTheDocument()
  expect(getByText(/active cases/i)).toBeInTheDocument()
  expect(getByText(/recovered cases/i)).toBeInTheDocument()
  expect(getByText(/fatal cases/i)).toBeInTheDocument()
});

test('should fileter country correctly', async () => {
  const { getByText, getAllByRole, getByPlaceholderText } = render(<App />)
  await wait(() => getByText(/global/i))
  const filterCountry = getByPlaceholderText(/Country/i)
  expect(filterCountry).toBeInTheDocument()

  fireEvent.change(filterCountry, { target: { value: 'test' } })
  expect(getByText(/test country/i)).toBeInTheDocument()
  const countryCards = getAllByRole('img')
  expect(countryCards.length).toBe(1)
})
