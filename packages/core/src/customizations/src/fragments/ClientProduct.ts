import { gql } from '@generated/gql'

export const fragment = gql(`
  fragment ClientProduct on Query {
    product(locator: $locator) {
      id: productID
      slug
      assemblyOptions {
        id
        name
        composition {
          items {
            id
            gtin
            priceTable
            seller
          }
        }
      }
      inventory {
        availableQuantity
        warehouse {
          id
        }
      }
      isVariantOf {
        additionalProperty {
          propertyID
          name
          value
          valueReference
        }
      }
    }
  }
`)
