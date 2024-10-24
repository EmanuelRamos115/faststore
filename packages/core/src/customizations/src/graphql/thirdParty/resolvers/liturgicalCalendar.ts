import { vtexApiRequest } from '../../utils/vtexApiRequest'

const DATA_ENTITY = 'LC'

const liturgicalCalResolver = {
  liturgicalCalendar: async () => {
    return vtexApiRequest(
      `/api/dataentities/${DATA_ENTITY}/search?_fields=season,year,date,title,type,calendar,dateTitle`,
      true,
      {
        headers: {
          'REST-Range': 'resources=0-5000',
        },
      }
    )
  },
}

export default liturgicalCalResolver
