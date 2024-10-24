/* eslint-disable */
import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  fragment ProductSummary_product on StoreProduct {\n    id: productID\n    slug\n    sku\n    brand {\n      brandName: name\n    }\n    name\n    gtin\n\n    isVariantOf {\n      productGroupID\n      name\n    }\n\n    image {\n      url\n      alternateName\n    }\n\n    brand {\n      name\n    }\n\n    offers {\n      lowPrice\n      lowPriceWithTaxes\n      offers {\n        availability\n        price\n        listPrice\n        listPriceWithTaxes\n        quantity\n        seller {\n          identifier\n        }\n      }\n    }\n\n    additionalProperty {\n      propertyID\n      name\n      value\n      valueReference\n    }\n  }\n':
    types.ProductSummary_ProductFragmentDoc,
  '\n  fragment Filter_facets on StoreFacet {\n    ... on StoreFacetRange {\n      key\n      label\n\n      min {\n        selected\n        absolute\n      }\n\n      max {\n        selected\n        absolute\n      }\n\n      __typename\n    }\n    ... on StoreFacetBoolean {\n      key\n      label\n      values {\n        label\n        value\n        selected\n        quantity\n      }\n\n      __typename\n    }\n  }\n':
    types.Filter_FacetsFragmentDoc,
  '\n  fragment ProductDetailsFragment_product on StoreProduct {\n    id: productID\n    sku\n    name\n    gtin\n    description\n    unitMultiplier\n    isVariantOf {\n      name\n      productGroupID\n      skuVariants {\n        activeVariations\n        slugsMap\n        availableVariations\n      }\n    }\n\n    image {\n      url\n      alternateName\n    }\n\n    brand {\n      name\n    }\n\n    offers {\n      lowPrice\n      lowPriceWithTaxes\n      offers {\n        availability\n        price\n        priceWithTaxes\n        listPrice\n        listPriceWithTaxes\n        seller {\n          identifier\n        }\n      }\n    }\n\n    additionalProperty {\n      propertyID\n      name\n      value\n      valueReference\n    }\n\n    # Contains necessary info to add this item to cart\n    ...CartProductItem\n  }\n':
    types.ProductDetailsFragment_ProductFragmentDoc,
  '\n  mutation CreateOrganization($input: OrganizationInput!, $notifyUsers: Boolean) {\n    createOrganization(input: $input, notifyUsers: $notifyUsers) @context(provider: "vtex.b2b-organizations-graphql") {\n      id\n      costCenterId\n      href\n      status\n    }\n  }\n':
    types.CreateOrganizationDocument,
  '\n  mutation CreateUserWithEmail($roleId: ID!, $name: String!,$email: String!, $orgId: ID!,$costId: ID!) {\n    createUserWithEmail(roleId: $roleId,name: $name,email: $email,orgId: $orgId, costId: $costId) @context(provider: "vtex.b2b-organizations-graphql"){\n      status\n    }\n  }\n':
    types.CreateUserWithEmailDocument,
  '\n  mutation CreateOrganizationERP($input: CreateOrganizationERPInput) {\n    createOrganizationERP(input: $input) {\n      message\n      requestId\n    }\n  }\n':
    types.CreateOrganizationErpDocument,
  '\n  query CostCenterByOrgId($id: ID) {\n    getCostCentersByOrganizationId(id: $id) {\n      data {\n        id\n      }\n    }\n  }\n':
    types.CostCenterByOrgIdDocument,
  '\n  query getOrderFormOrgs($id: String!) {\n    orderForm(id: $id) {\n      orderFormId\n      marketingData {\n      utmCampaign\n      utmMedium\n      }\n    }\n  }\n':
    types.GetOrderFormOrgsDocument,
  '\n  query GetOrganizationsByEmail {\n    getOrganizationsByEmail @context(provider: "vtex.b2b-organizations-graphql") {\n      id\n      costCenterName\n      costId\n      organizationName\n      organizationStatus\n      orgId\n      role {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetOrganizationsByEmailDocument,
  '\n  query CheckUserPermission {\n    checkUserPermission @context(provider: "vtex.storefront-permissions") {\n      role {\n        id\n        name\n        slug\n      }\n      permissions\n    }\n  }\n':
    types.CheckUserPermissionDocument,
  '\n  query GetOrganizationByIdStorefront($orgId: ID) {\n    getOrganizationByIdStorefront(id: $orgId) {\n      id\n      name\n      status\n      paymentTerms {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetOrganizationByIdStorefrontDocument,
  '\n  query GetCostCenterByIdStorefront($orgId: ID) {\n    getCostCenterByIdStorefront(id: $orgId) {\n      id\n      name\n      organization\n      paymentTerms {\n        id\n        name\n      }\n      addresses {\n        addressId\n        addressType\n        addressQuery\n        postalCode\n        country\n        receiverName\n        city\n        state\n        street\n        number\n        complement\n        neighborhood\n        geoCoordinates\n        reference\n      }\n      phoneNumber\n      businessDocument\n      stateRegistration\n    }\n  }\n':
    types.GetCostCenterByIdStorefrontDocument,
  '\n  query GetB2BSettings {\n    getB2BSettings @context(provider: "vtex.b2b-organizations-graphql") {\n      uiSettings {\n        showModal\n      }\n    }\n  }\n':
    types.GetB2BSettingsDocument,
  '\n  mutation SetCurrentOrganization($orgId: ID!, $costId: ID!) {\n    setCurrentOrganization(orgId: $orgId, costId: $costId)\n      @context(provider: "vtex.storefront-permissions") {\n      status\n      message\n    }\n  }\n':
    types.SetCurrentOrganizationDocument,
  '\n  query getBrandList {\n    brandList {\n      name\n    }\n  }\n':
    types.GetBrandListDocument,
  '\n  mutation removeExtraParts($skuGtin: String) {\n    removeExtraParts(skuGtin: $skuGtin)\n  }\n':
    types.RemoveExtraPartsDocument,
  '\n  mutation removeFolderImprinting($skuGtin: String) {\n    removeFolderImprinting(skuGtin: $skuGtin)\n  }\n':
    types.RemoveFolderImprintingDocument,
  '\n  query getOrderFormCart($id: String!) {\n    orderForm(id: $id) {\n      orderFormId\n      items {\n        id\n        quantity\n        seller\n        parentItemIndex\n        parentAssemblyBinding\n        listPrice\n        sellingPrice\n        skuName\n      }\n      customData {\n        customApps {\n          id\n          major\n          fields {\n            key\n            value\n          }\n        }\n      }\n    }\n  }\n':
    types.GetOrderFormCartDocument,
  '\n  query getCollectionName($collectionId: String!){\n    getCollectionName(collectionId: $collectionId) {\n      Name\n    }\n  }\n':
    types.GetCollectionNameDocument,
  '\n  query getBrand($id: Int!) {\n    brand(id: $id) {\n      name\n    }\n  }\n':
    types.GetBrandDocument,
  '\n  query getCollectionDetails($id: Int!) {\n    collectionDetails(id: $id) {\n      Name\n    }\n  }\n':
    types.GetCollectionDetailsDocument,
  '\n  query departmentBanner($department: String!) {\n    departmentBanner(department: $department) {\n      banners {\n        id\n        name\n        html\n      }\n    }\n  }\n':
    types.DepartmentBannerDocument,
  '\n  query getCategoryTree($id: Int!, $excludeIds: [Int!]) {\n    categoryTree(id: $id, excludeIds: $excludeIds) {\n      id\n      name\n      url\n      hasChildren\n      children {\n        id\n        name\n        url\n      }\n    }\n  }\n':
    types.GetCategoryTreeDocument,
  '\n  query getCustomData($appId: String!, $field: String!) {\n    customData(appId: $appId, field: $field)\n  }\n':
    types.GetCustomDataDocument,
  '\n  mutation addFolderImprinting($data: String!) {\n    addFolderImprinting(data: $data)\n  }\n':
    types.AddFolderImprintingDocument,
  '\n  mutation addToCart($items: [ItemInput!]!) {\n    addToCart(items: $items) {\n      order {\n        orderNumber\n        acceptedOffer {\n          ...CartItem\n        }\n      }\n      messages {\n        ...CartMessage\n      }\n    }\n  }\n':
    types.AddToCartDocument,
  '\n  mutation removeFromCart($skuId: ID!) {\n    removeFromCart(skuId: $skuId)\n  }\n':
    types.RemoveFromCartDocument,
  '\n  mutation subscribeNewsletter($email: String, $fields: NewsletterFieldsInput) {\n    subscribeNewsletter(email: $email, fields: $fields)\n  }\n':
    types.SubscribeNewsletterDocument,
  '\n  mutation syncPersistedCart($email: String, $cartId: ID, $cart: CartInputV2, $cartSerialized: String, $revision: Int) {\n    syncPersistedCart(email: $email, cartId: $cartId, cart: $cart, cartSerialized: $cartSerialized, revision: $revision) {\n      revision\n      cartSerialized\n      cart {\n        id\n        messages {\n          text\n          status\n        }\n        items {\n          id\n          quantity\n          price\n          listPrice\n          seller {\n            identifier\n          }\n          itemOffered {\n            sku\n            name\n            unitMultiplier\n            gtin\n            image {\n              url\n              alternateName\n            }\n            brand {\n              name\n            }\n            isVariantOf {\n              productGroupID\n              name\n              skuVariants {\n                activeVariations\n                slugsMap\n                availableVariations\n              }\n            }\n            additionalProperty {\n              propertyID\n              name\n              value\n              valueReference\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.SyncPersistedCartDocument,
  '\n  query getMenuItems {\n    menuItems {\n      id\n      parentId\n      type\n      position\n      title\n      url\n      imageUrl\n      altText\n      ctaText\n    }\n  }\n':
    types.GetMenuItemsDocument,
  '\n  mutation addExtraParts($extraOrderData: String!) {\n    addExtraParts(extraOrderData: $extraOrderData)\n  }\n':
    types.AddExtraPartsDocument,
  '\n  query getOrderForm($id: String!) {\n    orderForm(id: $id) {\n      orderFormId\n      customData {\n        customApps {\n          id\n          major\n          fields {\n            key\n            value\n          }\n        }\n      }\n    }\n  }\n':
    types.GetOrderFormDocument,
  '\n    query getFestivalCollections($locator: IStoreSelectedFacet!) {\n      product(locator: [$locator]) {\n        isVariantOf {\n          festivalCollections {\n            name\n            slug\n          }\n        }\n      }\n    }\n  ':
    types.GetFestivalCollectionsDocument,
  '\n    query getSubcollectionId($collectionId: String!){\n      getSubcollectionId(collectionId: $collectionId) {\n        Data {\n          SkuId\n        }\n      }\n    }\n  ':
    types.GetSubcollectionIdDocument,
  '\n  query getStateAndFestivalLists {\n    lists {\n      collectionId\n      level1Label\n      level1Value\n      level2Label\n      level2Value\n      region\n      title\n      type\n    }\n  }\n':
    types.GetStateAndFestivalListsDocument,
  '\n  query getLitCalItems {\n    liturgicalCalendar {\n      season\n      year\n      date\n      dateTitle\n      title\n      type\n      calendar\n    }\n  }\n':
    types.GetLitCalItemsDocument,
  '\n  query getFacets($selectedFacets: [IStoreSelectedFacet!]) {\n    search(first: 1, selectedFacets: $selectedFacets) {\n      facets {\n        ... on StoreFacetBoolean {\n          key\n          label\n          values {\n            label\n            value\n            selected\n            quantity\n          }\n        }\n      }\n    }\n  }\n':
    types.GetFacetsDocument,
  '\n  fragment ClientManyProducts on Query {\n    search(\n      first: $first\n      after: $after\n      sort: $sort\n      term: $term\n      selectedFacets: $selectedFacets\n    ) {\n      facets {\n        ... on StoreFacetRange {\n          key\n          label\n\n          min {\n            selected\n            absolute\n          }\n\n          max {\n            selected\n            absolute\n          }\n\n          __typename\n        }\n\n        ... on StoreFacetBoolean {\n          key\n          label\n          values {\n            label\n            value\n            selected\n            quantity\n          }\n\n          __typename\n        }\n      }\n      products {\n        edges {\n          node {\n            description\n            releaseDate\n            offers {\n              highPrice\n            }\n            breadcrumbList{\n\t\t\t\t\t\t\titemListElement{\n\t\t\t\t\t\t\t\titem\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\tposition\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tnumberOfItems\n\t\t\t\t\t\t}\n            additionalProperty {\n              propertyID\n              name\n              value\n              valueReference\n            }\n            inventory {\n              availableQuantity\n              warehouse {\n                id\n              }\n            }\n            isVariantOf {\n              additionalProperty {\n                propertyID\n                name\n                value\n                valueReference\n              }\n              fullVariantList {\n                isVariantOf {\n                  productGroupID\n                  name\n                }\n                inventory {\n                  availableQuantity\n                  warehouse {\n                    id\n                  }\n                }\n                productID\n                sku\n                name\n                gtin\n                slug\n                image {\n                  url\n                  alternateName\n                }\n                videos\n                additionalProperty {\n                  propertyID\n                  name\n                  value\n                  valueReference\n                }\n                offers {\n                  offers {\n                    availability\n                    price\n                    priceValidUntil\n                    priceCurrency\n                    listPrice\n                    seller {\n                      identifier\n                    }\n                  }\n                }\n                inventory {\n                  availableQuantity\n                  warehouse {\n                    id\n                  }\n                }\n              }\n              skuVariants {\n                activeVariations\n                slugsMap\n                availableVariations\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.ClientManyProductsFragmentDoc,
  '\n  fragment ClientProduct on Query {\n    product(locator: $locator) {\n      id: productID\n      slug\n      assemblyOptions {\n        id\n        name\n        composition {\n          items {\n            id\n            gtin\n            priceTable\n            seller\n          }\n        }\n      }\n      inventory {\n        availableQuantity\n        warehouse {\n          id\n        }\n      }\n      isVariantOf {\n        additionalProperty {\n          propertyID\n          name\n          value\n          valueReference\n        }\n      }\n    }\n  }\n':
    types.ClientProductFragmentDoc,
  '\n  fragment ClientProductGallery on Query {\n    search(\n      first: $first\n      after: $after\n      sort: $sort\n      term: $term\n      selectedFacets: $selectedFacets\n    ) {\n      products {\n        pageInfo {\n          totalCount\n        }\n      }\n    }\n  }\n':
    types.ClientProductGalleryFragmentDoc,
  '\n  fragment ClientSearchSuggestions on Query {\n    search(first: 5, term: $term, selectedFacets: $selectedFacets) {\n      suggestions {\n        terms {\n          value\n        }\n      }\n    }\n  }\n':
    types.ClientSearchSuggestionsFragmentDoc,
  '\n  fragment ClientShippingSimulation on Query {\n    shipping(items: $items, postalCode: $postalCode, country: $country) {\n      address {\n        city\n      }\n    }\n  }\n':
    types.ClientShippingSimulationFragmentDoc,
  '\n  fragment ClientTopSearchSuggestions on Query {\n    search(first: 5, term: $term, selectedFacets: $selectedFacets) {\n      suggestions {\n        terms {\n          value\n        }\n      }\n    }\n  }\n':
    types.ClientTopSearchSuggestionsFragmentDoc,
  '\n  fragment ServerCollectionPage on Query {\n    collection(slug: $slug) {\n      id\n    }\n  }\n':
    types.ServerCollectionPageFragmentDoc,
  '\n  fragment ServerProduct on Query {\n    product(locator: $locator) {\n      slug\n\n      additionalProperty {\n        name\n        value\n      }\n\n      inventory {\n        availableQuantity\n        warehouse {\n          id\n        }\n      }\n\n      assemblyOptions {\n        id\n        name\n        composition {\n          items {\n            id\n            gtin\n            priceTable\n            seller\n          }\n        }\n      }\n\n      isVariantOf {\n        additionalProperty {\n          propertyID\n          name\n          value\n          valueReference\n        }\n\n        fullVariantList {\n          productID\n          sku\n          name\n          gtin\n          slug\n\n          isVariantOf {\n            productGroupID\n            name\n          }\n\n          image {\n            url\n            alternateName\n          }\n\n          videos\n\n          additionalProperty {\n            propertyID\n            name\n            value\n            valueReference\n          }\n\n          inventory {\n            availableQuantity\n            warehouse {\n              id\n            }\n          }\n\n          offers {\n            offers {\n              availability\n              price\n              priceValidUntil\n              priceCurrency\n              listPrice\n              seller {\n                identifier\n              }\n            }\n          }\n        }\n\n        skuVariants {\n          activeVariations\n          slugsMap\n          availableVariations\n        }\n      }\n    }\n  }\n':
    types.ServerProductFragmentDoc,
  '\n  query getSessionToken {\n    sessionToken\n  }\n':
    types.GetSessionTokenDocument,
  '\n  query ViewLists {\n    getWishlistsByEmail {\n      id\n      email\n      wishlistType\n      products {\n        ID\n        Image\n        linkProduct\n        nameProduct\n        quantityProduct\n        skuCodeReference\n        department\n        bundle\n        notes\n      }\n      isPublic\n      fieldsConfig {\n        department\n        description\n      }\n      createdIn\n    }\n  }\n':
    types.ViewListsDocument,
  '\n  query listById($id: ID!) {\n    getWishlist(id: $id) {\n       id\n      email\n      wishlistType\n      products {\n        ID\n        Image\n        linkProduct\n        nameProduct\n        quantityProduct\n        skuCodeReference\n        department\n        bundle\n        notes\n      }\n      isPublic\n      fieldsConfig {\n        department\n        description\n      }\n      createdIn\n    }\n  }\n':
    types.ListByIdDocument,
  '\n  mutation CreateList($wishlist: WishlistInput!) {\n    createWishlist(wishlist: $wishlist) {\n      Id\n    }\n  }\n':
    types.CreateListDocument,
  '\n  mutation AddToList($wishlist: WishlistInput) {\n    updateWishlist(wishlist: $wishlist) {\n      id\n    }\n  }\n':
    types.AddToListDocument,
  '\n  mutation UpdateListItem($wishlist: WishlistInput) {\n    updateWishlist(wishlist: $wishlist) {\n      id\n    }\n  }\n':
    types.UpdateListItemDocument,
  '\n  mutation UpdateList($wishlist: WishlistInput) {\n    updateWishlist(wishlist: $wishlist) {\n      id\n    }\n  }\n':
    types.UpdateListDocument,
  '\n  query ServerCollectionPageQuery($slug: String!) {\n    ...ServerCollectionPage\n    collection(slug: $slug) {\n      seo {\n        title\n        description\n      }\n      breadcrumbList {\n        itemListElement {\n          item\n          name\n          position\n        }\n      }\n      meta {\n        selectedFacets {\n          key\n          value\n        }\n      }\n    }\n  }\n':
    types.ServerCollectionPageQueryDocument,
  '\n  query ServerProductQuery($locator: [IStoreSelectedFacet!]!) {\n    ...ServerProduct\n    product(locator: $locator) {\n      id: productID\n\n      seo {\n        title\n        description\n        canonical\n      }\n\n      brand {\n        name\n      }\n\n      sku\n      gtin\n      name\n      description\n      releaseDate\n\n      breadcrumbList {\n        itemListElement {\n          item\n          name\n          position\n        }\n      }\n\n      image {\n        url\n        alternateName\n      }\n\n      offers {\n        lowPrice\n        highPrice\n        lowPriceWithTaxes\n        priceCurrency\n        offers {\n          availability\n          price\n          priceValidUntil\n          priceCurrency\n          itemCondition\n          seller {\n            identifier\n          }\n        }\n      }\n\n      isVariantOf {\n        productGroupID\n      }\n\n      ...ProductDetailsFragment_product\n    }\n  }\n':
    types.ServerProductQueryDocument,
  '\n  mutation ValidateCartMutation($cart: IStoreCart!, $session: IStoreSession!) {\n    validateCart(cart: $cart, session: $session) {\n      order {\n        orderNumber\n        acceptedOffer {\n          ...CartItem\n        }\n      }\n      messages {\n        ...CartMessage\n      }\n    }\n  }\n\n  fragment CartMessage on StoreCartMessage {\n    text\n    status\n  }\n\n  fragment CartItem on StoreOffer {\n    seller {\n      identifier\n    }\n    quantity\n    price\n    priceWithTaxes\n    listPrice\n    listPriceWithTaxes\n    itemOffered {\n      ...CartProductItem\n    }\n  }\n\n  fragment CartProductItem on StoreProduct {\n    sku\n    name\n    unitMultiplier\n    image {\n      url\n      alternateName\n    }\n    brand {\n      name\n    }\n    isVariantOf {\n      productGroupID\n      name\n      skuVariants {\n        activeVariations\n        slugsMap\n        availableVariations\n      }\n    }\n    gtin\n    additionalProperty {\n      propertyID\n      name\n      value\n      valueReference\n    }\n  }\n':
    types.ValidateCartMutationDocument,
  '\n  mutation SubscribeToNewsletter($data: IPersonNewsletter!) {\n    subscribeToNewsletter(data: $data) {\n      id\n    }\n  }\n':
    types.SubscribeToNewsletterDocument,
  '\n  query ClientManyProductsQuery(\n    $first: Int!\n    $after: String\n    $sort: StoreSort!\n    $term: String!\n    $selectedFacets: [IStoreSelectedFacet!]!\n  ) {\n    ...ClientManyProducts\n    search(\n      first: $first\n      after: $after\n      sort: $sort\n      term: $term\n      selectedFacets: $selectedFacets\n    ) {\n      products {\n        pageInfo {\n          totalCount\n        }\n        edges {\n          node {\n            ...ProductSummary_product\n          }\n        }\n      }\n    }\n  }\n':
    types.ClientManyProductsQueryDocument,
  '\n  query ClientProductGalleryQuery(\n    $first: Int!\n    $after: String!\n    $sort: StoreSort!\n    $term: String!\n    $selectedFacets: [IStoreSelectedFacet!]!\n  ) {\n    ...ClientProductGallery\n    redirect(term: $term, selectedFacets: $selectedFacets) {\n      url\n    }\n    search(\n      first: $first\n      after: $after\n      sort: $sort\n      term: $term\n      selectedFacets: $selectedFacets\n    ) {\n      products {\n        pageInfo {\n          totalCount\n        }\n      }\n      facets {\n        ...Filter_facets\n      }\n      metadata {\n        ...SearchEvent_metadata\n      }\n    }\n  }\n\n  fragment SearchEvent_metadata on SearchMetadata {\n    isTermMisspelled\n    logicalOperator\n  }\n':
    types.ClientProductGalleryQueryDocument,
  '\n  query ClientProductQuery($locator: [IStoreSelectedFacet!]!) {\n    ...ClientProduct\n    product(locator: $locator) {\n      ...ProductDetailsFragment_product\n    }\n  }\n':
    types.ClientProductQueryDocument,
  '\n  query ClientSearchSuggestionsQuery(\n    $term: String!\n    $selectedFacets: [IStoreSelectedFacet!]\n  ) {\n    ...ClientSearchSuggestions\n    search(first: 5, term: $term, selectedFacets: $selectedFacets) {\n      suggestions {\n        terms {\n          value\n        }\n        products {\n          ...ProductSummary_product\n        }\n      }\n      products {\n        pageInfo {\n          totalCount\n        }\n      }\n      metadata {\n        ...SearchEvent_metadata\n      }\n    }\n  }\n':
    types.ClientSearchSuggestionsQueryDocument,
  '\n  query ClientTopSearchSuggestionsQuery(\n    $term: String!\n    $selectedFacets: [IStoreSelectedFacet!]\n  ) {\n    ...ClientTopSearchSuggestions\n    search(first: 5, term: $term, selectedFacets: $selectedFacets) {\n      suggestions {\n        terms {\n          value\n        }\n      }\n    }\n  }\n':
    types.ClientTopSearchSuggestionsQueryDocument,
  '\n  mutation ValidateSession($session: IStoreSession!, $search: String!) {\n    validateSession(session: $session, search: $search) {\n      locale\n      channel\n      country\n      addressType\n      postalCode\n      deliveryMode {\n        deliveryChannel\n        deliveryMethod\n        deliveryWindow {\n          startDate\n          endDate\n        }\n      }\n      geoCoordinates {\n        latitude\n        longitude\n      }\n      currency {\n        code\n        symbol\n      }\n      person {\n        id\n        email\n        givenName\n        familyName\n      }\n    }\n  }\n':
    types.ValidateSessionDocument,
  '\n  query ClientShippingSimulationQuery(\n    $postalCode: String!\n    $country: String!\n    $items: [IShippingItem!]!\n  ) {\n    ...ClientShippingSimulation\n    shipping(items: $items, postalCode: $postalCode, country: $country) {\n      logisticsInfo {\n        slas {\n          carrier\n          price\n          availableDeliveryWindows {\n            startDateUtc\n            endDateUtc\n            price\n            listPrice\n          }\n          shippingEstimate\n          localizedEstimates\n        }\n      }\n      address {\n        city\n        neighborhood\n        state\n      }\n    }\n  }\n':
    types.ClientShippingSimulationQueryDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ProductSummary_product on StoreProduct {\n    id: productID\n    slug\n    sku\n    brand {\n      brandName: name\n    }\n    name\n    gtin\n\n    isVariantOf {\n      productGroupID\n      name\n    }\n\n    image {\n      url\n      alternateName\n    }\n\n    brand {\n      name\n    }\n\n    offers {\n      lowPrice\n      lowPriceWithTaxes\n      offers {\n        availability\n        price\n        listPrice\n        listPriceWithTaxes\n        quantity\n        seller {\n          identifier\n        }\n      }\n    }\n\n    additionalProperty {\n      propertyID\n      name\n      value\n      valueReference\n    }\n  }\n'
): typeof import('./graphql').ProductSummary_ProductFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment Filter_facets on StoreFacet {\n    ... on StoreFacetRange {\n      key\n      label\n\n      min {\n        selected\n        absolute\n      }\n\n      max {\n        selected\n        absolute\n      }\n\n      __typename\n    }\n    ... on StoreFacetBoolean {\n      key\n      label\n      values {\n        label\n        value\n        selected\n        quantity\n      }\n\n      __typename\n    }\n  }\n'
): typeof import('./graphql').Filter_FacetsFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ProductDetailsFragment_product on StoreProduct {\n    id: productID\n    sku\n    name\n    gtin\n    description\n    unitMultiplier\n    isVariantOf {\n      name\n      productGroupID\n      skuVariants {\n        activeVariations\n        slugsMap\n        availableVariations\n      }\n    }\n\n    image {\n      url\n      alternateName\n    }\n\n    brand {\n      name\n    }\n\n    offers {\n      lowPrice\n      lowPriceWithTaxes\n      offers {\n        availability\n        price\n        priceWithTaxes\n        listPrice\n        listPriceWithTaxes\n        seller {\n          identifier\n        }\n      }\n    }\n\n    additionalProperty {\n      propertyID\n      name\n      value\n      valueReference\n    }\n\n    # Contains necessary info to add this item to cart\n    ...CartProductItem\n  }\n'
): typeof import('./graphql').ProductDetailsFragment_ProductFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateOrganization($input: OrganizationInput!, $notifyUsers: Boolean) {\n    createOrganization(input: $input, notifyUsers: $notifyUsers) @context(provider: "vtex.b2b-organizations-graphql") {\n      id\n      costCenterId\n      href\n      status\n    }\n  }\n'
): typeof import('./graphql').CreateOrganizationDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateUserWithEmail($roleId: ID!, $name: String!,$email: String!, $orgId: ID!,$costId: ID!) {\n    createUserWithEmail(roleId: $roleId,name: $name,email: $email,orgId: $orgId, costId: $costId) @context(provider: "vtex.b2b-organizations-graphql"){\n      status\n    }\n  }\n'
): typeof import('./graphql').CreateUserWithEmailDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateOrganizationERP($input: CreateOrganizationERPInput) {\n    createOrganizationERP(input: $input) {\n      message\n      requestId\n    }\n  }\n'
): typeof import('./graphql').CreateOrganizationErpDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query CostCenterByOrgId($id: ID) {\n    getCostCentersByOrganizationId(id: $id) {\n      data {\n        id\n      }\n    }\n  }\n'
): typeof import('./graphql').CostCenterByOrgIdDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getOrderFormOrgs($id: String!) {\n    orderForm(id: $id) {\n      orderFormId\n      marketingData {\n      utmCampaign\n      utmMedium\n      }\n    }\n  }\n'
): typeof import('./graphql').GetOrderFormOrgsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetOrganizationsByEmail {\n    getOrganizationsByEmail @context(provider: "vtex.b2b-organizations-graphql") {\n      id\n      costCenterName\n      costId\n      organizationName\n      organizationStatus\n      orgId\n      role {\n        id\n        name\n      }\n    }\n  }\n'
): typeof import('./graphql').GetOrganizationsByEmailDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query CheckUserPermission {\n    checkUserPermission @context(provider: "vtex.storefront-permissions") {\n      role {\n        id\n        name\n        slug\n      }\n      permissions\n    }\n  }\n'
): typeof import('./graphql').CheckUserPermissionDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetOrganizationByIdStorefront($orgId: ID) {\n    getOrganizationByIdStorefront(id: $orgId) {\n      id\n      name\n      status\n      paymentTerms {\n        id\n        name\n      }\n    }\n  }\n'
): typeof import('./graphql').GetOrganizationByIdStorefrontDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCostCenterByIdStorefront($orgId: ID) {\n    getCostCenterByIdStorefront(id: $orgId) {\n      id\n      name\n      organization\n      paymentTerms {\n        id\n        name\n      }\n      addresses {\n        addressId\n        addressType\n        addressQuery\n        postalCode\n        country\n        receiverName\n        city\n        state\n        street\n        number\n        complement\n        neighborhood\n        geoCoordinates\n        reference\n      }\n      phoneNumber\n      businessDocument\n      stateRegistration\n    }\n  }\n'
): typeof import('./graphql').GetCostCenterByIdStorefrontDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetB2BSettings {\n    getB2BSettings @context(provider: "vtex.b2b-organizations-graphql") {\n      uiSettings {\n        showModal\n      }\n    }\n  }\n'
): typeof import('./graphql').GetB2BSettingsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SetCurrentOrganization($orgId: ID!, $costId: ID!) {\n    setCurrentOrganization(orgId: $orgId, costId: $costId)\n      @context(provider: "vtex.storefront-permissions") {\n      status\n      message\n    }\n  }\n'
): typeof import('./graphql').SetCurrentOrganizationDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getBrandList {\n    brandList {\n      name\n    }\n  }\n'
): typeof import('./graphql').GetBrandListDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation removeExtraParts($skuGtin: String) {\n    removeExtraParts(skuGtin: $skuGtin)\n  }\n'
): typeof import('./graphql').RemoveExtraPartsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation removeFolderImprinting($skuGtin: String) {\n    removeFolderImprinting(skuGtin: $skuGtin)\n  }\n'
): typeof import('./graphql').RemoveFolderImprintingDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getOrderFormCart($id: String!) {\n    orderForm(id: $id) {\n      orderFormId\n      items {\n        id\n        quantity\n        seller\n        parentItemIndex\n        parentAssemblyBinding\n        listPrice\n        sellingPrice\n        skuName\n      }\n      customData {\n        customApps {\n          id\n          major\n          fields {\n            key\n            value\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetOrderFormCartDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getCollectionName($collectionId: String!){\n    getCollectionName(collectionId: $collectionId) {\n      Name\n    }\n  }\n'
): typeof import('./graphql').GetCollectionNameDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getBrand($id: Int!) {\n    brand(id: $id) {\n      name\n    }\n  }\n'
): typeof import('./graphql').GetBrandDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getCollectionDetails($id: Int!) {\n    collectionDetails(id: $id) {\n      Name\n    }\n  }\n'
): typeof import('./graphql').GetCollectionDetailsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query departmentBanner($department: String!) {\n    departmentBanner(department: $department) {\n      banners {\n        id\n        name\n        html\n      }\n    }\n  }\n'
): typeof import('./graphql').DepartmentBannerDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getCategoryTree($id: Int!, $excludeIds: [Int!]) {\n    categoryTree(id: $id, excludeIds: $excludeIds) {\n      id\n      name\n      url\n      hasChildren\n      children {\n        id\n        name\n        url\n      }\n    }\n  }\n'
): typeof import('./graphql').GetCategoryTreeDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getCustomData($appId: String!, $field: String!) {\n    customData(appId: $appId, field: $field)\n  }\n'
): typeof import('./graphql').GetCustomDataDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation addFolderImprinting($data: String!) {\n    addFolderImprinting(data: $data)\n  }\n'
): typeof import('./graphql').AddFolderImprintingDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation addToCart($items: [ItemInput!]!) {\n    addToCart(items: $items) {\n      order {\n        orderNumber\n        acceptedOffer {\n          ...CartItem\n        }\n      }\n      messages {\n        ...CartMessage\n      }\n    }\n  }\n'
): typeof import('./graphql').AddToCartDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation removeFromCart($skuId: ID!) {\n    removeFromCart(skuId: $skuId)\n  }\n'
): typeof import('./graphql').RemoveFromCartDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation subscribeNewsletter($email: String, $fields: NewsletterFieldsInput) {\n    subscribeNewsletter(email: $email, fields: $fields)\n  }\n'
): typeof import('./graphql').SubscribeNewsletterDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation syncPersistedCart($email: String, $cartId: ID, $cart: CartInputV2, $cartSerialized: String, $revision: Int) {\n    syncPersistedCart(email: $email, cartId: $cartId, cart: $cart, cartSerialized: $cartSerialized, revision: $revision) {\n      revision\n      cartSerialized\n      cart {\n        id\n        messages {\n          text\n          status\n        }\n        items {\n          id\n          quantity\n          price\n          listPrice\n          seller {\n            identifier\n          }\n          itemOffered {\n            sku\n            name\n            unitMultiplier\n            gtin\n            image {\n              url\n              alternateName\n            }\n            brand {\n              name\n            }\n            isVariantOf {\n              productGroupID\n              name\n              skuVariants {\n                activeVariations\n                slugsMap\n                availableVariations\n              }\n            }\n            additionalProperty {\n              propertyID\n              name\n              value\n              valueReference\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').SyncPersistedCartDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getMenuItems {\n    menuItems {\n      id\n      parentId\n      type\n      position\n      title\n      url\n      imageUrl\n      altText\n      ctaText\n    }\n  }\n'
): typeof import('./graphql').GetMenuItemsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation addExtraParts($extraOrderData: String!) {\n    addExtraParts(extraOrderData: $extraOrderData)\n  }\n'
): typeof import('./graphql').AddExtraPartsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getOrderForm($id: String!) {\n    orderForm(id: $id) {\n      orderFormId\n      customData {\n        customApps {\n          id\n          major\n          fields {\n            key\n            value\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetOrderFormDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query getFestivalCollections($locator: IStoreSelectedFacet!) {\n      product(locator: [$locator]) {\n        isVariantOf {\n          festivalCollections {\n            name\n            slug\n          }\n        }\n      }\n    }\n  '
): typeof import('./graphql').GetFestivalCollectionsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query getSubcollectionId($collectionId: String!){\n      getSubcollectionId(collectionId: $collectionId) {\n        Data {\n          SkuId\n        }\n      }\n    }\n  '
): typeof import('./graphql').GetSubcollectionIdDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getStateAndFestivalLists {\n    lists {\n      collectionId\n      level1Label\n      level1Value\n      level2Label\n      level2Value\n      region\n      title\n      type\n    }\n  }\n'
): typeof import('./graphql').GetStateAndFestivalListsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getLitCalItems {\n    liturgicalCalendar {\n      season\n      year\n      date\n      dateTitle\n      title\n      type\n      calendar\n    }\n  }\n'
): typeof import('./graphql').GetLitCalItemsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getFacets($selectedFacets: [IStoreSelectedFacet!]) {\n    search(first: 1, selectedFacets: $selectedFacets) {\n      facets {\n        ... on StoreFacetBoolean {\n          key\n          label\n          values {\n            label\n            value\n            selected\n            quantity\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetFacetsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ClientManyProducts on Query {\n    search(\n      first: $first\n      after: $after\n      sort: $sort\n      term: $term\n      selectedFacets: $selectedFacets\n    ) {\n      facets {\n        ... on StoreFacetRange {\n          key\n          label\n\n          min {\n            selected\n            absolute\n          }\n\n          max {\n            selected\n            absolute\n          }\n\n          __typename\n        }\n\n        ... on StoreFacetBoolean {\n          key\n          label\n          values {\n            label\n            value\n            selected\n            quantity\n          }\n\n          __typename\n        }\n      }\n      products {\n        edges {\n          node {\n            description\n            releaseDate\n            offers {\n              highPrice\n            }\n            breadcrumbList{\n\t\t\t\t\t\t\titemListElement{\n\t\t\t\t\t\t\t\titem\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\tposition\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tnumberOfItems\n\t\t\t\t\t\t}\n            additionalProperty {\n              propertyID\n              name\n              value\n              valueReference\n            }\n            inventory {\n              availableQuantity\n              warehouse {\n                id\n              }\n            }\n            isVariantOf {\n              additionalProperty {\n                propertyID\n                name\n                value\n                valueReference\n              }\n              fullVariantList {\n                isVariantOf {\n                  productGroupID\n                  name\n                }\n                inventory {\n                  availableQuantity\n                  warehouse {\n                    id\n                  }\n                }\n                productID\n                sku\n                name\n                gtin\n                slug\n                image {\n                  url\n                  alternateName\n                }\n                videos\n                additionalProperty {\n                  propertyID\n                  name\n                  value\n                  valueReference\n                }\n                offers {\n                  offers {\n                    availability\n                    price\n                    priceValidUntil\n                    priceCurrency\n                    listPrice\n                    seller {\n                      identifier\n                    }\n                  }\n                }\n                inventory {\n                  availableQuantity\n                  warehouse {\n                    id\n                  }\n                }\n              }\n              skuVariants {\n                activeVariations\n                slugsMap\n                availableVariations\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientManyProductsFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ClientProduct on Query {\n    product(locator: $locator) {\n      id: productID\n      slug\n      assemblyOptions {\n        id\n        name\n        composition {\n          items {\n            id\n            gtin\n            priceTable\n            seller\n          }\n        }\n      }\n      inventory {\n        availableQuantity\n        warehouse {\n          id\n        }\n      }\n      isVariantOf {\n        additionalProperty {\n          propertyID\n          name\n          value\n          valueReference\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientProductFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ClientProductGallery on Query {\n    search(\n      first: $first\n      after: $after\n      sort: $sort\n      term: $term\n      selectedFacets: $selectedFacets\n    ) {\n      products {\n        pageInfo {\n          totalCount\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientProductGalleryFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ClientSearchSuggestions on Query {\n    search(first: 5, term: $term, selectedFacets: $selectedFacets) {\n      suggestions {\n        terms {\n          value\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientSearchSuggestionsFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ClientShippingSimulation on Query {\n    shipping(items: $items, postalCode: $postalCode, country: $country) {\n      address {\n        city\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientShippingSimulationFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ClientTopSearchSuggestions on Query {\n    search(first: 5, term: $term, selectedFacets: $selectedFacets) {\n      suggestions {\n        terms {\n          value\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientTopSearchSuggestionsFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ServerCollectionPage on Query {\n    collection(slug: $slug) {\n      id\n    }\n  }\n'
): typeof import('./graphql').ServerCollectionPageFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ServerProduct on Query {\n    product(locator: $locator) {\n      slug\n\n      additionalProperty {\n        name\n        value\n      }\n\n      inventory {\n        availableQuantity\n        warehouse {\n          id\n        }\n      }\n\n      assemblyOptions {\n        id\n        name\n        composition {\n          items {\n            id\n            gtin\n            priceTable\n            seller\n          }\n        }\n      }\n\n      isVariantOf {\n        additionalProperty {\n          propertyID\n          name\n          value\n          valueReference\n        }\n\n        fullVariantList {\n          productID\n          sku\n          name\n          gtin\n          slug\n\n          isVariantOf {\n            productGroupID\n            name\n          }\n\n          image {\n            url\n            alternateName\n          }\n\n          videos\n\n          additionalProperty {\n            propertyID\n            name\n            value\n            valueReference\n          }\n\n          inventory {\n            availableQuantity\n            warehouse {\n              id\n            }\n          }\n\n          offers {\n            offers {\n              availability\n              price\n              priceValidUntil\n              priceCurrency\n              listPrice\n              seller {\n                identifier\n              }\n            }\n          }\n        }\n\n        skuVariants {\n          activeVariations\n          slugsMap\n          availableVariations\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ServerProductFragmentDoc
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getSessionToken {\n    sessionToken\n  }\n'
): typeof import('./graphql').GetSessionTokenDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ViewLists {\n    getWishlistsByEmail {\n      id\n      email\n      wishlistType\n      products {\n        ID\n        Image\n        linkProduct\n        nameProduct\n        quantityProduct\n        skuCodeReference\n        department\n        bundle\n        notes\n      }\n      isPublic\n      fieldsConfig {\n        department\n        description\n      }\n      createdIn\n    }\n  }\n'
): typeof import('./graphql').ViewListsDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query listById($id: ID!) {\n    getWishlist(id: $id) {\n       id\n      email\n      wishlistType\n      products {\n        ID\n        Image\n        linkProduct\n        nameProduct\n        quantityProduct\n        skuCodeReference\n        department\n        bundle\n        notes\n      }\n      isPublic\n      fieldsConfig {\n        department\n        description\n      }\n      createdIn\n    }\n  }\n'
): typeof import('./graphql').ListByIdDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateList($wishlist: WishlistInput!) {\n    createWishlist(wishlist: $wishlist) {\n      Id\n    }\n  }\n'
): typeof import('./graphql').CreateListDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddToList($wishlist: WishlistInput) {\n    updateWishlist(wishlist: $wishlist) {\n      id\n    }\n  }\n'
): typeof import('./graphql').AddToListDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateListItem($wishlist: WishlistInput) {\n    updateWishlist(wishlist: $wishlist) {\n      id\n    }\n  }\n'
): typeof import('./graphql').UpdateListItemDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateList($wishlist: WishlistInput) {\n    updateWishlist(wishlist: $wishlist) {\n      id\n    }\n  }\n'
): typeof import('./graphql').UpdateListDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ServerCollectionPageQuery($slug: String!) {\n    ...ServerCollectionPage\n    collection(slug: $slug) {\n      seo {\n        title\n        description\n      }\n      breadcrumbList {\n        itemListElement {\n          item\n          name\n          position\n        }\n      }\n      meta {\n        selectedFacets {\n          key\n          value\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ServerCollectionPageQueryDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ServerProductQuery($locator: [IStoreSelectedFacet!]!) {\n    ...ServerProduct\n    product(locator: $locator) {\n      id: productID\n\n      seo {\n        title\n        description\n        canonical\n      }\n\n      brand {\n        name\n      }\n\n      sku\n      gtin\n      name\n      description\n      releaseDate\n\n      breadcrumbList {\n        itemListElement {\n          item\n          name\n          position\n        }\n      }\n\n      image {\n        url\n        alternateName\n      }\n\n      offers {\n        lowPrice\n        highPrice\n        lowPriceWithTaxes\n        priceCurrency\n        offers {\n          availability\n          price\n          priceValidUntil\n          priceCurrency\n          itemCondition\n          seller {\n            identifier\n          }\n        }\n      }\n\n      isVariantOf {\n        productGroupID\n      }\n\n      ...ProductDetailsFragment_product\n    }\n  }\n'
): typeof import('./graphql').ServerProductQueryDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ValidateCartMutation($cart: IStoreCart!, $session: IStoreSession!) {\n    validateCart(cart: $cart, session: $session) {\n      order {\n        orderNumber\n        acceptedOffer {\n          ...CartItem\n        }\n      }\n      messages {\n        ...CartMessage\n      }\n    }\n  }\n\n  fragment CartMessage on StoreCartMessage {\n    text\n    status\n  }\n\n  fragment CartItem on StoreOffer {\n    seller {\n      identifier\n    }\n    quantity\n    price\n    priceWithTaxes\n    listPrice\n    listPriceWithTaxes\n    itemOffered {\n      ...CartProductItem\n    }\n  }\n\n  fragment CartProductItem on StoreProduct {\n    sku\n    name\n    unitMultiplier\n    image {\n      url\n      alternateName\n    }\n    brand {\n      name\n    }\n    isVariantOf {\n      productGroupID\n      name\n      skuVariants {\n        activeVariations\n        slugsMap\n        availableVariations\n      }\n    }\n    gtin\n    additionalProperty {\n      propertyID\n      name\n      value\n      valueReference\n    }\n  }\n'
): typeof import('./graphql').ValidateCartMutationDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SubscribeToNewsletter($data: IPersonNewsletter!) {\n    subscribeToNewsletter(data: $data) {\n      id\n    }\n  }\n'
): typeof import('./graphql').SubscribeToNewsletterDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ClientManyProductsQuery(\n    $first: Int!\n    $after: String\n    $sort: StoreSort!\n    $term: String!\n    $selectedFacets: [IStoreSelectedFacet!]!\n  ) {\n    ...ClientManyProducts\n    search(\n      first: $first\n      after: $after\n      sort: $sort\n      term: $term\n      selectedFacets: $selectedFacets\n    ) {\n      products {\n        pageInfo {\n          totalCount\n        }\n        edges {\n          node {\n            ...ProductSummary_product\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientManyProductsQueryDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ClientProductGalleryQuery(\n    $first: Int!\n    $after: String!\n    $sort: StoreSort!\n    $term: String!\n    $selectedFacets: [IStoreSelectedFacet!]!\n  ) {\n    ...ClientProductGallery\n    redirect(term: $term, selectedFacets: $selectedFacets) {\n      url\n    }\n    search(\n      first: $first\n      after: $after\n      sort: $sort\n      term: $term\n      selectedFacets: $selectedFacets\n    ) {\n      products {\n        pageInfo {\n          totalCount\n        }\n      }\n      facets {\n        ...Filter_facets\n      }\n      metadata {\n        ...SearchEvent_metadata\n      }\n    }\n  }\n\n  fragment SearchEvent_metadata on SearchMetadata {\n    isTermMisspelled\n    logicalOperator\n  }\n'
): typeof import('./graphql').ClientProductGalleryQueryDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ClientProductQuery($locator: [IStoreSelectedFacet!]!) {\n    ...ClientProduct\n    product(locator: $locator) {\n      ...ProductDetailsFragment_product\n    }\n  }\n'
): typeof import('./graphql').ClientProductQueryDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ClientSearchSuggestionsQuery(\n    $term: String!\n    $selectedFacets: [IStoreSelectedFacet!]\n  ) {\n    ...ClientSearchSuggestions\n    search(first: 5, term: $term, selectedFacets: $selectedFacets) {\n      suggestions {\n        terms {\n          value\n        }\n        products {\n          ...ProductSummary_product\n        }\n      }\n      products {\n        pageInfo {\n          totalCount\n        }\n      }\n      metadata {\n        ...SearchEvent_metadata\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientSearchSuggestionsQueryDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ClientTopSearchSuggestionsQuery(\n    $term: String!\n    $selectedFacets: [IStoreSelectedFacet!]\n  ) {\n    ...ClientTopSearchSuggestions\n    search(first: 5, term: $term, selectedFacets: $selectedFacets) {\n      suggestions {\n        terms {\n          value\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientTopSearchSuggestionsQueryDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ValidateSession($session: IStoreSession!, $search: String!) {\n    validateSession(session: $session, search: $search) {\n      locale\n      channel\n      country\n      addressType\n      postalCode\n      deliveryMode {\n        deliveryChannel\n        deliveryMethod\n        deliveryWindow {\n          startDate\n          endDate\n        }\n      }\n      geoCoordinates {\n        latitude\n        longitude\n      }\n      currency {\n        code\n        symbol\n      }\n      person {\n        id\n        email\n        givenName\n        familyName\n      }\n    }\n  }\n'
): typeof import('./graphql').ValidateSessionDocument
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ClientShippingSimulationQuery(\n    $postalCode: String!\n    $country: String!\n    $items: [IShippingItem!]!\n  ) {\n    ...ClientShippingSimulation\n    shipping(items: $items, postalCode: $postalCode, country: $country) {\n      logisticsInfo {\n        slas {\n          carrier\n          price\n          availableDeliveryWindows {\n            startDateUtc\n            endDateUtc\n            price\n            listPrice\n          }\n          shippingEstimate\n          localizedEstimates\n        }\n      }\n      address {\n        city\n        neighborhood\n        state\n      }\n    }\n  }\n'
): typeof import('./graphql').ClientShippingSimulationQueryDocument

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}
