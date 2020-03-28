import * as contentful from 'contentful'

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID,
})

export default async (req, res) => {
  const entries = await client.getEntries({
    content_type: `day`,
    order: `sys.createdAt`,
  })

  const data = entries.items.map(
    ({
      fields: {
        active,
        cases,
        critical,
        date,
        deaths,
        newCases,
        newDeaths,
        recovered,
      },
    }) => {
      return {
        date,
        active,
        cases,
        critical,
        deaths,
        recovered,
        new_cases: newCases,
        new_deaths: newDeaths,
      }
    }
  )

  res.json(data)
}
