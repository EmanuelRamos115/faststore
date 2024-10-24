import { gql } from '@generated/gql'

export const fragment = gql(`
  fragment ClientManyProducts on Query {
    search(
      first: $first
      after: $after
      sort: $sort
      term: $term
      selectedFacets: $selectedFacets
    ) {
      facets {
        ... on StoreFacetRange {
          key
          label

          min {
            selected
            absolute
          }

          max {
            selected
            absolute
          }

          __typename
        }

        ... on StoreFacetBoolean {
          key
          label
          values {
            label
            value
            selected
            quantity
          }

          __typename
        }
      }
      products {
        edges {
          node {
            description
            releaseDate
            offers {
              highPrice
            }
            breadcrumbList{
							itemListElement{
								item
								name
								position
							}
							numberOfItems
						}
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
            isVariantOf {
              additionalProperty {
                propertyID
                name
                value
                valueReference
              }
              fullVariantList {
                isVariantOf {
                  productGroupID
                  name
                }
                inventory {
                  availableQuantity
                  warehouse {
                    id
                  }
                }
                productID
                sku
                name
                gtin
                slug
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
                inventory {
                  availableQuantity
                  warehouse {
                    id
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
      }
    }
  }
`)
