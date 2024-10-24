import { vtexApiRequest } from '../../utils/vtexApiRequest'

const DATA_ENTITY = 'syatt_syatt_mega_menu_menu_items'

const menuItemsResolver = {
  menuItems: async () => {
    return vtexApiRequest(
      `/api/dataentities/${DATA_ENTITY}/search?_fields=_all`,
      true,
      {
        headers: {
          'REST-Range': 'resources=0-1000',
        },
      }
    )
  },
}

export default menuItemsResolver
