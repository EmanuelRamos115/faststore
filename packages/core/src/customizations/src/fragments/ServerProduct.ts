import { gql } from '@generated/gql'

export const fragment = gql(`
  fragment ServerProduct on Query {
    product(locator: $locator) {
      slug

      additionalProperty {
        name
        value
      }

      inventory {
        availableQuantity
        warehouse {
          id
        }
      }

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

      isVariantOf {
        additionalProperty {
          propertyID
          name
          value
          valueReference
        }

        fullVariantList {
          productID
          sku
          name
          gtin
          slug

          isVariantOf {
            productGroupID
            name
          }

          image {
            url
            alternateName
          }

          videos

          additionalProperty {
            propertyID
            name
            value
            valueReference
          }

          inventory {
            availableQuantity
            warehouse {
              id
            }
          }

          offers {
            offers {
              availability
              price
              priceValidUntil
              priceCurrency
              listPrice
              seller {
                identifier
              }
            }
          }
        }

        skuVariants {
          activeVariations
          slugsMap
          availableVariations
        }
      }
    }
  }
`)
