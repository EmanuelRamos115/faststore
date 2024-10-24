import { vtexApiRequest } from '../../utils/vtexApiRequest'

const departmentBannerResolver = {
  departmentBanner: async (
    _: unknown,
    { department }: { department: string }
  ) => {
    return vtexApiRequest(
      `/api/io/_v/api/intelligent-search/banners${department}`,
      true,
      {
        headers: {
          'REST-Range': 'resources=0-1000',
        },
      }
    )
  },
}

export default departmentBannerResolver
