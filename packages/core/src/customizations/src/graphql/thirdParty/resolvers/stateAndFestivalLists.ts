import { vtexApiRequest } from '../../utils/vtexApiRequest'

const DATA_ENTITY = 'SF'

const stateAndFestivalListsResolver = {
  lists: async () => {
    return vtexApiRequest(
      `/api/dataentities/${DATA_ENTITY}/search?_fields=collectionId,level1Label,level1Value,level2Label,level2Value,region,title,type`,
      true,
      {
        headers: {
          'REST-Range': 'resources=0-2000',
        },
      }
    )
  },
}

export default stateAndFestivalListsResolver
