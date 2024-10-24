/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /**
   * Example:
   *
   * ```json
   * {
   *   Color: 'Red', Size: '42'
   * }
   * ```
   */
  ActiveVariations: { input: any; output: any }
  ActiveVariationsV2: { input: any; output: any }
  AvailableVariationsV2: { input: any; output: any }
  Data: { input: any; output: any }
  /**
   * Example:
   *
   * ```json
   * {
   *   Color: [
   *     {
   *       src: "https://storecomponents.vtexassets.com/...",
   *       alt: "...",
   *       label: "...",
   *       value: "..."
   *     },
   *     {
   *       src: "https://storecomponents.vtexassets.com/...",
   *       alt: "...",
   *       label: "...",
   *       value: "..."
   *     }
   *   ],
   *   Size: [
   *     {
   *       src: "https://storecomponents.vtexassets.com/...",
   *       alt: "...",
   *       label: "...",
   *       value: "..."
   *     }
   *   ]
   * }
   * ```
   */
  FormattedVariants: { input: any; output: any }
  InputValues: { input: any; output: any }
  ItemAdditionalPropertyValueReferenceV2: { input: any; output: any }
  ItemAdditionalPropertyValueV2: { input: any; output: any }
  ObjectOrString: { input: any; output: any }
  /**
   * Example:
   *
   * ```json
   * {
   *   'Color-Red-Size-40': 'classic-shoes-37'
   * }
   * ```
   */
  SlugsMap: { input: any; output: any }
  SlugsMapV2: { input: any; output: any }
  TimestampV2: { input: any; output: any }
  VariantListItemV2: { input: any; output: any }
  /**
   * Example:
   *
   * ```json
   * {
   *   Color: [ "Red", "Blue", "Green" ],
   *   Size: [ "40", "41" ]
   * }
   * ```
   */
  VariantsByName: { input: any; output: any }
}

export type AdditionalPropertyInputV2 = {
  name: InputMaybe<Scalars['String']['input']>
  propertyID: InputMaybe<Scalars['String']['input']>
  value: InputMaybe<Scalars['ItemAdditionalPropertyValueV2']['input']>
  valueReference: InputMaybe<
    Scalars['ItemAdditionalPropertyValueReferenceV2']['input']
  >
}

export type AdditionalPropertyV2 = {
  name: Maybe<Scalars['String']['output']>
  propertyID: Maybe<Scalars['String']['output']>
  value: Maybe<Scalars['ItemAdditionalPropertyValueV2']['output']>
  valueReference: Maybe<
    Scalars['ItemAdditionalPropertyValueReferenceV2']['output']
  >
}

/** Address information. */
export type Address = {
  addressId: Maybe<Scalars['String']['output']>
  addressQuery: Maybe<Scalars['String']['output']>
  addressType: Maybe<Scalars['String']['output']>
  /** Address city */
  city: Maybe<Scalars['String']['output']>
  /** Address complement */
  complement: Maybe<Scalars['String']['output']>
  /** Address country */
  country: Maybe<Scalars['String']['output']>
  /** Address geoCoordinates */
  geoCoordinates: Maybe<Array<Maybe<Scalars['Float']['output']>>>
  /** Address neighborhood */
  neighborhood: Maybe<Scalars['String']['output']>
  /** Address number */
  number: Maybe<Scalars['String']['output']>
  /** Address postal code */
  postalCode: Maybe<Scalars['String']['output']>
  receiverName: Maybe<Scalars['String']['output']>
  /** Address reference */
  reference: Maybe<Scalars['String']['output']>
  /** Address state */
  state: Maybe<Scalars['String']['output']>
  /** Address street */
  street: Maybe<Scalars['String']['output']>
}

export type AddressInput = {
  addressId: InputMaybe<Scalars['String']['input']>
  addressQuery: InputMaybe<Scalars['String']['input']>
  addressType: InputMaybe<Scalars['String']['input']>
  city: InputMaybe<Scalars['String']['input']>
  complement: InputMaybe<Scalars['String']['input']>
  country: InputMaybe<Scalars['String']['input']>
  geoCoordinates: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  neighborhood: InputMaybe<Scalars['String']['input']>
  number: InputMaybe<Scalars['String']['input']>
  postalCode: InputMaybe<Scalars['String']['input']>
  receiverName: InputMaybe<Scalars['String']['input']>
  reference: InputMaybe<Scalars['String']['input']>
  state: InputMaybe<Scalars['String']['input']>
  street: InputMaybe<Scalars['String']['input']>
}

export type AssemblyOption = {
  composition: Maybe<Composition>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  required: Scalars['Boolean']['output']
}

export type AssemblyOptionInput = {
  assemblyId: Scalars['String']['input']
  id: InputMaybe<Scalars['ID']['input']>
  inputValues: InputMaybe<Scalars['InputValues']['input']>
  quantity: InputMaybe<Scalars['Int']['input']>
  seller: InputMaybe<Scalars['String']['input']>
}

export type AvailableDeliveryWindows = {
  /** Available delivery window end date in UTC */
  endDateUtc: Maybe<Scalars['String']['output']>
  /** Available delivery window list price */
  listPrice: Maybe<Scalars['Int']['output']>
  /** Available delivery window price */
  price: Maybe<Scalars['Int']['output']>
  /** Available delivery window start date in UTC */
  startDateUtc: Maybe<Scalars['String']['output']>
  /** Available delivery window tax */
  tax: Maybe<Scalars['Int']['output']>
}

export type B2BCollection = {
  id: Maybe<Scalars['String']['output']>
  name: Maybe<Scalars['String']['output']>
}

export type B2BOrganization = {
  clId: Maybe<Scalars['ID']['output']>
  costCenterName: Maybe<Scalars['String']['output']>
  costId: Maybe<Scalars['ID']['output']>
  id: Maybe<Scalars['ID']['output']>
  orgId: Maybe<Scalars['ID']['output']>
  organizationName: Maybe<Scalars['String']['output']>
  organizationStatus: Maybe<Scalars['String']['output']>
  role: Maybe<SimpleRole>
  roleId: Maybe<Scalars['ID']['output']>
}

export type B2BSettings = {
  autoApprove: Maybe<Scalars['Boolean']['output']>
  businessReadOnly: Maybe<Scalars['Boolean']['output']>
  costCenterCustomFields: Maybe<Array<Maybe<SettingsCustomField>>>
  defaultPaymentTerms: Maybe<Array<Maybe<PaymentTerm>>>
  defaultPriceTables: Maybe<Array<Maybe<Scalars['String']['output']>>>
  organizationCustomFields: Maybe<Array<Maybe<SettingsCustomField>>>
  stateReadOnly: Maybe<Scalars['Boolean']['output']>
  transactionEmailSettings: Maybe<TransactionEmailSettings>
  uiSettings: Maybe<UiSettings>
}

export type B2BSettingsInput = {
  autoApprove: InputMaybe<Scalars['Boolean']['input']>
  businessReadOnly: InputMaybe<Scalars['Boolean']['input']>
  costCenterCustomFields: InputMaybe<Array<InputMaybe<CustomFieldInput>>>
  defaultPaymentTerms: InputMaybe<Array<InputMaybe<PaymentTermInput>>>
  defaultPriceTables: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  organizationCustomFields: InputMaybe<Array<InputMaybe<CustomFieldInput>>>
  stateReadOnly: InputMaybe<Scalars['Boolean']['input']>
  transactionEmailSettings: InputMaybe<TransactionEmailSettingsInput>
  uiSettings: InputMaybe<UiSettingsInput>
}

export type B2BUser = {
  canImpersonate: Maybe<Scalars['Boolean']['output']>
  clId: Maybe<Scalars['ID']['output']>
  costCenterName: Maybe<Scalars['String']['output']>
  costId: Maybe<Scalars['ID']['output']>
  email: Scalars['String']['output']
  id: Maybe<Scalars['ID']['output']>
  name: Scalars['String']['output']
  orgId: Maybe<Scalars['ID']['output']>
  organizationName: Maybe<Scalars['String']['output']>
  role: Maybe<SimpleRole>
  roleId: Maybe<Scalars['ID']['output']>
  userId: Maybe<Scalars['ID']['output']>
}

export type B2BUserInput = {
  email: InputMaybe<Scalars['String']['input']>
  firstName: InputMaybe<Scalars['String']['input']>
  lastName: InputMaybe<Scalars['String']['input']>
}

export type B2BUserPagination = {
  data: Maybe<Array<Maybe<B2BUser>>>
  pagination: Maybe<Pagination>
}

export type B2BUserSimple = {
  email: Maybe<Scalars['String']['output']>
  firstName: Maybe<Scalars['String']['output']>
  lastName: Maybe<Scalars['String']['output']>
}

export type Banner = {
  html: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  name: Maybe<Scalars['String']['output']>
}

export type Brand = {
  id: Scalars['Int']['output']
  name: Scalars['String']['output']
}

export type BrandInputV2 = {
  name: InputMaybe<Scalars['String']['input']>
}

export type BrandV2 = {
  name: Maybe<Scalars['String']['output']>
}

export type CartInputV2 = {
  id: InputMaybe<Scalars['ID']['input']>
  items: InputMaybe<Array<InputMaybe<CartItemInputV2>>>
  messages: InputMaybe<Array<InputMaybe<CartMessageInputV2>>>
}

export type CartItemInputV2 = {
  id: InputMaybe<Scalars['String']['input']>
  itemOffered: InputMaybe<OfferedItemInputV2>
  listPrice: InputMaybe<Scalars['Float']['input']>
  listPriceWithTaxes: InputMaybe<Scalars['Float']['input']>
  price: InputMaybe<Scalars['Float']['input']>
  priceWithTaxes: InputMaybe<Scalars['Float']['input']>
  quantity: InputMaybe<Scalars['Int']['input']>
  seller: InputMaybe<CartSellerInputV2>
  timestamp: InputMaybe<Scalars['TimestampV2']['input']>
}

export type CartItemIsVariantOfInputV2 = {
  additionalProperty: InputMaybe<Array<InputMaybe<AdditionalPropertyInputV2>>>
  fullVariantList: InputMaybe<
    Array<InputMaybe<Scalars['VariantListItemV2']['input']>>
  >
  name: InputMaybe<Scalars['String']['input']>
  productGroupID: InputMaybe<Scalars['String']['input']>
  skuVariants: InputMaybe<SkuVariantInputV2>
}

export type CartItemIsVariantOfV2 = {
  name: Maybe<Scalars['String']['output']>
  productGroupID: Maybe<Scalars['String']['output']>
  skuVariants: Maybe<SkuVariantV2>
}

export type CartItemV2 = {
  id: Maybe<Scalars['String']['output']>
  itemOffered: Maybe<OfferedItemV2>
  listPrice: Maybe<Scalars['Float']['output']>
  listPriceWithTaxes: Maybe<Scalars['Float']['output']>
  price: Maybe<Scalars['Float']['output']>
  priceWithTaxes: Maybe<Scalars['Float']['output']>
  quantity: Maybe<Scalars['Int']['output']>
  seller: Maybe<CartSellerV2>
  timestamp: Maybe<Scalars['TimestampV2']['output']>
}

export type CartMessageInputV2 = {
  status: InputMaybe<Scalars['String']['input']>
  text: InputMaybe<Scalars['String']['input']>
}

export type CartMessageV2 = {
  status: Maybe<Scalars['String']['output']>
  text: Maybe<Scalars['String']['output']>
}

export type CartSellerInputV2 = {
  identifier: InputMaybe<Scalars['String']['input']>
}

export type CartSellerV2 = {
  identifier: Maybe<Scalars['String']['output']>
}

export type CartV2 = {
  id: Maybe<Scalars['ID']['output']>
  items: Maybe<Array<Maybe<CartItemV2>>>
  messages: Maybe<Array<Maybe<CartMessageV2>>>
}

export type CartWithRevision = {
  cart: Maybe<CartV2>
  cartSerialized: Maybe<Scalars['String']['output']>
  revision: Maybe<Scalars['Int']['output']>
}

export type CategoryTree = {
  MetaTagDescription: Scalars['String']['output']
  Title: Scalars['String']['output']
  children: Array<CategoryTree>
  hasChildren: Scalars['Boolean']['output']
  id: Scalars['Int']['output']
  name: Scalars['String']['output']
  url: Scalars['String']['output']
}

export type Channels = {
  id: Maybe<Scalars['String']['output']>
  name: Maybe<Scalars['String']['output']>
}

export type Collection = {
  id: Scalars['Int']['output']
  name: Scalars['String']['output']
  slug: Scalars['String']['output']
  totalProducts: Scalars['Int']['output']
}

export type CollectionDetails = {
  DateFrom: Scalars['Boolean']['output']
  DateTo: Scalars['Boolean']['output']
  Description: Maybe<Scalars['String']['output']>
  Highlight: Scalars['Boolean']['output']
  Id: Scalars['Int']['output']
  Name: Scalars['String']['output']
  Searchable: Scalars['Boolean']['output']
  TotalProducts: Scalars['Int']['output']
  Type: Scalars['String']['output']
}

export type CollectionInput = {
  id: InputMaybe<Scalars['String']['input']>
  name: InputMaybe<Scalars['String']['input']>
}

export type CollectionNameResponse = {
  Name: Maybe<Scalars['String']['output']>
}

export type Composition = {
  items: Array<CompositionItem>
  maxQuantity: Scalars['Int']['output']
  minQuantity: Scalars['Int']['output']
}

export type CompositionItem = {
  gtin: Scalars['String']['output']
  id: Scalars['ID']['output']
  initialQuantity: Scalars['Int']['output']
  maxQuantity: Scalars['Int']['output']
  minQuantity: Scalars['Int']['output']
  priceTable: Maybe<Scalars['String']['output']>
  seller: Maybe<Scalars['String']['output']>
}

export type CostCenter = {
  addresses: Maybe<Array<Maybe<Address>>>
  businessDocument: Maybe<Scalars['String']['output']>
  customFields: Maybe<Array<Maybe<CustomField>>>
  id: Maybe<Scalars['ID']['output']>
  name: Maybe<Scalars['String']['output']>
  organization: Maybe<Scalars['ID']['output']>
  paymentTerms: Maybe<Array<Maybe<PaymentTerm>>>
  phoneNumber: Maybe<Scalars['String']['output']>
  sellers: Maybe<Array<Maybe<Seller>>>
  stateRegistration: Maybe<Scalars['String']['output']>
}

export type CostCenterInput = {
  addresses: InputMaybe<Array<InputMaybe<AddressInput>>>
  businessDocument: InputMaybe<Scalars['String']['input']>
  customFields: InputMaybe<Array<InputMaybe<CustomFieldInput>>>
  id: InputMaybe<Scalars['String']['input']>
  name: InputMaybe<Scalars['String']['input']>
  paymentTerms: InputMaybe<Array<InputMaybe<PaymentTermInput>>>
  phoneNumber: InputMaybe<Scalars['String']['input']>
  stateRegistration: InputMaybe<Scalars['String']['input']>
}

export type CostCenterResult = {
  data: Maybe<Array<Maybe<CostCenter>>>
  pagination: Maybe<Pagination>
}

export type CreateOrganizationErpInput = {
  ACCOUNT_NAME: InputMaybe<Scalars['String']['input']>
  ACCOUNT_TYPE: InputMaybe<Scalars['String']['input']>
  ADDRESS: InputMaybe<Scalars['String']['input']>
  ATTENTION: InputMaybe<Scalars['String']['input']>
  CITY: InputMaybe<Scalars['String']['input']>
  COUNTRY: InputMaybe<Scalars['String']['input']>
  CUSTOMER_CLASSIFICATION: InputMaybe<Scalars['String']['input']>
  CUSTOMER_ROLE: InputMaybe<Scalars['String']['input']>
  ORGANIZATION_DETAIL: InputMaybe<Scalars['String']['input']>
  PARENT_ID: InputMaybe<Scalars['String']['input']>
  PHONE_NUMBER: InputMaybe<Scalars['String']['input']>
  POSTAL_CODE: InputMaybe<Scalars['String']['input']>
  STATE_PROVINCE: InputMaybe<Scalars['String']['input']>
  VTEX_ID: InputMaybe<Scalars['String']['input']>
}

export type CreateOrganizationErpResponse = {
  message: Maybe<Scalars['String']['output']>
  requestId: Maybe<Scalars['String']['output']>
}

export type CustomApp = {
  fields: Array<Fields>
  id: Scalars['String']['output']
  major: Scalars['Int']['output']
}

export type CustomData = {
  customApps: Array<CustomApp>
}

export type CustomField = {
  dropdownValues: Maybe<Array<Maybe<DropdownValue>>>
  name: Maybe<Scalars['String']['output']>
  type: Maybe<CustomFieldType>
  useOnRegistration: Maybe<Scalars['Boolean']['output']>
  value: Maybe<Scalars['String']['output']>
}

export type CustomFieldInput = {
  dropdownValues: InputMaybe<Array<InputMaybe<DropdownValueInput>>>
  name: Scalars['String']['input']
  type: CustomFieldType
  useOnRegistration: InputMaybe<Scalars['Boolean']['input']>
  value: InputMaybe<Scalars['String']['input']>
}

export type CustomFieldType = 'dropdown' | 'text'

export type DateRange = {
  from: Maybe<Scalars['String']['output']>
  to: Maybe<Scalars['String']['output']>
}

export type DefaultCostCenter = {
  address: Maybe<Address>
  businessDocument: Maybe<Scalars['String']['output']>
  customFields: Maybe<Array<Maybe<CustomField>>>
  name: Maybe<Scalars['String']['output']>
  phoneNumber: Maybe<Scalars['String']['output']>
  sellers: Maybe<Array<Maybe<Seller>>>
  stateRegistration: Maybe<Scalars['String']['output']>
}

export type DefaultCostCenterInput = {
  address: InputMaybe<AddressInput>
  businessDocument: InputMaybe<Scalars['String']['input']>
  customFields: InputMaybe<Array<InputMaybe<CustomFieldInput>>>
  id: InputMaybe<Scalars['String']['input']>
  marketingTags: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  name: InputMaybe<Scalars['String']['input']>
  paymentTerms: InputMaybe<Array<InputMaybe<PaymentTermInput>>>
  phoneNumber: InputMaybe<Scalars['String']['input']>
  sellers: InputMaybe<Array<InputMaybe<SellerInput>>>
  stateRegistration: InputMaybe<Scalars['String']['input']>
  user: InputMaybe<B2BUserInput>
}

export type DeleteWishlistResponse = {
  id: Maybe<Scalars['String']['output']>
  success: Maybe<Scalars['Boolean']['output']>
}

export type DeliveryIds = {
  /** DeliveryIds courier id */
  courierId: Maybe<Scalars['String']['output']>
  /** DeliveryIds courier name */
  courierName: Maybe<Scalars['String']['output']>
  /** DeliveryIds dock id */
  dockId: Maybe<Scalars['String']['output']>
  /** DeliveryIds quantity */
  quantity: Maybe<Scalars['Int']['output']>
  /** DeliveryIds warehouse id */
  warehouseId: Maybe<Scalars['String']['output']>
}

export type DepartmentBanner = {
  banners: Maybe<Array<Maybe<Banner>>>
}

export type DocumentCreatedResponse = {
  DocumentId: Maybe<Scalars['String']['output']>
  Href: Maybe<Scalars['String']['output']>
  Id: Maybe<Scalars['String']['output']>
}

export type DropdownValue = {
  label: Maybe<Scalars['String']['output']>
  value: Maybe<Scalars['String']['output']>
}

export type DropdownValueInput = {
  label: InputMaybe<Scalars['String']['input']>
  value: InputMaybe<Scalars['String']['input']>
}

export type Feature = {
  features: Array<Maybe<Scalars['String']['output']>>
  module: Scalars['String']['output']
  name: Scalars['String']['output']
}

export type FeatureInput = {
  features: Array<InputMaybe<Scalars['String']['input']>>
  module: Scalars['String']['input']
}

export type FeatureType = {
  features: Array<Maybe<Scalars['String']['output']>>
  module: Scalars['String']['output']
}

export type Fields = {
  key: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type FieldsConfig = {
  department: Maybe<Scalars['String']['output']>
  description: Maybe<Scalars['String']['output']>
}

export type FieldsConfigInput = {
  department: InputMaybe<Scalars['String']['input']>
  description: InputMaybe<Scalars['String']['input']>
}

export type FixedPrices = {
  dateRange: Maybe<DateRange>
  listPrice: Maybe<Scalars['Float']['output']>
  minQuantity: Maybe<Scalars['Int']['output']>
  tradePolicyId: Maybe<Scalars['String']['output']>
  value: Maybe<Scalars['Float']['output']>
}

export type FullFeature = {
  features: Array<Maybe<SingleFeature>>
  module: Scalars['String']['output']
  name: Scalars['String']['output']
}

export type IGeoCoordinates = {
  /** The latitude of the geographic coordinates. */
  latitude: Scalars['Float']['input']
  /** The longitude of the geographic coordinates. */
  longitude: Scalars['Float']['input']
}

/** Person data input to the newsletter. */
export type IPersonNewsletter = {
  /** Person's email. */
  email: Scalars['String']['input']
  /** Person's name. */
  name: Scalars['String']['input']
}

/** Shipping Simulation item input. */
export type IShippingItem = {
  /** ShippingItem ID / Sku. */
  id: Scalars['String']['input']
  /** Number of items. */
  quantity: Scalars['Int']['input']
  /** Seller responsible for the ShippingItem. */
  seller: Scalars['String']['input']
}

/** Shopping cart input. */
export type IStoreCart = {
  /** Order information, including `orderNumber`, `acceptedOffer` and `shouldSplitItem`. */
  order: IStoreOrder
}

export type IStoreCurrency = {
  /** Currency code (e.g: USD). */
  code: Scalars['String']['input']
  /** Currency symbol (e.g: $). */
  symbol: Scalars['String']['input']
}

export type IStoreDeliveryMode = {
  /** The delivery channel information of the session. */
  deliveryChannel: Scalars['String']['input']
  /** The delivery method information of the session. */
  deliveryMethod: Scalars['String']['input']
  /** The delivery window information of the session. */
  deliveryWindow: InputMaybe<IStoreDeliveryWindow>
}

/** Delivery window information. */
export type IStoreDeliveryWindow = {
  /** The delivery window end date information. */
  endDate: Scalars['String']['input']
  /** The delivery window start date information. */
  startDate: Scalars['String']['input']
}

export type IStoreGeoCoordinates = {
  /** The latitude of the geographic coordinates. */
  latitude: Scalars['Float']['input']
  /** The longitude of the geographic coordinates. */
  longitude: Scalars['Float']['input']
}

/** Image input. */
export type IStoreImage = {
  /** Alias for the input image. */
  alternateName: Scalars['String']['input']
  /** Image input URL. */
  url: Scalars['String']['input']
}

/** Offer input. */
export type IStoreOffer = {
  /** Information on the item being offered. */
  itemOffered: IStoreProduct
  /** This is displayed as the "from" price in the context of promotions' price comparison. This may change before it reaches the shelf. */
  listPrice: Scalars['Float']['input']
  /** Also known as spot price. */
  price: Scalars['Float']['input']
  /** Number of items offered. */
  quantity: Scalars['Int']['input']
  /** Seller responsible for the offer. */
  seller: IStoreOrganization
}

/** Order input. */
export type IStoreOrder = {
  /** Array with information on each accepted offer. */
  acceptedOffer: Array<IStoreOffer>
  /** ID of the order in [VTEX order management](https://help.vtex.com/en/tutorial/license-manager-resources-oms--60QcBsvWeum02cFi3GjBzg#). */
  orderNumber: Scalars['String']['input']
  /** Indicates whether or not items with attachments should be split. */
  shouldSplitItem: InputMaybe<Scalars['Boolean']['input']>
}

/** Organization input. */
export type IStoreOrganization = {
  /** Organization ID. */
  identifier: Scalars['String']['input']
}

/** Client profile data. */
export type IStorePerson = {
  /** Client email. */
  email: Scalars['String']['input']
  /** Client last name. */
  familyName: Scalars['String']['input']
  /** Client first name. */
  givenName: Scalars['String']['input']
  /** Client ID. */
  id: Scalars['String']['input']
}

/** Product input. Products are variants within product groups, equivalent to VTEX [SKUs](https://help.vtex.com/en/tutorial/what-is-an-sku--1K75s4RXAQyOuGUYKMM68u#). For example, you may have a **Shirt** product group with associated products such as **Blue shirt size L**, **Green shirt size XL** and so on. */
export type IStoreProduct = {
  /** Custom Product Additional Properties. */
  additionalProperty: InputMaybe<Array<IStorePropertyValue>>
  /** Array of product images. */
  image: Array<IStoreImage>
  /** Product name. */
  name: Scalars['String']['input']
  /** Stock Keeping Unit. Merchant-specific ID for the product. */
  sku: Scalars['String']['input']
}

export type IStorePropertyValue = {
  /** Property name. */
  name: Scalars['String']['input']
  /** Property id. This propert changes according to the content of the object. */
  propertyID: InputMaybe<Scalars['String']['input']>
  /** Property value. May hold a string or the string representation of an object. */
  value: Scalars['ObjectOrString']['input']
  /** Specifies the nature of the value */
  valueReference: Scalars['ObjectOrString']['input']
}

/** Selected search facet input. */
export type IStoreSelectedFacet = {
  /** Selected search facet key. */
  key: Scalars['String']['input']
  /** Selected search facet value. */
  value: Scalars['String']['input']
}

/** Session input. */
export type IStoreSession = {
  /** Session input address type. */
  addressType: InputMaybe<Scalars['String']['input']>
  /** Session input channel. */
  channel: InputMaybe<Scalars['String']['input']>
  /** Session input country. */
  country: Scalars['String']['input']
  /** Session input currency. */
  currency: IStoreCurrency
  /** Session input delivery mode. */
  deliveryMode: InputMaybe<IStoreDeliveryMode>
  /** Session input geoCoordinates. */
  geoCoordinates: InputMaybe<IStoreGeoCoordinates>
  /** Session input locale. */
  locale: Scalars['String']['input']
  /** Session input person. */
  person: InputMaybe<IStorePerson>
  /** Session input postal code. */
  postalCode: InputMaybe<Scalars['String']['input']>
}

export type Inventory = {
  /** QTY in warehouse, excluding reserved */
  availableQuantity: Scalars['Int']['output']
  /** Infinite inventory - ignore availableQuantity if this is true */
  hasUnlimitedQuantity: Scalars['Boolean']['output']
  /** Warehouse where the inventory is located */
  warehouse: Warehouse
}

export type Item = {
  id: Scalars['String']['output']
  listPrice: Scalars['Int']['output']
  parentAssemblyBinding: Maybe<Scalars['String']['output']>
  parentItemIndex: Maybe<Scalars['Int']['output']>
  quantity: Scalars['Int']['output']
  seller: Scalars['String']['output']
  sellingPrice: Scalars['Int']['output']
  skuName: Scalars['String']['output']
}

export type ItemInput = {
  id: InputMaybe<Scalars['Int']['input']>
  inputValues: InputMaybe<Scalars['InputValues']['input']>
  options: InputMaybe<Array<InputMaybe<AssemblyOptionInput>>>
  quantity: InputMaybe<Scalars['Float']['input']>
  seller: InputMaybe<Scalars['ID']['input']>
  uniqueId: InputMaybe<Scalars['String']['input']>
}

export type List = {
  collectionId: Maybe<Scalars['Int']['output']>
  level1Label: Maybe<Scalars['String']['output']>
  level1Value: Maybe<Scalars['String']['output']>
  level2Label: Maybe<Scalars['String']['output']>
  level2Value: Maybe<Scalars['String']['output']>
  region: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  type: Maybe<Scalars['String']['output']>
}

export type LiturgicalCalendar = {
  calendar: Maybe<Scalars['String']['output']>
  date: Maybe<Scalars['String']['output']>
  dateTitle: Maybe<Scalars['String']['output']>
  season: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  type: Maybe<Scalars['String']['output']>
  year: Maybe<Scalars['String']['output']>
}

export type LogisticsInfo = {
  /** LogisticsInfo itemIndex. */
  itemIndex: Maybe<Scalars['String']['output']>
  /** LogisticsInfo selectedSla. */
  selectedSla: Maybe<Scalars['String']['output']>
  /** List of LogisticsInfo ShippingSLA. */
  slas: Maybe<Array<Maybe<ShippingSla>>>
}

/** Shipping Simulation Logistic Item. */
export type LogisticsItem = {
  /** LogisticsItem availability. */
  availability: Maybe<Scalars['String']['output']>
  /** LogisticsItem ID / Sku. */
  id: Maybe<Scalars['String']['output']>
  /** LogisticsItem listPrice. */
  listPrice: Maybe<Scalars['Int']['output']>
  /** LogisticsItem measurementUnit. */
  measurementUnit: Maybe<Scalars['String']['output']>
  /** LogisticsItem price. */
  price: Maybe<Scalars['Int']['output']>
  /** Next date in which price is scheduled to change. If there is no scheduled change, this will be set a year in the future from current time. */
  priceValidUntil: Maybe<Scalars['String']['output']>
  /** Number of items. */
  quantity: Maybe<Scalars['Int']['output']>
  requestIndex: Maybe<Scalars['Int']['output']>
  /** LogisticsItem rewardValue. */
  rewardValue: Maybe<Scalars['Int']['output']>
  /** Seller responsible for the ShippingItem. */
  seller: Maybe<Scalars['String']['output']>
  /** List of Sellers. */
  sellerChain: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** LogisticsItem sellingPrice. */
  sellingPrice: Maybe<Scalars['Int']['output']>
  /** LogisticsItem tax. */
  tax: Maybe<Scalars['Int']['output']>
  /** LogisticsItem unitMultiplier. */
  unitMultiplier: Maybe<Scalars['Int']['output']>
}

export type MarketingData = {
  utmCampaign: Maybe<Scalars['String']['output']>
  utmMedium: Maybe<Scalars['String']['output']>
}

export type MarketingTags = {
  tags: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type MasterDataResponse = {
  href: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  status: Maybe<Scalars['String']['output']>
}

export type MenuItem = {
  altText: Maybe<Scalars['String']['output']>
  ctaText: Maybe<Scalars['String']['output']>
  iconUrl: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  imageUrl: Maybe<Scalars['String']['output']>
  parentId: Maybe<Scalars['String']['output']>
  position: Scalars['Int']['output']
  title: Scalars['String']['output']
  type: Scalars['String']['output']
  url: Maybe<Scalars['String']['output']>
}

export type MessageFields = {
  /** MessageFields ean. */
  ean: Maybe<Scalars['String']['output']>
  /** MessageFields item index. */
  itemIndex: Maybe<Scalars['String']['output']>
  /** MessageFields sku name. */
  skuName: Maybe<Scalars['String']['output']>
}

export type MessageInfo = {
  /** MessageInfo code. */
  code: Maybe<Scalars['String']['output']>
  /** MessageInfo fields. */
  fields: Maybe<MessageFields>
  /** MessageInfo status. */
  status: Maybe<Scalars['String']['output']>
  /** MessageInfo text. */
  text: Maybe<Scalars['String']['output']>
}

export type Mutation = {
  addCostCenterToUser: Maybe<MutationResponse>
  addExtraParts: Maybe<Scalars['Boolean']['output']>
  addFolderImprinting: Maybe<Scalars['Boolean']['output']>
  addOrganizationToUser: Maybe<MutationResponse>
  addToCart: Maybe<StoreCart>
  /**
   * addUser will create an user with the provided parameters.
   * This is called either from the Admin UI or the storefront UI (where
   * the buyer org manager/admin can add a new member to its own org/cost center).
   * Although the mutation allows an id/userId/clId to be provided, these are not
   * exposed/collected on the UIs.
   */
  addUser: Maybe<MutationResponse>
  createCostCenter: Maybe<MasterDataResponse>
  createCostCenterAddress: Maybe<MutationResponse>
  createCostCenterWithId: Maybe<MasterDataResponse>
  createOrganization: Maybe<OrganizationCostCenterResponse>
  createOrganizationAndCostCentersWithId: Maybe<MasterDataResponse>
  createOrganizationERP: Maybe<CreateOrganizationErpResponse>
  createOrganizationRequest: Maybe<MasterDataResponse>
  /**
   * createUserWithEmail is a simplified version of addUser. Both
   * mutations will create an user for the org/cost center,
   * but createUserWithEmail expect all fields (except canImpersonate) as
   * required and does not allow the user to provide its own id/userId/clId,
   * which will be automatically created by the mutation. In this case, the
   * email is clearly used as an identifier for the user. This is currently
   * used by the bulk import use case, but could be used by other use cases
   * as well. This function also has stricter permissions to be used by the
   * store admin only, but could have less strict permissions in the future.
   */
  createUserWithEmail: Maybe<MutationResponse>
  /** Create a new wishlist */
  createWishlist: Maybe<DocumentCreatedResponse>
  deleteCostCenter: Maybe<MutationResponse>
  deleteOrganization: Maybe<MutationResponse>
  deleteOrganizationRequest: Maybe<MutationResponse>
  deleteRole: Maybe<MutationResponse>
  deleteUser: Maybe<MutationResponse>
  /** Delete a wishlist */
  deleteWishlist: Maybe<DeleteWishlistResponse>
  ignoreB2BSessionData: Maybe<MutationResponse>
  impersonateB2BUser: Maybe<MutationResponse>
  /** @deprecated Use impersonateB2BUser instead */
  impersonateUser: Maybe<MutationResponse>
  removeExtraParts: Maybe<Scalars['Boolean']['output']>
  removeFolderImprinting: Maybe<Scalars['Boolean']['output']>
  removeFromCart: Scalars['Boolean']['output']
  removeUser: Maybe<MutationResponse>
  removeUserWithEmail: Maybe<MutationResponse>
  saveAppSettings: Maybe<MutationResponse>
  saveB2BSettings: Maybe<MutationResponse>
  saveRole: Maybe<MutationResponse>
  saveSalesChannels: Maybe<MutationResponse>
  saveUser: Maybe<MutationResponse>
  sessionWatcher: Maybe<Scalars['Boolean']['output']>
  setActiveUserByOrganization: Maybe<MutationResponse>
  setCurrentOrganization: Maybe<MutationResponse>
  setMarketingTags: Maybe<MutationResponse>
  subscribeNewsletter: Maybe<Scalars['Boolean']['output']>
  /** Subscribes a new person to the newsletter list. */
  subscribeToNewsletter: Maybe<PersonNewsletter>
  syncPersistedCart: Maybe<CartWithRevision>
  updateCostCenter: Maybe<MutationResponse>
  updateCostCenterAddress: Maybe<MutationResponse>
  updateOrganization: Maybe<MutationResponse>
  updateOrganizationRequest: Maybe<MutationResponse>
  updateUser: Maybe<MutationResponse>
  /** Update a existing wishlist */
  updateWishlist: Maybe<UpdateWishlistResponse>
  /** Checks for changes between the cart presented in the UI and the cart stored in the ecommerce platform. If changes are detected, it returns the cart stored on the platform. Otherwise, it returns `null`. */
  validateCart: Maybe<StoreCart>
  /** Updates a web session with the specified values. */
  validateSession: Maybe<StoreSession>
}

export type MutationAddCostCenterToUserArgs = {
  costId: Scalars['ID']['input']
  userId: Scalars['ID']['input']
}

export type MutationAddExtraPartsArgs = {
  extraOrderData: Scalars['String']['input']
}

export type MutationAddFolderImprintingArgs = {
  data: Scalars['String']['input']
}

export type MutationAddOrganizationToUserArgs = {
  costId: Scalars['ID']['input']
  orgId: Scalars['ID']['input']
  roleId: InputMaybe<Scalars['ID']['input']>
  userId: Scalars['ID']['input']
}

export type MutationAddToCartArgs = {
  items: Array<ItemInput>
}

export type MutationAddUserArgs = {
  canImpersonate?: InputMaybe<Scalars['Boolean']['input']>
  clId: InputMaybe<Scalars['ID']['input']>
  costId: InputMaybe<Scalars['ID']['input']>
  email: Scalars['String']['input']
  id: InputMaybe<Scalars['ID']['input']>
  name: Scalars['String']['input']
  orgId: InputMaybe<Scalars['ID']['input']>
  roleId: Scalars['ID']['input']
  userId: InputMaybe<Scalars['ID']['input']>
}

export type MutationCreateCostCenterArgs = {
  input: CostCenterInput
  organizationId: InputMaybe<Scalars['ID']['input']>
}

export type MutationCreateCostCenterAddressArgs = {
  address: InputMaybe<AddressInput>
  costCenterId: InputMaybe<Scalars['ID']['input']>
}

export type MutationCreateCostCenterWithIdArgs = {
  input: CostCenterInput
  organizationId: InputMaybe<Scalars['ID']['input']>
}

export type MutationCreateOrganizationArgs = {
  input: OrganizationInput
  notifyUsers: InputMaybe<Scalars['Boolean']['input']>
}

export type MutationCreateOrganizationAndCostCentersWithIdArgs = {
  input: NormalizedOrganizationInput
}

export type MutationCreateOrganizationErpArgs = {
  input: InputMaybe<CreateOrganizationErpInput>
}

export type MutationCreateOrganizationRequestArgs = {
  input: OrganizationInput
  notifyUsers: InputMaybe<Scalars['Boolean']['input']>
}

export type MutationCreateUserWithEmailArgs = {
  canImpersonate?: InputMaybe<Scalars['Boolean']['input']>
  costId: Scalars['ID']['input']
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  orgId: Scalars['ID']['input']
  roleId: Scalars['ID']['input']
}

export type MutationCreateWishlistArgs = {
  wishlist: WishlistInput
}

export type MutationDeleteCostCenterArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteOrganizationArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteOrganizationRequestArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteUserArgs = {
  email: Scalars['String']['input']
  id: Scalars['ID']['input']
  userId: InputMaybe<Scalars['ID']['input']>
}

export type MutationDeleteWishlistArgs = {
  id: Scalars['ID']['input']
}

export type MutationIgnoreB2BSessionDataArgs = {
  enabled: Scalars['Boolean']['input']
}

export type MutationImpersonateB2BUserArgs = {
  id: Scalars['ID']['input']
}

export type MutationImpersonateUserArgs = {
  clId: InputMaybe<Scalars['ID']['input']>
  userId: InputMaybe<Scalars['ID']['input']>
}

export type MutationRemoveExtraPartsArgs = {
  skuGtin: InputMaybe<Scalars['String']['input']>
}

export type MutationRemoveFolderImprintingArgs = {
  skuGtin: InputMaybe<Scalars['String']['input']>
}

export type MutationRemoveFromCartArgs = {
  skuId: Scalars['ID']['input']
}

export type MutationRemoveUserArgs = {
  clId: Scalars['ID']['input']
  email: Scalars['String']['input']
  id: Scalars['ID']['input']
  userId: InputMaybe<Scalars['ID']['input']>
}

export type MutationRemoveUserWithEmailArgs = {
  costId: Scalars['ID']['input']
  email: Scalars['String']['input']
  orgId: Scalars['ID']['input']
}

export type MutationSaveB2BSettingsArgs = {
  input: InputMaybe<B2BSettingsInput>
}

export type MutationSaveRoleArgs = {
  features: InputMaybe<Array<InputMaybe<FeatureInput>>>
  id: InputMaybe<Scalars['ID']['input']>
  name: Scalars['String']['input']
  slug: InputMaybe<Scalars['String']['input']>
}

export type MutationSaveSalesChannelsArgs = {
  channels: Array<InputMaybe<SalesChannelsInput>>
}

export type MutationSaveUserArgs = {
  canImpersonate?: InputMaybe<Scalars['Boolean']['input']>
  clId: InputMaybe<Scalars['ID']['input']>
  costId: InputMaybe<Scalars['ID']['input']>
  email: Scalars['String']['input']
  id: InputMaybe<Scalars['ID']['input']>
  name: Scalars['String']['input']
  orgId: InputMaybe<Scalars['ID']['input']>
  roleId: Scalars['ID']['input']
  userId: InputMaybe<Scalars['ID']['input']>
}

export type MutationSessionWatcherArgs = {
  active: Scalars['Boolean']['input']
}

export type MutationSetActiveUserByOrganizationArgs = {
  userId: InputMaybe<Scalars['ID']['input']>
}

export type MutationSetCurrentOrganizationArgs = {
  costId: Scalars['ID']['input']
  orgId: Scalars['ID']['input']
}

export type MutationSetMarketingTagsArgs = {
  costId: Scalars['ID']['input']
  tags: Array<InputMaybe<Scalars['String']['input']>>
}

export type MutationSubscribeNewsletterArgs = {
  email: InputMaybe<Scalars['String']['input']>
  fields: InputMaybe<NewsletterFieldsInput>
}

export type MutationSubscribeToNewsletterArgs = {
  data: IPersonNewsletter
}

export type MutationSyncPersistedCartArgs = {
  cart: InputMaybe<CartInputV2>
  cartId: InputMaybe<Scalars['ID']['input']>
  cartSerialized: InputMaybe<Scalars['String']['input']>
  email: InputMaybe<Scalars['String']['input']>
  revision: InputMaybe<Scalars['Int']['input']>
}

export type MutationUpdateCostCenterArgs = {
  id: Scalars['ID']['input']
  input: CostCenterInput
}

export type MutationUpdateCostCenterAddressArgs = {
  address: InputMaybe<AddressInput>
  costCenterId: InputMaybe<Scalars['ID']['input']>
}

export type MutationUpdateOrganizationArgs = {
  collections: InputMaybe<Array<InputMaybe<CollectionInput>>>
  customFields: InputMaybe<Array<InputMaybe<CustomFieldInput>>>
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
  notifyUsers: InputMaybe<Scalars['Boolean']['input']>
  paymentTerms: InputMaybe<Array<InputMaybe<PaymentTermInput>>>
  priceTables: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  salesChannel: InputMaybe<Scalars['String']['input']>
  sellers: InputMaybe<Array<InputMaybe<SellerInput>>>
  status: Scalars['String']['input']
  tradeName: InputMaybe<Scalars['String']['input']>
}

export type MutationUpdateOrganizationRequestArgs = {
  id: Scalars['ID']['input']
  notes: InputMaybe<Scalars['String']['input']>
  notifyUsers: InputMaybe<Scalars['Boolean']['input']>
  status: Scalars['String']['input']
}

export type MutationUpdateUserArgs = {
  canImpersonate?: InputMaybe<Scalars['Boolean']['input']>
  clId: InputMaybe<Scalars['ID']['input']>
  costId: InputMaybe<Scalars['ID']['input']>
  email: InputMaybe<Scalars['String']['input']>
  id: InputMaybe<Scalars['ID']['input']>
  name: InputMaybe<Scalars['String']['input']>
  orgId: InputMaybe<Scalars['ID']['input']>
  roleId: Scalars['ID']['input']
  userId: InputMaybe<Scalars['ID']['input']>
}

export type MutationUpdateWishlistArgs = {
  wishlist: InputMaybe<WishlistInput>
}

export type MutationValidateCartArgs = {
  cart: IStoreCart
  session: InputMaybe<IStoreSession>
}

export type MutationValidateSessionArgs = {
  search: Scalars['String']['input']
  session: IStoreSession
}

export type MutationResponse = {
  id: Maybe<Scalars['String']['output']>
  message: Maybe<Scalars['String']['output']>
  status: Maybe<Scalars['String']['output']>
}

export type NewsletterFieldsInput = {
  bindingId: InputMaybe<Scalars['String']['input']>
  bindingUrl: InputMaybe<Scalars['String']['input']>
  name: InputMaybe<Scalars['String']['input']>
  phone: InputMaybe<Scalars['String']['input']>
}

/**
 * NormalizedOrganizationInput is basically the same as OrganizationInput,
 * but with the fields in a normalized format, i.e. the following fields
 * are expected as a list of names only instead of objects with id and name:
 * paymentTerms, sellers and collections.
 */
export type NormalizedOrganizationInput = {
  b2bCustomerAdmin: InputMaybe<B2BUserInput>
  collections: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  costCenters: InputMaybe<Array<InputMaybe<DefaultCostCenterInput>>>
  customFields: InputMaybe<Array<InputMaybe<CustomFieldInput>>>
  defaultCostCenter: InputMaybe<DefaultCostCenterInput>
  id: InputMaybe<Scalars['String']['input']>
  name: InputMaybe<Scalars['String']['input']>
  paymentTerms: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  priceTables: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  salesChannel: InputMaybe<Scalars['String']['input']>
  sellers: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  tradeName: InputMaybe<Scalars['String']['input']>
}

export type OfferedItemImageInputV2 = {
  alternateName: InputMaybe<Scalars['String']['input']>
  url: InputMaybe<Scalars['String']['input']>
}

export type OfferedItemImageV2 = {
  alternateName: Maybe<Scalars['String']['output']>
  url: Maybe<Scalars['String']['output']>
}

export type OfferedItemInputV2 = {
  additionalProperty: InputMaybe<Array<InputMaybe<AdditionalPropertyInputV2>>>
  brand: InputMaybe<BrandInputV2>
  gtin: InputMaybe<Scalars['String']['input']>
  image: InputMaybe<Array<InputMaybe<OfferedItemImageInputV2>>>
  isVariantOf: InputMaybe<CartItemIsVariantOfInputV2>
  name: InputMaybe<Scalars['String']['input']>
  sku: InputMaybe<Scalars['String']['input']>
  unitMultiplier: InputMaybe<Scalars['Int']['input']>
}

export type OfferedItemV2 = {
  additionalProperty: Maybe<Array<Maybe<AdditionalPropertyV2>>>
  brand: Maybe<BrandV2>
  gtin: Maybe<Scalars['String']['output']>
  image: Maybe<Array<Maybe<OfferedItemImageV2>>>
  isVariantOf: Maybe<CartItemIsVariantOfV2>
  name: Maybe<Scalars['String']['output']>
  sku: Maybe<Scalars['String']['output']>
  unitMultiplier: Maybe<Scalars['Int']['output']>
}

export type Order = {
  customData: Maybe<CustomData>
  items: Array<Item>
  marketingData: Maybe<MarketingData>
  orderFormId: Scalars['String']['output']
}

export type Organization = {
  collections: Maybe<Array<Maybe<B2BCollection>>>
  costCenters: Maybe<Array<Maybe<Scalars['ID']['output']>>>
  created: Maybe<Scalars['String']['output']>
  customFields: Maybe<Array<Maybe<CustomField>>>
  id: Maybe<Scalars['ID']['output']>
  name: Maybe<Scalars['String']['output']>
  paymentTerms: Maybe<Array<Maybe<PaymentTerm>>>
  priceTables: Maybe<Array<Maybe<Scalars['String']['output']>>>
  salesChannel: Maybe<Scalars['String']['output']>
  sellers: Maybe<Array<Maybe<Seller>>>
  status: Maybe<Scalars['String']['output']>
  tradeName: Maybe<Scalars['String']['output']>
}

export type OrganizationCostCenterResponse = {
  costCenterId: Maybe<Scalars['String']['output']>
  href: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  status: Maybe<Scalars['String']['output']>
}

export type OrganizationInput = {
  b2bCustomerAdmin: InputMaybe<B2BUserInput>
  collections: InputMaybe<Array<InputMaybe<CollectionInput>>>
  costCenters: InputMaybe<Array<InputMaybe<DefaultCostCenterInput>>>
  customFields: InputMaybe<Array<InputMaybe<CustomFieldInput>>>
  defaultCostCenter: InputMaybe<DefaultCostCenterInput>
  id: InputMaybe<Scalars['String']['input']>
  name: InputMaybe<Scalars['String']['input']>
  paymentTerms: InputMaybe<Array<InputMaybe<PaymentTermInput>>>
  priceTables: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  salesChannel: InputMaybe<Scalars['String']['input']>
  sellers: InputMaybe<Array<InputMaybe<SellerInput>>>
  tradeName: InputMaybe<Scalars['String']['input']>
}

export type OrganizationRequest = {
  b2bCustomerAdmin: Maybe<B2BUserSimple>
  created: Maybe<Scalars['String']['output']>
  customFields: Maybe<Array<Maybe<CustomField>>>
  defaultCostCenter: Maybe<DefaultCostCenter>
  id: Maybe<Scalars['ID']['output']>
  name: Maybe<Scalars['String']['output']>
  notes: Maybe<Scalars['String']['output']>
  status: Maybe<Scalars['String']['output']>
  tradeName: Maybe<Scalars['String']['output']>
}

export type OrganizationRequestResult = {
  data: Maybe<Array<Maybe<OrganizationRequest>>>
  pagination: Maybe<Pagination>
}

export type OrganizationResult = {
  data: Maybe<Array<Maybe<Organization>>>
  pagination: Maybe<Pagination>
}

export type Pagination = {
  page: Maybe<Scalars['Int']['output']>
  pageSize: Maybe<Scalars['Int']['output']>
  total: Maybe<Scalars['Int']['output']>
}

export type PaymentTerm = {
  id: Maybe<Scalars['ID']['output']>
  name: Maybe<Scalars['String']['output']>
}

export type PaymentTermInput = {
  id: InputMaybe<Scalars['ID']['input']>
  name: InputMaybe<Scalars['String']['input']>
}

/** Newsletter information. */
export type PersonNewsletter = {
  /** Person's ID in the newsletter list. */
  id: Scalars['String']['output']
}

export type PickupAddress = {
  /** PickupAddress address id. */
  addressId: Maybe<Scalars['String']['output']>
  /** PickupAddress address type. */
  addressType: Maybe<Scalars['String']['output']>
  /** PickupAddress city. */
  city: Maybe<Scalars['String']['output']>
  /** PickupAddress complement. */
  complement: Maybe<Scalars['String']['output']>
  /** PickupAddress country. */
  country: Maybe<Scalars['String']['output']>
  /** PickupAddress geo coordinates. */
  geoCoordinates: Maybe<Array<Maybe<Scalars['Float']['output']>>>
  /** PickupAddress neighborhood. */
  neighborhood: Maybe<Scalars['String']['output']>
  /** PickupAddress number. */
  number: Maybe<Scalars['String']['output']>
  /** PickupAddress postal code. */
  postalCode: Maybe<Scalars['String']['output']>
  /** PickupAddress receiver name. */
  receiverName: Maybe<Scalars['String']['output']>
  /** PickupAddress reference. */
  reference: Maybe<Scalars['String']['output']>
  /** PickupAddress state. */
  state: Maybe<Scalars['String']['output']>
  /** PickupAddress street. */
  street: Maybe<Scalars['String']['output']>
}

export type PickupStoreInfo = {
  /** PickupStoreInfo additional information. */
  additionalInfo: Maybe<Scalars['String']['output']>
  /** PickupStoreInfo address. */
  address: Maybe<PickupAddress>
  /** PickupStoreInfo dock id. */
  dockId: Maybe<Scalars['String']['output']>
  /** PickupStoreInfo friendly name. */
  friendlyName: Maybe<Scalars['String']['output']>
  /** Information if the store has pickup enable. */
  isPickupStore: Maybe<Scalars['Boolean']['output']>
}

export type Products = {
  ID: Maybe<Scalars['Int']['output']>
  Image: Maybe<Scalars['String']['output']>
  bundle: Maybe<Scalars['Int']['output']>
  department: Maybe<Scalars['String']['output']>
  linkProduct: Maybe<Scalars['String']['output']>
  nameProduct: Maybe<Scalars['String']['output']>
  notes: Maybe<Scalars['String']['output']>
  quantityProduct: Maybe<Scalars['Int']['output']>
  skuCodeReference: Maybe<Scalars['String']['output']>
}

export type ProductsInput = {
  ID: InputMaybe<Scalars['Int']['input']>
  Image: InputMaybe<Scalars['String']['input']>
  bundle: InputMaybe<Scalars['Int']['input']>
  department: InputMaybe<Scalars['String']['input']>
  linkProduct: InputMaybe<Scalars['String']['input']>
  nameProduct: InputMaybe<Scalars['String']['input']>
  notes: InputMaybe<Scalars['String']['input']>
  quantityProduct: InputMaybe<Scalars['Int']['input']>
  skuCodeReference: InputMaybe<Scalars['String']['input']>
}

export type Query = {
  /** Returns information about all collections. */
  allCollections: StoreCollectionConnection
  /** Returns information about all products. */
  allProducts: StoreProductConnection
  brand: Maybe<Brand>
  brandList: Maybe<Array<Brand>>
  categoryTree: Maybe<Array<Maybe<CategoryTree>>>
  checkCustomerSchema: Maybe<Scalars['Boolean']['output']>
  checkImpersonation: Maybe<UserImpersonation>
  checkOrganizationIsActive: Maybe<Scalars['Boolean']['output']>
  checkUserPermission: Maybe<UserPermissions>
  /** Returns the details of a collection based on the collection slug. */
  collection: StoreCollection
  collectionDetails: Maybe<CollectionDetails>
  customData: Maybe<Scalars['String']['output']>
  departmentBanner: Maybe<DepartmentBanner>
  getActiveUserByEmail: Maybe<User>
  getAppSettings: Maybe<SettingsResponse>
  getB2BSettings: Maybe<B2BSettings>
  getB2BUser: Maybe<User>
  getBinding: Maybe<Scalars['Boolean']['output']>
  getCollectionName: Maybe<CollectionNameResponse>
  getCostCenterById: Maybe<CostCenter>
  getCostCenterByIdStorefront: Maybe<CostCenter>
  getCostCenters: Maybe<CostCenterResult>
  getCostCentersByOrganizationId: Maybe<CostCenterResult>
  getCostCentersByOrganizationIdStorefront: Maybe<CostCenterResult>
  getFeaturesByModule: Maybe<Feature>
  getMarketingTags: Maybe<MarketingTags>
  getOrganizationById: Maybe<Organization>
  getOrganizationByIdStorefront: Maybe<Organization>
  getOrganizationRequestById: Maybe<OrganizationRequest>
  getOrganizationRequests: Maybe<OrganizationRequestResult>
  getOrganizations: Maybe<OrganizationResult>
  getOrganizationsByEmail: Maybe<Array<Maybe<B2BOrganization>>>
  getOrganizationsWithoutSalesManager: Maybe<Array<Maybe<Organization>>>
  getPaymentTerms: Maybe<Array<Maybe<PaymentTerm>>>
  getRole: Maybe<Role>
  getSalesChannels: Maybe<Array<Maybe<Channels>>>
  getSellers: Maybe<Array<Maybe<Seller>>>
  getSessionWatcher: Maybe<Scalars['Boolean']['output']>
  getSubcollectionId: Maybe<SubcollectionProducts>
  getUser: Maybe<User>
  getUserByEmail: Maybe<Array<Maybe<User>>>
  getUsers: Maybe<Array<Maybe<B2BUser>>>
  getUsersByEmail: Maybe<Array<Maybe<User>>>
  getUsersPaginated: Maybe<B2BUserPagination>
  /** Return a wishlist */
  getWishlist: Maybe<WishlistData>
  /** Returns a list of wishlist by email user */
  getWishlistsByEmail: Maybe<Array<Maybe<WishlistData>>>
  hasUsers: Maybe<Scalars['Boolean']['output']>
  listAllUsers: Maybe<Array<Maybe<User>>>
  listFeatures: Maybe<Array<Maybe<FullFeature>>>
  listRoles: Maybe<Array<Maybe<Role>>>
  /** @deprecated This query is deprecated, use listUsersPaginated query instead. */
  listUsers: Maybe<Array<Maybe<User>>>
  listUsersPaginated: Maybe<UserPagination>
  lists: Maybe<Array<Maybe<List>>>
  liturgicalCalendar: Maybe<Array<Maybe<LiturgicalCalendar>>>
  menuItems: Maybe<Array<Maybe<MenuItem>>>
  orderForm: Order
  /** Returns the details of a product based on the specified locator. */
  product: StoreProduct
  /** Returns if there's a redirect for a search. */
  redirect: Maybe<StoreRedirect>
  /** Returns the result of a product, facet, or suggestion search. */
  search: StoreSearchResult
  /** Returns a list of sellers available for a specific localization. */
  sellers: Maybe<SellersData>
  sessionToken: Maybe<Scalars['String']['output']>
  /** Returns information about shipping simulation. */
  shipping: Maybe<ShippingData>
}

export type QueryAllCollectionsArgs = {
  after: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
}

export type QueryAllProductsArgs = {
  after: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
}

export type QueryBrandArgs = {
  id: Scalars['Int']['input']
}

export type QueryCategoryTreeArgs = {
  excludeIds: InputMaybe<Array<Scalars['Int']['input']>>
  id: Scalars['Int']['input']
}

export type QueryCheckOrganizationIsActiveArgs = {
  id: InputMaybe<Scalars['String']['input']>
}

export type QueryCollectionArgs = {
  slug: Scalars['String']['input']
}

export type QueryCollectionDetailsArgs = {
  id: Scalars['Int']['input']
}

export type QueryCustomDataArgs = {
  appId: Scalars['String']['input']
  field: Scalars['String']['input']
}

export type QueryDepartmentBannerArgs = {
  department: Scalars['String']['input']
}

export type QueryGetActiveUserByEmailArgs = {
  email: Scalars['String']['input']
}

export type QueryGetB2BUserArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetBindingArgs = {
  email: Scalars['String']['input']
}

export type QueryGetCollectionNameArgs = {
  collectionId: Scalars['String']['input']
}

export type QueryGetCostCenterByIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetCostCenterByIdStorefrontArgs = {
  id: InputMaybe<Scalars['ID']['input']>
}

export type QueryGetCostCentersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search: InputMaybe<Scalars['String']['input']>
  sortOrder?: InputMaybe<Scalars['String']['input']>
  sortedBy?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetCostCentersByOrganizationIdArgs = {
  id: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search: InputMaybe<Scalars['String']['input']>
  sortOrder?: InputMaybe<Scalars['String']['input']>
  sortedBy?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetCostCentersByOrganizationIdStorefrontArgs = {
  id: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search: InputMaybe<Scalars['String']['input']>
  sortOrder?: InputMaybe<Scalars['String']['input']>
  sortedBy?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetFeaturesByModuleArgs = {
  module: Scalars['String']['input']
}

export type QueryGetMarketingTagsArgs = {
  costId: Scalars['ID']['input']
}

export type QueryGetOrganizationByIdArgs = {
  id: InputMaybe<Scalars['ID']['input']>
}

export type QueryGetOrganizationByIdStorefrontArgs = {
  id: InputMaybe<Scalars['ID']['input']>
}

export type QueryGetOrganizationRequestByIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetOrganizationRequestsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search: InputMaybe<Scalars['String']['input']>
  sortOrder?: InputMaybe<Scalars['String']['input']>
  sortedBy?: InputMaybe<Scalars['String']['input']>
  status: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryGetOrganizationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search: InputMaybe<Scalars['String']['input']>
  sortOrder?: InputMaybe<Scalars['String']['input']>
  sortedBy?: InputMaybe<Scalars['String']['input']>
  status: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryGetOrganizationsByEmailArgs = {
  email: InputMaybe<Scalars['String']['input']>
}

export type QueryGetRoleArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetSubcollectionIdArgs = {
  collectionId: Scalars['String']['input']
}

export type QueryGetUserArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input']
}

export type QueryGetUsersArgs = {
  costCenterId: InputMaybe<Scalars['ID']['input']>
  organizationId: InputMaybe<Scalars['ID']['input']>
}

export type QueryGetUsersByEmailArgs = {
  costId: InputMaybe<Scalars['ID']['input']>
  email: Scalars['String']['input']
  orgId: InputMaybe<Scalars['ID']['input']>
}

export type QueryGetUsersPaginatedArgs = {
  costCenterId: InputMaybe<Scalars['ID']['input']>
  organizationId: InputMaybe<Scalars['ID']['input']>
  page: InputMaybe<Scalars['Int']['input']>
  pageSize: InputMaybe<Scalars['Int']['input']>
  search: InputMaybe<Scalars['String']['input']>
  sortOrder: InputMaybe<Scalars['String']['input']>
  sortedBy: InputMaybe<Scalars['String']['input']>
}

export type QueryGetWishlistArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetWishlistsByEmailArgs = {
  page: InputMaybe<Scalars['Int']['input']>
  pageSize: InputMaybe<Scalars['Int']['input']>
}

export type QueryHasUsersArgs = {
  slug: Scalars['String']['input']
}

export type QueryListUsersArgs = {
  costCenterId: InputMaybe<Scalars['ID']['input']>
  organizationId: InputMaybe<Scalars['ID']['input']>
  roleId: InputMaybe<Scalars['ID']['input']>
}

export type QueryListUsersPaginatedArgs = {
  costCenterId: InputMaybe<Scalars['ID']['input']>
  organizationId: InputMaybe<Scalars['ID']['input']>
  page: InputMaybe<Scalars['Int']['input']>
  pageSize: InputMaybe<Scalars['Int']['input']>
  roleId: InputMaybe<Scalars['ID']['input']>
  search: InputMaybe<Scalars['String']['input']>
  sortOrder: InputMaybe<Scalars['String']['input']>
  sortedBy: InputMaybe<Scalars['String']['input']>
}

export type QueryOrderFormArgs = {
  id: Scalars['String']['input']
}

export type QueryProductArgs = {
  locator: Array<IStoreSelectedFacet>
}

export type QueryRedirectArgs = {
  selectedFacets: InputMaybe<Array<IStoreSelectedFacet>>
  term: InputMaybe<Scalars['String']['input']>
}

export type QuerySearchArgs = {
  after: InputMaybe<Scalars['String']['input']>
  first: Scalars['Int']['input']
  selectedFacets: InputMaybe<Array<IStoreSelectedFacet>>
  sort?: InputMaybe<StoreSort>
  term?: InputMaybe<Scalars['String']['input']>
}

export type QuerySellersArgs = {
  country: Scalars['String']['input']
  geoCoordinates: InputMaybe<IGeoCoordinates>
  postalCode: InputMaybe<Scalars['String']['input']>
  salesChannel: InputMaybe<Scalars['String']['input']>
}

export type QueryShippingArgs = {
  country: Scalars['String']['input']
  items: Array<IShippingItem>
  postalCode: Scalars['String']['input']
}

export type Role = {
  features: Maybe<Array<Maybe<FeatureType>>>
  id: Maybe<Scalars['ID']['output']>
  locked: Maybe<Scalars['Boolean']['output']>
  name: Scalars['String']['output']
  slug: Maybe<Scalars['String']['output']>
}

export type SalesChannelsInput = {
  id: InputMaybe<Scalars['String']['input']>
  name: InputMaybe<Scalars['String']['input']>
}

/** Search result. */
export type SearchMetadata = {
  /** Indicates if the search term was misspelled. */
  isTermMisspelled: Scalars['Boolean']['output']
  /** Logical operator used to run the search. */
  logicalOperator: Scalars['String']['output']
}

export type Seller = {
  email: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  name: Maybe<Scalars['String']['output']>
}

/** Information of sellers. */
export type SellerInfo = {
  /** Identification of the seller */
  id: Maybe<Scalars['String']['output']>
  /** Logo of the seller */
  logo: Maybe<Scalars['String']['output']>
  /** Name of the seller */
  name: Maybe<Scalars['String']['output']>
}

export type SellerInput = {
  id: InputMaybe<Scalars['String']['input']>
  name: InputMaybe<Scalars['String']['input']>
}

/** Regionalization with sellers information. */
export type SellersData = {
  /** Identification of region. */
  id: Maybe<Scalars['String']['output']>
  /** List of sellers. */
  sellers: Maybe<Array<Maybe<SellerInfo>>>
}

export type SettingsCustomField = {
  dropdownValues: Maybe<Array<Maybe<DropdownValue>>>
  name: Maybe<Scalars['String']['output']>
  type: Maybe<CustomFieldType>
  useOnRegistration: Maybe<Scalars['Boolean']['output']>
}

export type SettingsResponse = {
  adminSetup: Maybe<Scalars['Data']['output']>
}

/** Shipping Simulation information. */
export type ShippingData = {
  /** Address information. */
  address: Maybe<Address>
  /** List of LogisticsItem. */
  items: Maybe<Array<Maybe<LogisticsItem>>>
  /** List of LogisticsInfo. */
  logisticsInfo: Maybe<Array<Maybe<LogisticsInfo>>>
  /** List of MessageInfo. */
  messages: Maybe<Array<Maybe<MessageInfo>>>
}

export type ShippingSla = {
  /** ShippingSLA available delivery windows. */
  availableDeliveryWindows: Maybe<Array<Maybe<AvailableDeliveryWindows>>>
  /** ShippingSLA carrier. */
  carrier: Maybe<Scalars['String']['output']>
  /** ShippingSLA delivery channel. */
  deliveryChannel: Maybe<Scalars['String']['output']>
  /** List of ShippingSLA delivery ids. */
  deliveryIds: Maybe<Array<Maybe<DeliveryIds>>>
  /** ShippingSLA friendly name. */
  friendlyName: Maybe<Scalars['String']['output']>
  /** ShippingSLA id. */
  id: Maybe<Scalars['String']['output']>
  /**
   * ShippingSLA localized shipping estimate.
   * Note: this will always return a localized string for locale `en-US`.
   */
  localizedEstimates: Maybe<Scalars['String']['output']>
  /** ShippingSLA name. */
  name: Maybe<Scalars['String']['output']>
  /** ShippingSLA pickup distance. */
  pickupDistance: Maybe<Scalars['Float']['output']>
  /** ShippingSLA pickup point id. */
  pickupPointId: Maybe<Scalars['String']['output']>
  /** ShippingSLA pickup store info. */
  pickupStoreInfo: Maybe<PickupStoreInfo>
  /** ShippingSLA price. */
  price: Maybe<Scalars['Float']['output']>
  /** ShippingSLA shipping estimate. */
  shippingEstimate: Maybe<Scalars['String']['output']>
  /** ShippingSLA shipping estimate date. */
  shippingEstimateDate: Maybe<Scalars['String']['output']>
}

export type SimpleRole = {
  id: Maybe<Scalars['ID']['output']>
  name: Scalars['String']['output']
  slug: Maybe<Scalars['String']['output']>
}

export type SingleFeature = {
  label: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type SkuVariantInputV2 = {
  activeVariations: InputMaybe<Scalars['ActiveVariationsV2']['input']>
  availableVariations: InputMaybe<Scalars['AvailableVariationsV2']['input']>
  slugsMap: InputMaybe<Scalars['SlugsMapV2']['input']>
}

export type SkuVariantV2 = {
  activeVariations: Maybe<Scalars['ActiveVariationsV2']['output']>
  availableVariations: Maybe<Scalars['AvailableVariationsV2']['output']>
  slugsMap: Maybe<Scalars['SlugsMapV2']['output']>
}

export type SkuVariants = {
  /** SKU property values for the current SKU. */
  activeVariations: Maybe<Scalars['ActiveVariations']['output']>
  /** All available options for each SKU variant property, indexed by their name. */
  allVariantsByName: Maybe<Scalars['VariantsByName']['output']>
  /**
   * Available options for each varying SKU property, taking into account the
   * `dominantVariantName` property. Returns all available options for the
   * dominant property, and only options that can be combined with its current
   * value for other properties.
   * If `dominantVariantName` is not present, the first variant will be
   * considered the dominant one.
   */
  availableVariations: Maybe<Scalars['FormattedVariants']['output']>
  /**
   * Maps property value combinations to their respective SKU's slug. Enables
   * us to retrieve the slug for the SKU that matches the currently selected
   * variations in O(1) time.
   * If `dominantVariantName` is not present, the first variant will be
   * considered the dominant one.
   */
  slugsMap: Maybe<Scalars['SlugsMap']['output']>
}

export type SkuVariantsAvailableVariationsArgs = {
  dominantVariantName: InputMaybe<Scalars['String']['input']>
}

export type SkuVariantsSlugsMapArgs = {
  dominantVariantName: InputMaybe<Scalars['String']['input']>
}

/** Aggregate offer information, for a given SKU that is available to be fulfilled by multiple sellers. */
export type StoreAggregateOffer = {
  /** Highest price among all sellers. */
  highPrice: Scalars['Float']['output']
  /** Lowest price among all sellers. */
  lowPrice: Scalars['Float']['output']
  /** Lowest price among all sellers with current taxes. */
  lowPriceWithTaxes: Scalars['Float']['output']
  /** Number of sellers selling this SKU. */
  offerCount: Scalars['Int']['output']
  /** Array with information on each available offer. */
  offers: Array<StoreOffer>
  /** ISO code of the currency used for the offer prices. */
  priceCurrency: Scalars['String']['output']
}

/** Average rating, based on multiple ratings or reviews. */
export type StoreAggregateRating = {
  /** Value of the aggregate rating. */
  ratingValue: Scalars['Float']['output']
  /** Total number of ratings. */
  reviewCount: Scalars['Int']['output']
}

/** information about the author of a product review or rating. */
export type StoreAuthor = {
  /** Author name. */
  name: Scalars['String']['output']
}

/** Brand of a given product. */
export type StoreBrand = {
  /** Brand name. */
  name: Scalars['String']['output']
}

/** List of items consisting of chain linked web pages, ending with the current page. */
export type StoreBreadcrumbList = {
  /** Array with breadcrumb elements. */
  itemListElement: Array<StoreListItem>
  /** Number of breadcrumbs in the list. */
  numberOfItems: Scalars['Int']['output']
}

/** Shopping cart information. */
export type StoreCart = {
  /** List of shopping cart messages. */
  messages: Array<StoreCartMessage>
  /** Order information, including `orderNumber` and `acceptedOffer`. */
  order: StoreOrder
}

/** Shopping cart message. */
export type StoreCartMessage = {
  /** Shopping cart message status, which can be `INFO`, `WARNING` or `ERROR`. */
  status: StoreStatus
  /** Shopping cart message text. */
  text: Scalars['String']['output']
}

/** Product collection information. */
export type StoreCollection = {
  /** List of items consisting of chain linked web pages, ending with the current page. */
  breadcrumbList: StoreBreadcrumbList
  /** Collection ID. */
  id: Scalars['ID']['output']
  /** Collection meta information. Used for search. */
  meta: StoreCollectionMeta
  /** Meta tag data. */
  seo: StoreSeo
  /** Corresponding collection URL slug, with which to retrieve this entity. */
  slug: Scalars['String']['output']
  /** Collection type. */
  type: StoreCollectionType
}

/** Collection connections, including pagination information and collections returned by the query. */
export type StoreCollectionConnection = {
  /** Array with collection connection page edges, each containing a collection and a corresponding cursor.. */
  edges: Array<StoreCollectionEdge>
  /** Collection pagination information. */
  pageInfo: StorePageInfo
}

/** Each collection edge contains a `node`, with product collection information, and a `cursor`, that can be used as a reference for pagination. */
export type StoreCollectionEdge = {
  /** Collection cursor. Used as pagination reference. */
  cursor: Scalars['String']['output']
  /** Each collection node contains the information of a product collection returned by the query. */
  node: StoreCollection
}

/** Product collection facet, used for search. */
export type StoreCollectionFacet = {
  /** Facet key. */
  key: Scalars['String']['output']
  /** Facet value. */
  value: Scalars['String']['output']
}

/** Collection meta information. Used for search. */
export type StoreCollectionMeta = {
  /** List of selected collection facets. */
  selectedFacets: Array<StoreCollectionFacet>
}

/** Product collection type. Possible values are `Department`, `Category`, `Brand`, `Cluster`, `SubCategory` or `Collection`. */
export type StoreCollectionType =
  /** Product brand. */
  | 'Brand'
  /** Second level of product categorization. */
  | 'Category'
  /** Product cluster. */
  | 'Cluster'
  /** Product collection. */
  | 'Collection'
  /** First level of product categorization. */
  | 'Department'
  /** Third level of product categorization. */
  | 'SubCategory'

/** Currency information. */
export type StoreCurrency = {
  /** Currency code (e.g: USD). */
  code: Scalars['String']['output']
  /** Currency symbol (e.g: $). */
  symbol: Scalars['String']['output']
}

/** Delivery mode information. */
export type StoreDeliveryMode = {
  /** The delivery channel information of the session. */
  deliveryChannel: Scalars['String']['output']
  /** The delivery method information of the session. */
  deliveryMethod: Scalars['String']['output']
  /** The delivery window information of the session. */
  deliveryWindow: Maybe<StoreDeliveryWindow>
}

/** Delivery window information. */
export type StoreDeliveryWindow = {
  /** The delivery window end date information. */
  endDate: Scalars['String']['output']
  /** The delivery window start date information. */
  startDate: Scalars['String']['output']
}

export type StoreFacet = StoreFacetBoolean | StoreFacetRange

/** Search facet boolean information. */
export type StoreFacetBoolean = {
  /** Facet key. */
  key: Scalars['String']['output']
  /** Facet label. */
  label: Scalars['String']['output']
  /** Array with information on each facet value. */
  values: Array<StoreFacetValueBoolean>
}

/** Search facet range information. */
export type StoreFacetRange = {
  /** Facet key. */
  key: Scalars['String']['output']
  /** Facet label. */
  label: Scalars['String']['output']
  /** Maximum facet range value. */
  max: StoreFacetValueRange
  /** Minimum facet range value. */
  min: StoreFacetValueRange
}

/** Search facet type. */
export type StoreFacetType =
  /** Indicates boolean search facet. */
  | 'BOOLEAN'
  /** Indicates range type search facet. */
  | 'RANGE'

/** Information of a specific facet value. */
export type StoreFacetValueBoolean = {
  /** Facet value label. */
  label: Scalars['String']['output']
  /** Number of items with this facet. */
  quantity: Scalars['Int']['output']
  /** Indicates whether facet is selected. */
  selected: Scalars['Boolean']['output']
  /** Facet value. */
  value: Scalars['String']['output']
}

/** Search facet range value information. Used for minimum and maximum range values. */
export type StoreFacetValueRange = {
  /** Search facet range absolute value. */
  absolute: Scalars['Float']['output']
  /** Search facet range selected value. */
  selected: Scalars['Float']['output']
}

/** Geographic coordinates information. */
export type StoreGeoCoordinates = {
  /** The latitude of the geographic coordinates. */
  latitude: Scalars['Float']['output']
  /** The longitude of the geographic coordinates. */
  longitude: Scalars['Float']['output']
}

/** Image. */
export type StoreImage = {
  /** Alias for the image. */
  alternateName: Scalars['String']['output']
  /** Image URL. */
  url: Scalars['String']['output']
}

/** Item of a list. */
export type StoreListItem = {
  /** List item value. */
  item: Scalars['String']['output']
  /** Name of the list item. */
  name: Scalars['String']['output']
  /** Position of the item in the list. */
  position: Scalars['Int']['output']
}

/** Offer information. */
export type StoreOffer = {
  /** Offer item availability. */
  availability: Scalars['String']['output']
  /** Offer item condition. */
  itemCondition: Scalars['String']['output']
  /** Information on the item being offered. */
  itemOffered: StoreProduct
  /** This is displayed as the "from" price in the context of promotions' price comparison. This may change before it reaches the shelf. */
  listPrice: Scalars['Float']['output']
  /** List price among with current taxes. */
  listPriceWithTaxes: Scalars['Float']['output']
  /** Also known as spot price. */
  price: Scalars['Float']['output']
  /** ISO code of the currency used for the offer prices. */
  priceCurrency: Scalars['String']['output']
  /** Next date in which price is scheduled to change. If there is no scheduled change, this will be set a year in the future from current time. */
  priceValidUntil: Scalars['String']['output']
  /** Also known as spot price with taxes. */
  priceWithTaxes: Scalars['Float']['output']
  /** Number of items offered. */
  quantity: Scalars['Int']['output']
  /** Seller responsible for the offer. */
  seller: StoreOrganization
  /** Computed price before applying coupons, taxes or benefits. This may change before it reaches the shelf. */
  sellingPrice: Scalars['Float']['output']
}

/** Information of a specific order. */
export type StoreOrder = {
  /** Array with information on each accepted offer. */
  acceptedOffer: Array<StoreOffer>
  /** ID of the order in [VTEX order management](https://help.vtex.com/en/tutorial/license-manager-resources-oms--60QcBsvWeum02cFi3GjBzg#). */
  orderNumber: Scalars['String']['output']
}

/** Organization. */
export type StoreOrganization = {
  /** Organization ID. */
  identifier: Scalars['String']['output']
}

/** Whenever you make a query that allows for pagination, such as `allProducts` or `allCollections`, you can check `StorePageInfo` to learn more about the complete set of items and use it to paginate your queries. */
export type StorePageInfo = {
  /** Cursor corresponding to the last possible item. */
  endCursor: Scalars['String']['output']
  /** Indicates whether there is at least one more page with items after the ones returned in the current query. */
  hasNextPage: Scalars['Boolean']['output']
  /** Indicates whether there is at least one more page with items before the ones returned in the current query. */
  hasPreviousPage: Scalars['Boolean']['output']
  /** Cursor corresponding to the first possible item. */
  startCursor: Scalars['String']['output']
  /** Total number of items (products or collections), not pages. */
  totalCount: Scalars['Int']['output']
}

/** Client profile data. */
export type StorePerson = {
  /** Client email. */
  email: Scalars['String']['output']
  /** Client last name. */
  familyName: Scalars['String']['output']
  /** Client first name. */
  givenName: Scalars['String']['output']
  /** Client ID. */
  id: Scalars['String']['output']
}

/** Product information. Products are variants within product groups, equivalent to VTEX [SKUs](https://help.vtex.com/en/tutorial/what-is-an-sku--1K75s4RXAQyOuGUYKMM68u#). For example, you may have a **Shirt** product group with associated products such as **Blue shirt size L**, **Green shirt size XL** and so on. */
export type StoreProduct = {
  /** Array of additional properties. */
  additionalProperty: Array<StorePropertyValue>
  /** Aggregate ratings data. */
  aggregateRating: StoreAggregateRating
  /** Get assembly options */
  assemblyOptions: Array<AssemblyOption>
  /** Product brand. */
  brand: StoreBrand
  /** List of items consisting of chain linked web pages, ending with the current page. */
  breadcrumbList: StoreBreadcrumbList
  /** Product description. */
  description: Scalars['String']['output']
  /** Global Trade Item Number. */
  gtin: Scalars['String']['output']
  /** Array of images. */
  image: Array<StoreImage>
  /** Get list of inventory for the product by warehouse */
  inventory: Array<Inventory>
  /** Indicates product group related to this product. */
  isVariantOf: StoreProductGroup
  /** Product name. */
  name: Scalars['String']['output']
  /** Aggregate offer information. */
  offers: StoreAggregateOffer
  /** Product ID, such as [ISBN](https://www.isbn-international.org/content/what-isbn) or similar global IDs. */
  productID: Scalars['String']['output']
  /** The product's release date. Formatted using https://en.wikipedia.org/wiki/ISO_8601 */
  releaseDate: Scalars['String']['output']
  /** Array with review information. */
  review: Array<StoreReview>
  /** Meta tag data. */
  seo: StoreSeo
  /** Stock Keeping Unit. Merchant-specific ID for the product. */
  sku: Scalars['String']['output']
  /** Corresponding collection URL slug, with which to retrieve this entity. */
  slug: Scalars['String']['output']
  /** Sku Unit Multiplier */
  unitMultiplier: Maybe<Scalars['Float']['output']>
  /** Get video URLs for the product */
  videos: Array<Scalars['String']['output']>
}

/** Product information. Products are variants within product groups, equivalent to VTEX [SKUs](https://help.vtex.com/en/tutorial/what-is-an-sku--1K75s4RXAQyOuGUYKMM68u#). For example, you may have a **Shirt** product group with associated products such as **Blue shirt size L**, **Green shirt size XL** and so on. */
export type StoreProductImageArgs = {
  context?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** Product connections, including pagination information and products returned by the query. */
export type StoreProductConnection = {
  /** Array with product connection edges, each containing a product and a corresponding cursor. */
  edges: Array<StoreProductEdge>
  /** Product pagination information. */
  pageInfo: StorePageInfo
}

/** Each product edge contains a `node`, with product information, and a `cursor`, that can be used as a reference for pagination. */
export type StoreProductEdge = {
  /** Product cursor. Used as pagination reference. */
  cursor: Scalars['String']['output']
  /** Each product node contains the information of a product returned by the query. */
  node: StoreProduct
}

/** Product group information. Product groups are catalog entities that may contain variants. They are equivalent to VTEX [Products](https://help.vtex.com/en/tutorial/what-is-a-product--2zrB2gFCHyQokCKKE8kuAw#), whereas each variant is equivalent to a VTEX [SKU](https://help.vtex.com/en/tutorial/what-is-an-sku--1K75s4RXAQyOuGUYKMM68u#). For example, you may have a **Shirt** product group with associated products such as **Blue shirt size L**, **Green shirt size XL** and so on. */
export type StoreProductGroup = {
  /** Array of additional properties. */
  additionalProperty: Array<StorePropertyValue>
  /** List of collections that the product is a part of */
  festivalCollections: Array<Collection>
  /**
   * Array of variant SKUs for the product, including related products (AKA sneaky
   * cross sells)
   */
  fullVariantList: Array<StoreProduct>
  /** Array of variants related to product group. Variants are equivalent to VTEX [SKUs](https://help.vtex.com/en/tutorial/what-is-an-sku--1K75s4RXAQyOuGUYKMM68u#). */
  hasVariant: Array<StoreProduct>
  /** Product group name. */
  name: Scalars['String']['output']
  /** Product group ID. */
  productGroupID: Scalars['String']['output']
  /**
   * Object containing data structures to facilitate handling different SKU
   * variant properties. Specially useful for implementing SKU selection
   * components.
   */
  skuVariants: Maybe<SkuVariants>
}

/** Properties that can be associated with products and products groups. */
export type StorePropertyValue = {
  /** Property name. */
  name: Scalars['String']['output']
  /** Property id. This propert changes according to the content of the object. */
  propertyID: Scalars['String']['output']
  /** Property value. May hold a string or the string representation of an object. */
  value: Scalars['ObjectOrString']['output']
  /** Specifies the nature of the value */
  valueReference: Scalars['ObjectOrString']['output']
}

/**
 * Redirect informations, including url returned by the query.
 * https://schema.org/Thing
 */
export type StoreRedirect = {
  /** URL to redirect */
  url: Maybe<Scalars['String']['output']>
}

/** Information of a given review. */
export type StoreReview = {
  /** Review author. */
  author: StoreAuthor
  /** Review rating information. */
  reviewRating: StoreReviewRating
}

/** Information of a given review rating. */
export type StoreReviewRating = {
  /** Best rating value. */
  bestRating: Scalars['Float']['output']
  /** Rating value. */
  ratingValue: Scalars['Float']['output']
}

/** Search result. */
export type StoreSearchResult = {
  /** Array of search result facets. */
  facets: Array<StoreFacet>
  /** Search result metadata. Additional data can be used to send analytics events. */
  metadata: Maybe<SearchMetadata>
  /** Search result products. */
  products: StoreProductConnection
  /** Search result suggestions. */
  suggestions: StoreSuggestions
}

/** Search Engine Optimization (SEO) tags data. */
export type StoreSeo = {
  /** Canonical tag. */
  canonical: Scalars['String']['output']
  /** Description tag. */
  description: Scalars['String']['output']
  /** Title tag. */
  title: Scalars['String']['output']
  /** Title template tag. */
  titleTemplate: Scalars['String']['output']
}

/** Session information. */
export type StoreSession = {
  /** Session address type. */
  addressType: Maybe<Scalars['String']['output']>
  /** Session channel. */
  channel: Maybe<Scalars['String']['output']>
  /** Session country. */
  country: Scalars['String']['output']
  /** Session currency. */
  currency: StoreCurrency
  /** Session delivery mode. */
  deliveryMode: Maybe<StoreDeliveryMode>
  /** Session input geoCoordinates. */
  geoCoordinates: Maybe<StoreGeoCoordinates>
  /** Session locale. */
  locale: Scalars['String']['output']
  /** Session input person. */
  person: Maybe<StorePerson>
  /** Session postal code. */
  postalCode: Maybe<Scalars['String']['output']>
}

/** Product search results sorting options. */
export type StoreSort =
  /** Sort by discount value, from highest to lowest. */
  | 'discount_desc'
  /** Sort by name, in alphabetical order. */
  | 'name_asc'
  /** Sort by name, in reverse alphabetical order. */
  | 'name_desc'
  /** Sort by orders, from highest to lowest. */
  | 'orders_desc'
  /** Sort by price, from lowest to highest. */
  | 'price_asc'
  /** Sort by price, from highest to lowest. */
  | 'price_desc'
  /** Sort by release date, from  highest to lowest. */
  | 'release_desc'
  /** Sort by product score, from highest to lowest. */
  | 'score_desc'

/** Status used to indicate a message type. For instance, a shopping cart informative or error message. */
export type StoreStatus = 'ERROR' | 'INFO' | 'WARNING'

/** Suggestion term. */
export type StoreSuggestionTerm = {
  /** Its occurrences count. */
  count: Scalars['Int']['output']
  /** The term. */
  value: Scalars['String']['output']
}

/** Suggestions information. */
export type StoreSuggestions = {
  /** Array with suggestion products' information. */
  products: Array<StoreProduct>
  /** Array with suggestion terms. */
  terms: Array<StoreSuggestionTerm>
}

export type SubcollectionProduct = {
  SkuId: Maybe<Scalars['Int']['output']>
}

export type SubcollectionProducts = {
  Data: Maybe<Array<Maybe<SubcollectionProduct>>>
  TotalPage: Maybe<Scalars['Int']['output']>
}

export type TransactionEmailSettings = {
  organizationApproved: Maybe<Scalars['Boolean']['output']>
  organizationCreated: Maybe<Scalars['Boolean']['output']>
  organizationDeclined: Maybe<Scalars['Boolean']['output']>
  organizationRequestCreated: Maybe<Scalars['Boolean']['output']>
  organizationStatusChanged: Maybe<Scalars['Boolean']['output']>
}

export type TransactionEmailSettingsInput = {
  organizationApproved: InputMaybe<Scalars['Boolean']['input']>
  organizationCreated: InputMaybe<Scalars['Boolean']['input']>
  organizationDeclined: InputMaybe<Scalars['Boolean']['input']>
  organizationRequestCreated: InputMaybe<Scalars['Boolean']['input']>
  organizationStatusChanged: InputMaybe<Scalars['Boolean']['input']>
}

export type UiSettings = {
  clearCart: Maybe<Scalars['Boolean']['output']>
  showModal: Maybe<Scalars['Boolean']['output']>
}

export type UiSettingsInput = {
  clearCart: InputMaybe<Scalars['Boolean']['input']>
  showModal: InputMaybe<Scalars['Boolean']['input']>
}

export type UpdateWishlistResponse = {
  id: Maybe<Scalars['String']['output']>
  success: Maybe<Scalars['Boolean']['output']>
}

export type User = {
  active: Maybe<Scalars['Boolean']['output']>
  canImpersonate: Maybe<Scalars['Boolean']['output']>
  clId: Maybe<Scalars['ID']['output']>
  costId: Maybe<Scalars['ID']['output']>
  email: Scalars['String']['output']
  id: Maybe<Scalars['ID']['output']>
  name: Scalars['String']['output']
  orgId: Maybe<Scalars['ID']['output']>
  roleId: Maybe<Scalars['ID']['output']>
  userId: Maybe<Scalars['ID']['output']>
}

export type UserImpersonation = {
  email: Maybe<Scalars['String']['output']>
  error: Maybe<Scalars['String']['output']>
  firstName: Maybe<Scalars['String']['output']>
  lastName: Maybe<Scalars['String']['output']>
  userId: Maybe<Scalars['ID']['output']>
}

export type UserPagination = {
  data: Maybe<Array<Maybe<User>>>
  pagination: Maybe<Pagination>
}

export type UserPermissions = {
  permissions: Maybe<Array<Maybe<Scalars['String']['output']>>>
  role: Maybe<SimpleRole>
}

export type Warehouse = {
  /** Unique identifier for the warehouse */
  id: Scalars['ID']['output']
  /** Human friendly name of the warehouse */
  name: Scalars['String']['output']
}

export type WishlistData = {
  createdIn: Maybe<Scalars['String']['output']>
  email: Maybe<Scalars['String']['output']>
  fieldsConfig: Maybe<FieldsConfig>
  id: Maybe<Scalars['ID']['output']>
  isPublic: Maybe<Scalars['Boolean']['output']>
  products: Maybe<Array<Maybe<Products>>>
  wishlistType: Maybe<Scalars['String']['output']>
}

export type WishlistInput = {
  fieldsConfig: InputMaybe<FieldsConfigInput>
  id: InputMaybe<Scalars['ID']['input']>
  isPublic: InputMaybe<Scalars['Boolean']['input']>
  products: InputMaybe<Array<InputMaybe<ProductsInput>>>
  wishlistType: InputMaybe<Scalars['String']['input']>
}

export type ProductSummary_ProductFragment = {
  slug: string
  sku: string
  name: string
  gtin: string
  id: string
  brand: { name: string; brandName: string }
  isVariantOf: { productGroupID: string; name: string }
  image: Array<{ url: string; alternateName: string }>
  offers: {
    lowPrice: number
    lowPriceWithTaxes: number
    offers: Array<{
      availability: string
      price: number
      listPrice: number
      listPriceWithTaxes: number
      quantity: number
      seller: { identifier: string }
    }>
  }
  additionalProperty: Array<{
    propertyID: string
    name: string
    value: any
    valueReference: any
  }>
}

type Filter_Facets_StoreFacetBoolean_Fragment = {
  __typename: 'StoreFacetBoolean'
  key: string
  label: string
  values: Array<{
    label: string
    value: string
    selected: boolean
    quantity: number
  }>
}

type Filter_Facets_StoreFacetRange_Fragment = {
  __typename: 'StoreFacetRange'
  key: string
  label: string
  min: { selected: number; absolute: number }
  max: { selected: number; absolute: number }
}

export type Filter_FacetsFragment =
  | Filter_Facets_StoreFacetBoolean_Fragment
  | Filter_Facets_StoreFacetRange_Fragment

export type ProductDetailsFragment_ProductFragment = {
  sku: string
  name: string
  gtin: string
  description: string
  unitMultiplier: number | null
  id: string
  isVariantOf: {
    name: string
    productGroupID: string
    skuVariants: {
      activeVariations: any | null
      slugsMap: any | null
      availableVariations: any | null
    } | null
  }
  image: Array<{ url: string; alternateName: string }>
  brand: { name: string }
  offers: {
    lowPrice: number
    lowPriceWithTaxes: number
    offers: Array<{
      availability: string
      price: number
      priceWithTaxes: number
      listPrice: number
      listPriceWithTaxes: number
      seller: { identifier: string }
    }>
  }
  additionalProperty: Array<{
    propertyID: string
    name: string
    value: any
    valueReference: any
  }>
}

export type CreateOrganizationMutationVariables = Exact<{
  input: OrganizationInput
  notifyUsers: InputMaybe<Scalars['Boolean']['input']>
}>

export type CreateOrganizationMutation = {
  createOrganization: {
    id: string | null
    costCenterId: string | null
    href: string | null
    status: string | null
  } | null
}

export type CreateUserWithEmailMutationVariables = Exact<{
  roleId: Scalars['ID']['input']
  name: Scalars['String']['input']
  email: Scalars['String']['input']
  orgId: Scalars['ID']['input']
  costId: Scalars['ID']['input']
}>

export type CreateUserWithEmailMutation = {
  createUserWithEmail: { status: string | null } | null
}

export type CreateOrganizationErpMutationVariables = Exact<{
  input: InputMaybe<CreateOrganizationErpInput>
}>

export type CreateOrganizationErpMutation = {
  createOrganizationERP: {
    message: string | null
    requestId: string | null
  } | null
}

export type CostCenterByOrgIdQueryVariables = Exact<{
  id: InputMaybe<Scalars['ID']['input']>
}>

export type CostCenterByOrgIdQuery = {
  getCostCentersByOrganizationId: {
    data: Array<{ id: string | null } | null> | null
  } | null
}

export type GetOrderFormOrgsQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetOrderFormOrgsQuery = {
  orderForm: {
    orderFormId: string
    marketingData: {
      utmCampaign: string | null
      utmMedium: string | null
    } | null
  }
}

export type GetOrganizationsByEmailQueryVariables = Exact<{
  [key: string]: never
}>

export type GetOrganizationsByEmailQuery = {
  getOrganizationsByEmail: Array<{
    id: string | null
    costCenterName: string | null
    costId: string | null
    organizationName: string | null
    organizationStatus: string | null
    orgId: string | null
    role: { id: string | null; name: string } | null
  } | null> | null
}

export type CheckUserPermissionQueryVariables = Exact<{ [key: string]: never }>

export type CheckUserPermissionQuery = {
  checkUserPermission: {
    permissions: Array<string | null> | null
    role: { id: string | null; name: string; slug: string | null } | null
  } | null
}

export type GetOrganizationByIdStorefrontQueryVariables = Exact<{
  orgId: InputMaybe<Scalars['ID']['input']>
}>

export type GetOrganizationByIdStorefrontQuery = {
  getOrganizationByIdStorefront: {
    id: string | null
    name: string | null
    status: string | null
    paymentTerms: Array<{
      id: string | null
      name: string | null
    } | null> | null
  } | null
}

export type GetCostCenterByIdStorefrontQueryVariables = Exact<{
  orgId: InputMaybe<Scalars['ID']['input']>
}>

export type GetCostCenterByIdStorefrontQuery = {
  getCostCenterByIdStorefront: {
    id: string | null
    name: string | null
    organization: string | null
    phoneNumber: string | null
    businessDocument: string | null
    stateRegistration: string | null
    paymentTerms: Array<{
      id: string | null
      name: string | null
    } | null> | null
    addresses: Array<{
      addressId: string | null
      addressType: string | null
      addressQuery: string | null
      postalCode: string | null
      country: string | null
      receiverName: string | null
      city: string | null
      state: string | null
      street: string | null
      number: string | null
      complement: string | null
      neighborhood: string | null
      geoCoordinates: Array<number | null> | null
      reference: string | null
    } | null> | null
  } | null
}

export type GetB2BSettingsQueryVariables = Exact<{ [key: string]: never }>

export type GetB2BSettingsQuery = {
  getB2BSettings: { uiSettings: { showModal: boolean | null } | null } | null
}

export type SetCurrentOrganizationMutationVariables = Exact<{
  orgId: Scalars['ID']['input']
  costId: Scalars['ID']['input']
}>

export type SetCurrentOrganizationMutation = {
  setCurrentOrganization: {
    status: string | null
    message: string | null
  } | null
}

export type GetBrandListQueryVariables = Exact<{ [key: string]: never }>

export type GetBrandListQuery = { brandList: Array<{ name: string }> | null }

export type RemoveExtraPartsMutationVariables = Exact<{
  skuGtin: InputMaybe<Scalars['String']['input']>
}>

export type RemoveExtraPartsMutation = { removeExtraParts: boolean | null }

export type RemoveFolderImprintingMutationVariables = Exact<{
  skuGtin: InputMaybe<Scalars['String']['input']>
}>

export type RemoveFolderImprintingMutation = {
  removeFolderImprinting: boolean | null
}

export type GetOrderFormCartQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetOrderFormCartQuery = {
  orderForm: {
    orderFormId: string
    items: Array<{
      id: string
      quantity: number
      seller: string
      parentItemIndex: number | null
      parentAssemblyBinding: string | null
      listPrice: number
      sellingPrice: number
      skuName: string
    }>
    customData: {
      customApps: Array<{
        id: string
        major: number
        fields: Array<{ key: string; value: string }>
      }>
    } | null
  }
}

export type GetCollectionNameQueryVariables = Exact<{
  collectionId: Scalars['String']['input']
}>

export type GetCollectionNameQuery = {
  getCollectionName: { Name: string | null } | null
}

export type GetBrandQueryVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type GetBrandQuery = { brand: { name: string } | null }

export type GetCollectionDetailsQueryVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type GetCollectionDetailsQuery = {
  collectionDetails: { Name: string } | null
}

export type DepartmentBannerQueryVariables = Exact<{
  department: Scalars['String']['input']
}>

export type DepartmentBannerQuery = {
  departmentBanner: {
    banners: Array<{
      id: string | null
      name: string | null
      html: string | null
    } | null> | null
  } | null
}

export type GetCategoryTreeQueryVariables = Exact<{
  id: Scalars['Int']['input']
  excludeIds: InputMaybe<
    Array<Scalars['Int']['input']> | Scalars['Int']['input']
  >
}>

export type GetCategoryTreeQuery = {
  categoryTree: Array<{
    id: number
    name: string
    url: string
    hasChildren: boolean
    children: Array<{ id: number; name: string; url: string }>
  } | null> | null
}

export type GetCustomDataQueryVariables = Exact<{
  appId: Scalars['String']['input']
  field: Scalars['String']['input']
}>

export type GetCustomDataQuery = { customData: string | null }

export type AddFolderImprintingMutationVariables = Exact<{
  data: Scalars['String']['input']
}>

export type AddFolderImprintingMutation = {
  addFolderImprinting: boolean | null
}

export type AddToCartMutationVariables = Exact<{
  items: Array<ItemInput> | ItemInput
}>

export type AddToCartMutation = {
  addToCart: {
    order: {
      orderNumber: string
      acceptedOffer: Array<{
        quantity: number
        price: number
        priceWithTaxes: number
        listPrice: number
        listPriceWithTaxes: number
        seller: { identifier: string }
        itemOffered: {
          sku: string
          name: string
          unitMultiplier: number | null
          gtin: string
          image: Array<{ url: string; alternateName: string }>
          brand: { name: string }
          isVariantOf: {
            productGroupID: string
            name: string
            skuVariants: {
              activeVariations: any | null
              slugsMap: any | null
              availableVariations: any | null
            } | null
          }
          additionalProperty: Array<{
            propertyID: string
            name: string
            value: any
            valueReference: any
          }>
        }
      }>
    }
    messages: Array<{ text: string; status: StoreStatus }>
  } | null
}

export type RemoveFromCartMutationVariables = Exact<{
  skuId: Scalars['ID']['input']
}>

export type RemoveFromCartMutation = { removeFromCart: boolean }

export type SubscribeNewsletterMutationVariables = Exact<{
  email: InputMaybe<Scalars['String']['input']>
  fields: InputMaybe<NewsletterFieldsInput>
}>

export type SubscribeNewsletterMutation = {
  subscribeNewsletter: boolean | null
}

export type SyncPersistedCartMutationVariables = Exact<{
  email: InputMaybe<Scalars['String']['input']>
  cartId: InputMaybe<Scalars['ID']['input']>
  cart: InputMaybe<CartInputV2>
  cartSerialized: InputMaybe<Scalars['String']['input']>
  revision: InputMaybe<Scalars['Int']['input']>
}>

export type SyncPersistedCartMutation = {
  syncPersistedCart: {
    revision: number | null
    cartSerialized: string | null
    cart: {
      id: string | null
      messages: Array<{
        text: string | null
        status: string | null
      } | null> | null
      items: Array<{
        id: string | null
        quantity: number | null
        price: number | null
        listPrice: number | null
        seller: { identifier: string | null } | null
        itemOffered: {
          sku: string | null
          name: string | null
          unitMultiplier: number | null
          gtin: string | null
          image: Array<{
            url: string | null
            alternateName: string | null
          } | null> | null
          brand: { name: string | null } | null
          isVariantOf: {
            productGroupID: string | null
            name: string | null
            skuVariants: {
              activeVariations: any | null
              slugsMap: any | null
              availableVariations: any | null
            } | null
          } | null
          additionalProperty: Array<{
            propertyID: string | null
            name: string | null
            value: any | null
            valueReference: any | null
          } | null> | null
        } | null
      } | null> | null
    } | null
  } | null
}

export type GetMenuItemsQueryVariables = Exact<{ [key: string]: never }>

export type GetMenuItemsQuery = {
  menuItems: Array<{
    id: string
    parentId: string | null
    type: string
    position: number
    title: string
    url: string | null
    imageUrl: string | null
    altText: string | null
    ctaText: string | null
  } | null> | null
}

export type AddExtraPartsMutationVariables = Exact<{
  extraOrderData: Scalars['String']['input']
}>

export type AddExtraPartsMutation = { addExtraParts: boolean | null }

export type GetOrderFormQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetOrderFormQuery = {
  orderForm: {
    orderFormId: string
    customData: {
      customApps: Array<{
        id: string
        major: number
        fields: Array<{ key: string; value: string }>
      }>
    } | null
  }
}

export type GetFestivalCollectionsQueryVariables = Exact<{
  locator: IStoreSelectedFacet
}>

export type GetFestivalCollectionsQuery = {
  product: {
    isVariantOf: { festivalCollections: Array<{ name: string; slug: string }> }
  }
}

export type GetSubcollectionIdQueryVariables = Exact<{
  collectionId: Scalars['String']['input']
}>

export type GetSubcollectionIdQuery = {
  getSubcollectionId: {
    Data: Array<{ SkuId: number | null } | null> | null
  } | null
}

export type GetStateAndFestivalListsQueryVariables = Exact<{
  [key: string]: never
}>

export type GetStateAndFestivalListsQuery = {
  lists: Array<{
    collectionId: number | null
    level1Label: string | null
    level1Value: string | null
    level2Label: string | null
    level2Value: string | null
    region: string | null
    title: string | null
    type: string | null
  } | null> | null
}

export type GetLitCalItemsQueryVariables = Exact<{ [key: string]: never }>

export type GetLitCalItemsQuery = {
  liturgicalCalendar: Array<{
    season: string | null
    year: string | null
    date: string | null
    dateTitle: string | null
    title: string | null
    type: string | null
    calendar: string | null
  } | null> | null
}

export type GetFacetsQueryVariables = Exact<{
  selectedFacets: InputMaybe<Array<IStoreSelectedFacet> | IStoreSelectedFacet>
}>

export type GetFacetsQuery = {
  search: {
    facets: Array<
      | {
          key: string
          label: string
          values: Array<{
            label: string
            value: string
            selected: boolean
            quantity: number
          }>
        }
      | {}
    >
  }
}

export type ClientManyProductsFragment = {
  search: {
    facets: Array<
      | {
          __typename: 'StoreFacetBoolean'
          key: string
          label: string
          values: Array<{
            label: string
            value: string
            selected: boolean
            quantity: number
          }>
        }
      | {
          __typename: 'StoreFacetRange'
          key: string
          label: string
          min: { selected: number; absolute: number }
          max: { selected: number; absolute: number }
        }
    >
    products: {
      edges: Array<{
        node: {
          description: string
          releaseDate: string
          offers: { highPrice: number }
          breadcrumbList: {
            numberOfItems: number
            itemListElement: Array<{
              item: string
              name: string
              position: number
            }>
          }
          additionalProperty: Array<{
            propertyID: string
            name: string
            value: any
            valueReference: any
          }>
          inventory: Array<{
            availableQuantity: number
            warehouse: { id: string }
          }>
          isVariantOf: {
            additionalProperty: Array<{
              propertyID: string
              name: string
              value: any
              valueReference: any
            }>
            fullVariantList: Array<{
              productID: string
              sku: string
              name: string
              gtin: string
              slug: string
              videos: Array<string>
              isVariantOf: { productGroupID: string; name: string }
              inventory: Array<{
                availableQuantity: number
                warehouse: { id: string }
              }>
              image: Array<{ url: string; alternateName: string }>
              additionalProperty: Array<{
                propertyID: string
                name: string
                value: any
                valueReference: any
              }>
              offers: {
                offers: Array<{
                  availability: string
                  price: number
                  priceValidUntil: string
                  priceCurrency: string
                  listPrice: number
                  seller: { identifier: string }
                }>
              }
            }>
            skuVariants: {
              activeVariations: any | null
              slugsMap: any | null
              availableVariations: any | null
            } | null
          }
        }
      }>
    }
  }
}

export type ClientProductFragment = {
  product: {
    slug: string
    id: string
    assemblyOptions: Array<{
      id: string
      name: string
      composition: {
        items: Array<{
          id: string
          gtin: string
          priceTable: string | null
          seller: string | null
        }>
      } | null
    }>
    inventory: Array<{ availableQuantity: number; warehouse: { id: string } }>
    isVariantOf: {
      additionalProperty: Array<{
        propertyID: string
        name: string
        value: any
        valueReference: any
      }>
    }
  }
}

export type ClientProductGalleryFragment = {
  search: { products: { pageInfo: { totalCount: number } } }
}

export type ClientSearchSuggestionsFragment = {
  search: { suggestions: { terms: Array<{ value: string }> } }
}

export type ClientShippingSimulationFragment = {
  shipping: { address: { city: string | null } | null } | null
}

export type ClientTopSearchSuggestionsFragment = {
  search: { suggestions: { terms: Array<{ value: string }> } }
}

export type ServerCollectionPageFragment = { collection: { id: string } }

export type ServerProductFragment = {
  product: {
    slug: string
    additionalProperty: Array<{ name: string; value: any }>
    inventory: Array<{ availableQuantity: number; warehouse: { id: string } }>
    assemblyOptions: Array<{
      id: string
      name: string
      composition: {
        items: Array<{
          id: string
          gtin: string
          priceTable: string | null
          seller: string | null
        }>
      } | null
    }>
    isVariantOf: {
      additionalProperty: Array<{
        propertyID: string
        name: string
        value: any
        valueReference: any
      }>
      fullVariantList: Array<{
        productID: string
        sku: string
        name: string
        gtin: string
        slug: string
        videos: Array<string>
        isVariantOf: { productGroupID: string; name: string }
        image: Array<{ url: string; alternateName: string }>
        additionalProperty: Array<{
          propertyID: string
          name: string
          value: any
          valueReference: any
        }>
        inventory: Array<{
          availableQuantity: number
          warehouse: { id: string }
        }>
        offers: {
          offers: Array<{
            availability: string
            price: number
            priceValidUntil: string
            priceCurrency: string
            listPrice: number
            seller: { identifier: string }
          }>
        }
      }>
      skuVariants: {
        activeVariations: any | null
        slugsMap: any | null
        availableVariations: any | null
      } | null
    }
  }
}

export type GetSessionTokenQueryVariables = Exact<{ [key: string]: never }>

export type GetSessionTokenQuery = { sessionToken: string | null }

export type ViewListsQueryVariables = Exact<{ [key: string]: never }>

export type ViewListsQuery = {
  getWishlistsByEmail: Array<{
    id: string | null
    email: string | null
    wishlistType: string | null
    isPublic: boolean | null
    createdIn: string | null
    products: Array<{
      ID: number | null
      Image: string | null
      linkProduct: string | null
      nameProduct: string | null
      quantityProduct: number | null
      skuCodeReference: string | null
      department: string | null
      bundle: number | null
      notes: string | null
    } | null> | null
    fieldsConfig: {
      department: string | null
      description: string | null
    } | null
  } | null> | null
}

export type ListByIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type ListByIdQuery = {
  getWishlist: {
    id: string | null
    email: string | null
    wishlistType: string | null
    isPublic: boolean | null
    createdIn: string | null
    products: Array<{
      ID: number | null
      Image: string | null
      linkProduct: string | null
      nameProduct: string | null
      quantityProduct: number | null
      skuCodeReference: string | null
      department: string | null
      bundle: number | null
      notes: string | null
    } | null> | null
    fieldsConfig: {
      department: string | null
      description: string | null
    } | null
  } | null
}

export type CreateListMutationVariables = Exact<{
  wishlist: WishlistInput
}>

export type CreateListMutation = {
  createWishlist: { Id: string | null } | null
}

export type AddToListMutationVariables = Exact<{
  wishlist: InputMaybe<WishlistInput>
}>

export type AddToListMutation = { updateWishlist: { id: string | null } | null }

export type UpdateListItemMutationVariables = Exact<{
  wishlist: InputMaybe<WishlistInput>
}>

export type UpdateListItemMutation = {
  updateWishlist: { id: string | null } | null
}

export type UpdateListMutationVariables = Exact<{
  wishlist: InputMaybe<WishlistInput>
}>

export type UpdateListMutation = {
  updateWishlist: { id: string | null } | null
}

export type ServerCollectionPageQueryQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type ServerCollectionPageQueryQuery = {
  collection: {
    id: string
    seo: { title: string; description: string }
    breadcrumbList: {
      itemListElement: Array<{ item: string; name: string; position: number }>
    }
    meta: { selectedFacets: Array<{ key: string; value: string }> }
  }
}

export type ServerProductQueryQueryVariables = Exact<{
  locator: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type ServerProductQueryQuery = {
  product: {
    sku: string
    gtin: string
    name: string
    description: string
    releaseDate: string
    slug: string
    unitMultiplier: number | null
    id: string
    seo: { title: string; description: string; canonical: string }
    brand: { name: string }
    breadcrumbList: {
      itemListElement: Array<{ item: string; name: string; position: number }>
    }
    image: Array<{ url: string; alternateName: string }>
    offers: {
      lowPrice: number
      highPrice: number
      lowPriceWithTaxes: number
      priceCurrency: string
      offers: Array<{
        availability: string
        price: number
        priceValidUntil: string
        priceCurrency: string
        itemCondition: string
        priceWithTaxes: number
        listPrice: number
        listPriceWithTaxes: number
        seller: { identifier: string }
      }>
    }
    isVariantOf: {
      productGroupID: string
      name: string
      additionalProperty: Array<{
        propertyID: string
        name: string
        value: any
        valueReference: any
      }>
      fullVariantList: Array<{
        productID: string
        sku: string
        name: string
        gtin: string
        slug: string
        videos: Array<string>
        isVariantOf: { productGroupID: string; name: string }
        image: Array<{ url: string; alternateName: string }>
        additionalProperty: Array<{
          propertyID: string
          name: string
          value: any
          valueReference: any
        }>
        inventory: Array<{
          availableQuantity: number
          warehouse: { id: string }
        }>
        offers: {
          offers: Array<{
            availability: string
            price: number
            priceValidUntil: string
            priceCurrency: string
            listPrice: number
            seller: { identifier: string }
          }>
        }
      }>
      skuVariants: {
        activeVariations: any | null
        slugsMap: any | null
        availableVariations: any | null
      } | null
    }
    additionalProperty: Array<{
      propertyID: string
      name: string
      value: any
      valueReference: any
    }>
    inventory: Array<{ availableQuantity: number; warehouse: { id: string } }>
    assemblyOptions: Array<{
      id: string
      name: string
      composition: {
        items: Array<{
          id: string
          gtin: string
          priceTable: string | null
          seller: string | null
        }>
      } | null
    }>
  }
}

export type ValidateCartMutationMutationVariables = Exact<{
  cart: IStoreCart
  session: IStoreSession
}>

export type ValidateCartMutationMutation = {
  validateCart: {
    order: {
      orderNumber: string
      acceptedOffer: Array<{
        quantity: number
        price: number
        priceWithTaxes: number
        listPrice: number
        listPriceWithTaxes: number
        seller: { identifier: string }
        itemOffered: {
          sku: string
          name: string
          unitMultiplier: number | null
          gtin: string
          image: Array<{ url: string; alternateName: string }>
          brand: { name: string }
          isVariantOf: {
            productGroupID: string
            name: string
            skuVariants: {
              activeVariations: any | null
              slugsMap: any | null
              availableVariations: any | null
            } | null
          }
          additionalProperty: Array<{
            propertyID: string
            name: string
            value: any
            valueReference: any
          }>
        }
      }>
    }
    messages: Array<{ text: string; status: StoreStatus }>
  } | null
}

export type CartMessageFragment = { text: string; status: StoreStatus }

export type CartItemFragment = {
  quantity: number
  price: number
  priceWithTaxes: number
  listPrice: number
  listPriceWithTaxes: number
  seller: { identifier: string }
  itemOffered: {
    sku: string
    name: string
    unitMultiplier: number | null
    gtin: string
    image: Array<{ url: string; alternateName: string }>
    brand: { name: string }
    isVariantOf: {
      productGroupID: string
      name: string
      skuVariants: {
        activeVariations: any | null
        slugsMap: any | null
        availableVariations: any | null
      } | null
    }
    additionalProperty: Array<{
      propertyID: string
      name: string
      value: any
      valueReference: any
    }>
  }
}

export type CartProductItemFragment = {
  sku: string
  name: string
  unitMultiplier: number | null
  gtin: string
  image: Array<{ url: string; alternateName: string }>
  brand: { name: string }
  isVariantOf: {
    productGroupID: string
    name: string
    skuVariants: {
      activeVariations: any | null
      slugsMap: any | null
      availableVariations: any | null
    } | null
  }
  additionalProperty: Array<{
    propertyID: string
    name: string
    value: any
    valueReference: any
  }>
}

export type SubscribeToNewsletterMutationVariables = Exact<{
  data: IPersonNewsletter
}>

export type SubscribeToNewsletterMutation = {
  subscribeToNewsletter: { id: string } | null
}

export type ClientManyProductsQueryQueryVariables = Exact<{
  first: Scalars['Int']['input']
  after: InputMaybe<Scalars['String']['input']>
  sort: StoreSort
  term: Scalars['String']['input']
  selectedFacets: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type ClientManyProductsQueryQuery = {
  search: {
    products: {
      pageInfo: { totalCount: number }
      edges: Array<{
        node: {
          description: string
          releaseDate: string
          slug: string
          sku: string
          name: string
          gtin: string
          id: string
          offers: {
            highPrice: number
            lowPrice: number
            lowPriceWithTaxes: number
            offers: Array<{
              availability: string
              price: number
              listPrice: number
              listPriceWithTaxes: number
              quantity: number
              seller: { identifier: string }
            }>
          }
          breadcrumbList: {
            numberOfItems: number
            itemListElement: Array<{
              item: string
              name: string
              position: number
            }>
          }
          additionalProperty: Array<{
            propertyID: string
            name: string
            value: any
            valueReference: any
          }>
          inventory: Array<{
            availableQuantity: number
            warehouse: { id: string }
          }>
          isVariantOf: {
            productGroupID: string
            name: string
            additionalProperty: Array<{
              propertyID: string
              name: string
              value: any
              valueReference: any
            }>
            fullVariantList: Array<{
              productID: string
              sku: string
              name: string
              gtin: string
              slug: string
              videos: Array<string>
              isVariantOf: { productGroupID: string; name: string }
              image: Array<{ url: string; alternateName: string }>
              additionalProperty: Array<{
                propertyID: string
                name: string
                value: any
                valueReference: any
              }>
              inventory: Array<{
                availableQuantity: number
                warehouse: { id: string }
              }>
              offers: {
                offers: Array<{
                  availability: string
                  price: number
                  priceValidUntil: string
                  priceCurrency: string
                  listPrice: number
                  seller: { identifier: string }
                }>
              }
            }>
            skuVariants: {
              activeVariations: any | null
              slugsMap: any | null
              availableVariations: any | null
            } | null
          }
          brand: { name: string; brandName: string }
          image: Array<{ url: string; alternateName: string }>
        }
      }>
    }
    facets: Array<
      | {
          __typename: 'StoreFacetBoolean'
          key: string
          label: string
          values: Array<{
            label: string
            value: string
            selected: boolean
            quantity: number
          }>
        }
      | {
          __typename: 'StoreFacetRange'
          key: string
          label: string
          min: { selected: number; absolute: number }
          max: { selected: number; absolute: number }
        }
    >
  }
}

export type ClientProductGalleryQueryQueryVariables = Exact<{
  first: Scalars['Int']['input']
  after: Scalars['String']['input']
  sort: StoreSort
  term: Scalars['String']['input']
  selectedFacets: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type ClientProductGalleryQueryQuery = {
  redirect: { url: string | null } | null
  search: {
    products: { pageInfo: { totalCount: number } }
    facets: Array<
      | {
          __typename: 'StoreFacetBoolean'
          key: string
          label: string
          values: Array<{
            label: string
            value: string
            selected: boolean
            quantity: number
          }>
        }
      | {
          __typename: 'StoreFacetRange'
          key: string
          label: string
          min: { selected: number; absolute: number }
          max: { selected: number; absolute: number }
        }
    >
    metadata: { isTermMisspelled: boolean; logicalOperator: string } | null
  }
}

export type SearchEvent_MetadataFragment = {
  isTermMisspelled: boolean
  logicalOperator: string
}

export type ClientProductQueryQueryVariables = Exact<{
  locator: Array<IStoreSelectedFacet> | IStoreSelectedFacet
}>

export type ClientProductQueryQuery = {
  product: {
    slug: string
    sku: string
    name: string
    gtin: string
    description: string
    unitMultiplier: number | null
    id: string
    assemblyOptions: Array<{
      id: string
      name: string
      composition: {
        items: Array<{
          id: string
          gtin: string
          priceTable: string | null
          seller: string | null
        }>
      } | null
    }>
    inventory: Array<{ availableQuantity: number; warehouse: { id: string } }>
    isVariantOf: {
      name: string
      productGroupID: string
      additionalProperty: Array<{
        propertyID: string
        name: string
        value: any
        valueReference: any
      }>
      skuVariants: {
        activeVariations: any | null
        slugsMap: any | null
        availableVariations: any | null
      } | null
    }
    image: Array<{ url: string; alternateName: string }>
    brand: { name: string }
    offers: {
      lowPrice: number
      lowPriceWithTaxes: number
      offers: Array<{
        availability: string
        price: number
        priceWithTaxes: number
        listPrice: number
        listPriceWithTaxes: number
        seller: { identifier: string }
      }>
    }
    additionalProperty: Array<{
      propertyID: string
      name: string
      value: any
      valueReference: any
    }>
  }
}

export type ClientSearchSuggestionsQueryQueryVariables = Exact<{
  term: Scalars['String']['input']
  selectedFacets: InputMaybe<Array<IStoreSelectedFacet> | IStoreSelectedFacet>
}>

export type ClientSearchSuggestionsQueryQuery = {
  search: {
    suggestions: {
      terms: Array<{ value: string }>
      products: Array<{
        slug: string
        sku: string
        name: string
        gtin: string
        id: string
        brand: { name: string; brandName: string }
        isVariantOf: { productGroupID: string; name: string }
        image: Array<{ url: string; alternateName: string }>
        offers: {
          lowPrice: number
          lowPriceWithTaxes: number
          offers: Array<{
            availability: string
            price: number
            listPrice: number
            listPriceWithTaxes: number
            quantity: number
            seller: { identifier: string }
          }>
        }
        additionalProperty: Array<{
          propertyID: string
          name: string
          value: any
          valueReference: any
        }>
      }>
    }
    products: { pageInfo: { totalCount: number } }
    metadata: { isTermMisspelled: boolean; logicalOperator: string } | null
  }
}

export type ClientTopSearchSuggestionsQueryQueryVariables = Exact<{
  term: Scalars['String']['input']
  selectedFacets: InputMaybe<Array<IStoreSelectedFacet> | IStoreSelectedFacet>
}>

export type ClientTopSearchSuggestionsQueryQuery = {
  search: { suggestions: { terms: Array<{ value: string }> } }
}

export type ValidateSessionMutationVariables = Exact<{
  session: IStoreSession
  search: Scalars['String']['input']
}>

export type ValidateSessionMutation = {
  validateSession: {
    locale: string
    channel: string | null
    country: string
    addressType: string | null
    postalCode: string | null
    deliveryMode: {
      deliveryChannel: string
      deliveryMethod: string
      deliveryWindow: { startDate: string; endDate: string } | null
    } | null
    geoCoordinates: { latitude: number; longitude: number } | null
    currency: { code: string; symbol: string }
    person: {
      id: string
      email: string
      givenName: string
      familyName: string
    } | null
  } | null
}

export type ClientShippingSimulationQueryQueryVariables = Exact<{
  postalCode: Scalars['String']['input']
  country: Scalars['String']['input']
  items: Array<IShippingItem> | IShippingItem
}>

export type ClientShippingSimulationQueryQuery = {
  shipping: {
    logisticsInfo: Array<{
      slas: Array<{
        carrier: string | null
        price: number | null
        shippingEstimate: string | null
        localizedEstimates: string | null
        availableDeliveryWindows: Array<{
          startDateUtc: string | null
          endDateUtc: string | null
          price: number | null
          listPrice: number | null
        } | null> | null
      } | null> | null
    } | null> | null
    address: {
      city: string | null
      neighborhood: string | null
      state: string | null
    } | null
  } | null
}

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType']

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value)
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value
  }
}
export const ProductSummary_ProductFragmentDoc = new TypedDocumentString(
  `
    fragment ProductSummary_product on StoreProduct {
  id: productID
  slug
  sku
  brand {
    brandName: name
  }
  name
  gtin
  isVariantOf {
    productGroupID
    name
  }
  image {
    url
    alternateName
  }
  brand {
    name
  }
  offers {
    lowPrice
    lowPriceWithTaxes
    offers {
      availability
      price
      listPrice
      listPriceWithTaxes
      quantity
      seller {
        identifier
      }
    }
  }
  additionalProperty {
    propertyID
    name
    value
    valueReference
  }
}
    `,
  { fragmentName: 'ProductSummary_product' }
) as unknown as TypedDocumentString<ProductSummary_ProductFragment, unknown>
export const Filter_FacetsFragmentDoc = new TypedDocumentString(
  `
    fragment Filter_facets on StoreFacet {
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
    `,
  { fragmentName: 'Filter_facets' }
) as unknown as TypedDocumentString<Filter_FacetsFragment, unknown>
export const CartProductItemFragmentDoc = new TypedDocumentString(
  `
    fragment CartProductItem on StoreProduct {
  sku
  name
  unitMultiplier
  image {
    url
    alternateName
  }
  brand {
    name
  }
  isVariantOf {
    productGroupID
    name
    skuVariants {
      activeVariations
      slugsMap
      availableVariations
    }
  }
  gtin
  additionalProperty {
    propertyID
    name
    value
    valueReference
  }
}
    `,
  { fragmentName: 'CartProductItem' }
) as unknown as TypedDocumentString<CartProductItemFragment, unknown>
export const ProductDetailsFragment_ProductFragmentDoc =
  new TypedDocumentString(
    `
    fragment ProductDetailsFragment_product on StoreProduct {
  id: productID
  sku
  name
  gtin
  description
  unitMultiplier
  isVariantOf {
    name
    productGroupID
    skuVariants {
      activeVariations
      slugsMap
      availableVariations
    }
  }
  image {
    url
    alternateName
  }
  brand {
    name
  }
  offers {
    lowPrice
    lowPriceWithTaxes
    offers {
      availability
      price
      priceWithTaxes
      listPrice
      listPriceWithTaxes
      seller {
        identifier
      }
    }
  }
  additionalProperty {
    propertyID
    name
    value
    valueReference
  }
  ...CartProductItem
}
    fragment CartProductItem on StoreProduct {
  sku
  name
  unitMultiplier
  image {
    url
    alternateName
  }
  brand {
    name
  }
  isVariantOf {
    productGroupID
    name
    skuVariants {
      activeVariations
      slugsMap
      availableVariations
    }
  }
  gtin
  additionalProperty {
    propertyID
    name
    value
    valueReference
  }
}`,
    { fragmentName: 'ProductDetailsFragment_product' }
  ) as unknown as TypedDocumentString<
    ProductDetailsFragment_ProductFragment,
    unknown
  >
export const ClientManyProductsFragmentDoc = new TypedDocumentString(
  `
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
          breadcrumbList {
            itemListElement {
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
    `,
  { fragmentName: 'ClientManyProducts' }
) as unknown as TypedDocumentString<ClientManyProductsFragment, unknown>
export const ClientProductFragmentDoc = new TypedDocumentString(
  `
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
    `,
  { fragmentName: 'ClientProduct' }
) as unknown as TypedDocumentString<ClientProductFragment, unknown>
export const ClientProductGalleryFragmentDoc = new TypedDocumentString(
  `
    fragment ClientProductGallery on Query {
  search(
    first: $first
    after: $after
    sort: $sort
    term: $term
    selectedFacets: $selectedFacets
  ) {
    products {
      pageInfo {
        totalCount
      }
    }
  }
}
    `,
  { fragmentName: 'ClientProductGallery' }
) as unknown as TypedDocumentString<ClientProductGalleryFragment, unknown>
export const ClientSearchSuggestionsFragmentDoc = new TypedDocumentString(
  `
    fragment ClientSearchSuggestions on Query {
  search(first: 5, term: $term, selectedFacets: $selectedFacets) {
    suggestions {
      terms {
        value
      }
    }
  }
}
    `,
  { fragmentName: 'ClientSearchSuggestions' }
) as unknown as TypedDocumentString<ClientSearchSuggestionsFragment, unknown>
export const ClientShippingSimulationFragmentDoc = new TypedDocumentString(
  `
    fragment ClientShippingSimulation on Query {
  shipping(items: $items, postalCode: $postalCode, country: $country) {
    address {
      city
    }
  }
}
    `,
  { fragmentName: 'ClientShippingSimulation' }
) as unknown as TypedDocumentString<ClientShippingSimulationFragment, unknown>
export const ClientTopSearchSuggestionsFragmentDoc = new TypedDocumentString(
  `
    fragment ClientTopSearchSuggestions on Query {
  search(first: 5, term: $term, selectedFacets: $selectedFacets) {
    suggestions {
      terms {
        value
      }
    }
  }
}
    `,
  { fragmentName: 'ClientTopSearchSuggestions' }
) as unknown as TypedDocumentString<ClientTopSearchSuggestionsFragment, unknown>
export const ServerCollectionPageFragmentDoc = new TypedDocumentString(
  `
    fragment ServerCollectionPage on Query {
  collection(slug: $slug) {
    id
  }
}
    `,
  { fragmentName: 'ServerCollectionPage' }
) as unknown as TypedDocumentString<ServerCollectionPageFragment, unknown>
export const ServerProductFragmentDoc = new TypedDocumentString(
  `
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
    `,
  { fragmentName: 'ServerProduct' }
) as unknown as TypedDocumentString<ServerProductFragment, unknown>
export const CartMessageFragmentDoc = new TypedDocumentString(
  `
    fragment CartMessage on StoreCartMessage {
  text
  status
}
    `,
  { fragmentName: 'CartMessage' }
) as unknown as TypedDocumentString<CartMessageFragment, unknown>
export const CartItemFragmentDoc = new TypedDocumentString(
  `
    fragment CartItem on StoreOffer {
  seller {
    identifier
  }
  quantity
  price
  priceWithTaxes
  listPrice
  listPriceWithTaxes
  itemOffered {
    ...CartProductItem
  }
}
    fragment CartProductItem on StoreProduct {
  sku
  name
  unitMultiplier
  image {
    url
    alternateName
  }
  brand {
    name
  }
  isVariantOf {
    productGroupID
    name
    skuVariants {
      activeVariations
      slugsMap
      availableVariations
    }
  }
  gtin
  additionalProperty {
    propertyID
    name
    value
    valueReference
  }
}`,
  { fragmentName: 'CartItem' }
) as unknown as TypedDocumentString<CartItemFragment, unknown>
export const SearchEvent_MetadataFragmentDoc = new TypedDocumentString(
  `
    fragment SearchEvent_metadata on SearchMetadata {
  isTermMisspelled
  logicalOperator
}
    `,
  { fragmentName: 'SearchEvent_metadata' }
) as unknown as TypedDocumentString<SearchEvent_MetadataFragment, unknown>
export const CreateOrganizationDocument = {
  __meta__: {
    operationName: 'CreateOrganization',
    operationHash: '7c4de53a82ae83ffc9601df1cb8d3b088e8e9e27',
  },
} as unknown as TypedDocumentString<
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables
>
export const CreateUserWithEmailDocument = {
  __meta__: {
    operationName: 'CreateUserWithEmail',
    operationHash: '4fe84321042f6aa252abffd27ad10115e3033934',
  },
} as unknown as TypedDocumentString<
  CreateUserWithEmailMutation,
  CreateUserWithEmailMutationVariables
>
export const CreateOrganizationErpDocument = {
  __meta__: {
    operationName: 'CreateOrganizationERP',
    operationHash: 'd6dc913682dba4e15524b806ffba43b4f16ca2d3',
  },
} as unknown as TypedDocumentString<
  CreateOrganizationErpMutation,
  CreateOrganizationErpMutationVariables
>
export const CostCenterByOrgIdDocument = {
  __meta__: {
    operationName: 'CostCenterByOrgId',
    operationHash: 'af0baa4e2e90f329cc425d0f61fc3b13773f711e',
  },
} as unknown as TypedDocumentString<
  CostCenterByOrgIdQuery,
  CostCenterByOrgIdQueryVariables
>
export const GetOrderFormOrgsDocument = {
  __meta__: {
    operationName: 'getOrderFormOrgs',
    operationHash: '8436ae65ccfd820c202ae9ee02af0329eacd9063',
  },
} as unknown as TypedDocumentString<
  GetOrderFormOrgsQuery,
  GetOrderFormOrgsQueryVariables
>
export const GetOrganizationsByEmailDocument = {
  __meta__: {
    operationName: 'GetOrganizationsByEmail',
    operationHash: 'dcea3ab730440bd9014b08fc69742cde8c3cf5b1',
  },
} as unknown as TypedDocumentString<
  GetOrganizationsByEmailQuery,
  GetOrganizationsByEmailQueryVariables
>
export const CheckUserPermissionDocument = {
  __meta__: {
    operationName: 'CheckUserPermission',
    operationHash: '27f8609938ae48927ac45cf0281811665e5bcb80',
  },
} as unknown as TypedDocumentString<
  CheckUserPermissionQuery,
  CheckUserPermissionQueryVariables
>
export const GetOrganizationByIdStorefrontDocument = {
  __meta__: {
    operationName: 'GetOrganizationByIdStorefront',
    operationHash: '7928aa27a1d4d1969ad1d80e8eaaf85b4b240087',
  },
} as unknown as TypedDocumentString<
  GetOrganizationByIdStorefrontQuery,
  GetOrganizationByIdStorefrontQueryVariables
>
export const GetCostCenterByIdStorefrontDocument = {
  __meta__: {
    operationName: 'GetCostCenterByIdStorefront',
    operationHash: '62864d71963e469101b77a00a75641c6dd0cfb0b',
  },
} as unknown as TypedDocumentString<
  GetCostCenterByIdStorefrontQuery,
  GetCostCenterByIdStorefrontQueryVariables
>
export const GetB2BSettingsDocument = {
  __meta__: {
    operationName: 'GetB2BSettings',
    operationHash: '175698fd05ed377ea00d9ba5bfb39816c9bb4cdc',
  },
} as unknown as TypedDocumentString<
  GetB2BSettingsQuery,
  GetB2BSettingsQueryVariables
>
export const SetCurrentOrganizationDocument = {
  __meta__: {
    operationName: 'SetCurrentOrganization',
    operationHash: '4f8263eb7200c988c0ac3e4e6fb90b14187e168f',
  },
} as unknown as TypedDocumentString<
  SetCurrentOrganizationMutation,
  SetCurrentOrganizationMutationVariables
>
export const GetBrandListDocument = {
  __meta__: {
    operationName: 'getBrandList',
    operationHash: '763f1de5da8e3d6983c9080bc1beaeb471c489f5',
  },
} as unknown as TypedDocumentString<
  GetBrandListQuery,
  GetBrandListQueryVariables
>
export const RemoveExtraPartsDocument = {
  __meta__: {
    operationName: 'removeExtraParts',
    operationHash: '1b47d592ef59ac788f4d4b67296374048215bf6d',
  },
} as unknown as TypedDocumentString<
  RemoveExtraPartsMutation,
  RemoveExtraPartsMutationVariables
>
export const RemoveFolderImprintingDocument = {
  __meta__: {
    operationName: 'removeFolderImprinting',
    operationHash: 'efc39ec2e895a52cdd05c121de652dd00a38a1d4',
  },
} as unknown as TypedDocumentString<
  RemoveFolderImprintingMutation,
  RemoveFolderImprintingMutationVariables
>
export const GetOrderFormCartDocument = {
  __meta__: {
    operationName: 'getOrderFormCart',
    operationHash: 'ed119248b5ab816aa05ace4ae643c280394562d1',
  },
} as unknown as TypedDocumentString<
  GetOrderFormCartQuery,
  GetOrderFormCartQueryVariables
>
export const GetCollectionNameDocument = {
  __meta__: {
    operationName: 'getCollectionName',
    operationHash: 'ed4d9108bd20601759c35963b6a7c9dbfee264c5',
  },
} as unknown as TypedDocumentString<
  GetCollectionNameQuery,
  GetCollectionNameQueryVariables
>
export const GetBrandDocument = {
  __meta__: {
    operationName: 'getBrand',
    operationHash: 'fd2862eb80dd9f8c3de265c314395d0877daa7c1',
  },
} as unknown as TypedDocumentString<GetBrandQuery, GetBrandQueryVariables>
export const GetCollectionDetailsDocument = {
  __meta__: {
    operationName: 'getCollectionDetails',
    operationHash: '35ae757860f54a2ccb3b8de627c56d73c80c1fa8',
  },
} as unknown as TypedDocumentString<
  GetCollectionDetailsQuery,
  GetCollectionDetailsQueryVariables
>
export const DepartmentBannerDocument = {
  __meta__: {
    operationName: 'departmentBanner',
    operationHash: '427c9883a7230e9c8039d0ca54a4cbc4e75a4caa',
  },
} as unknown as TypedDocumentString<
  DepartmentBannerQuery,
  DepartmentBannerQueryVariables
>
export const GetCategoryTreeDocument = {
  __meta__: {
    operationName: 'getCategoryTree',
    operationHash: '11ce99765a02ab2429cecf1efbf71d12ab030dfe',
  },
} as unknown as TypedDocumentString<
  GetCategoryTreeQuery,
  GetCategoryTreeQueryVariables
>
export const GetCustomDataDocument = {
  __meta__: {
    operationName: 'getCustomData',
    operationHash: '6798442dd3f1f189a61787371404d6fae3d83d2a',
  },
} as unknown as TypedDocumentString<
  GetCustomDataQuery,
  GetCustomDataQueryVariables
>
export const AddFolderImprintingDocument = {
  __meta__: {
    operationName: 'addFolderImprinting',
    operationHash: '535acea70178fee01332dd87b2b8186d76818f0f',
  },
} as unknown as TypedDocumentString<
  AddFolderImprintingMutation,
  AddFolderImprintingMutationVariables
>
export const AddToCartDocument = {
  __meta__: {
    operationName: 'addToCart',
    operationHash: '3fd1f491f9b2e76455e7cd6e2dfdcc9f8c2b1f01',
  },
} as unknown as TypedDocumentString<
  AddToCartMutation,
  AddToCartMutationVariables
>
export const RemoveFromCartDocument = {
  __meta__: {
    operationName: 'removeFromCart',
    operationHash: 'e7654e11ec337f30956b1500e639a26e8ff2afc7',
  },
} as unknown as TypedDocumentString<
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables
>
export const SubscribeNewsletterDocument = {
  __meta__: {
    operationName: 'subscribeNewsletter',
    operationHash: 'ed41faa6fefcc1c2e5a7a910773fc4548eccfb32',
  },
} as unknown as TypedDocumentString<
  SubscribeNewsletterMutation,
  SubscribeNewsletterMutationVariables
>
export const SyncPersistedCartDocument = {
  __meta__: {
    operationName: 'syncPersistedCart',
    operationHash: '5786447fc5af5c37179af77c9bc5fb7d0c3ea67a',
  },
} as unknown as TypedDocumentString<
  SyncPersistedCartMutation,
  SyncPersistedCartMutationVariables
>
export const GetMenuItemsDocument = {
  __meta__: {
    operationName: 'getMenuItems',
    operationHash: '9f9b7b2ad89fe053a61ba040a856997bd4ba1535',
  },
} as unknown as TypedDocumentString<
  GetMenuItemsQuery,
  GetMenuItemsQueryVariables
>
export const AddExtraPartsDocument = {
  __meta__: {
    operationName: 'addExtraParts',
    operationHash: 'ed54929004dad41486557a66e1b14d74a3be7149',
  },
} as unknown as TypedDocumentString<
  AddExtraPartsMutation,
  AddExtraPartsMutationVariables
>
export const GetOrderFormDocument = {
  __meta__: {
    operationName: 'getOrderForm',
    operationHash: '1a1f1d868594142a90894625c2069f391d7303b5',
  },
} as unknown as TypedDocumentString<
  GetOrderFormQuery,
  GetOrderFormQueryVariables
>
export const GetFestivalCollectionsDocument = {
  __meta__: {
    operationName: 'getFestivalCollections',
    operationHash: '39ce18a77af374262ed8192ab68353cb7c111386',
  },
} as unknown as TypedDocumentString<
  GetFestivalCollectionsQuery,
  GetFestivalCollectionsQueryVariables
>
export const GetSubcollectionIdDocument = {
  __meta__: {
    operationName: 'getSubcollectionId',
    operationHash: 'e700dee4a587ccf4ff5efd4f25af5bedd42195e6',
  },
} as unknown as TypedDocumentString<
  GetSubcollectionIdQuery,
  GetSubcollectionIdQueryVariables
>
export const GetStateAndFestivalListsDocument = {
  __meta__: {
    operationName: 'getStateAndFestivalLists',
    operationHash: '2b0ae460b6b0662b2b5404b8abcbd229a789f59a',
  },
} as unknown as TypedDocumentString<
  GetStateAndFestivalListsQuery,
  GetStateAndFestivalListsQueryVariables
>
export const GetLitCalItemsDocument = {
  __meta__: {
    operationName: 'getLitCalItems',
    operationHash: '253530d3cadfa20c7ecb7bc4cad38cabd25da33c',
  },
} as unknown as TypedDocumentString<
  GetLitCalItemsQuery,
  GetLitCalItemsQueryVariables
>
export const GetFacetsDocument = {
  __meta__: {
    operationName: 'getFacets',
    operationHash: '30c870f2ab2023669f3ccd660f06443fdf6f5de1',
  },
} as unknown as TypedDocumentString<GetFacetsQuery, GetFacetsQueryVariables>
export const GetSessionTokenDocument = {
  __meta__: {
    operationName: 'getSessionToken',
    operationHash: 'babf48393131313955eb0cfa004378108c17e862',
  },
} as unknown as TypedDocumentString<
  GetSessionTokenQuery,
  GetSessionTokenQueryVariables
>
export const ViewListsDocument = {
  __meta__: {
    operationName: 'ViewLists',
    operationHash: '1c7a49005a5646615a9af8b1b6de1bbbfd3ae1fb',
  },
} as unknown as TypedDocumentString<ViewListsQuery, ViewListsQueryVariables>
export const ListByIdDocument = {
  __meta__: {
    operationName: 'listById',
    operationHash: 'f13c88ee642f47afdd420797983c7fd8d6a67d5e',
  },
} as unknown as TypedDocumentString<ListByIdQuery, ListByIdQueryVariables>
export const CreateListDocument = {
  __meta__: {
    operationName: 'CreateList',
    operationHash: '91f29e23c5d9eb4e6ae34cfb1f5416ea6e422109',
  },
} as unknown as TypedDocumentString<
  CreateListMutation,
  CreateListMutationVariables
>
export const AddToListDocument = {
  __meta__: {
    operationName: 'AddToList',
    operationHash: 'e420eb6abeb99afed645130b94ff519909fe1e06',
  },
} as unknown as TypedDocumentString<
  AddToListMutation,
  AddToListMutationVariables
>
export const UpdateListItemDocument = {
  __meta__: {
    operationName: 'UpdateListItem',
    operationHash: '629429e68ef43230d8b7c308ea3b29c739e12349',
  },
} as unknown as TypedDocumentString<
  UpdateListItemMutation,
  UpdateListItemMutationVariables
>
export const UpdateListDocument = {
  __meta__: {
    operationName: 'UpdateList',
    operationHash: 'ab297d30539d8d4bb48060afc8ec63f723a4e59f',
  },
} as unknown as TypedDocumentString<
  UpdateListMutation,
  UpdateListMutationVariables
>
export const ServerCollectionPageQueryDocument = {
  __meta__: {
    operationName: 'ServerCollectionPageQuery',
    operationHash: '4b33c5c07f440dc7489e55619dc2211a13786e72',
  },
} as unknown as TypedDocumentString<
  ServerCollectionPageQueryQuery,
  ServerCollectionPageQueryQueryVariables
>
export const ServerProductQueryDocument = {
  __meta__: {
    operationName: 'ServerProductQuery',
    operationHash: '37debe5b6b6d7fb1b9d068c429a651acfd36fd71',
  },
} as unknown as TypedDocumentString<
  ServerProductQueryQuery,
  ServerProductQueryQueryVariables
>
export const ValidateCartMutationDocument = {
  __meta__: {
    operationName: 'ValidateCartMutation',
    operationHash: '324471076994dca94a47adcaf1c6b8f7896e1b4f',
  },
} as unknown as TypedDocumentString<
  ValidateCartMutationMutation,
  ValidateCartMutationMutationVariables
>
export const SubscribeToNewsletterDocument = {
  __meta__: {
    operationName: 'SubscribeToNewsletter',
    operationHash: 'feb7005103a859e2bc8cf2360d568806fd88deba',
  },
} as unknown as TypedDocumentString<
  SubscribeToNewsletterMutation,
  SubscribeToNewsletterMutationVariables
>
export const ClientManyProductsQueryDocument = {
  __meta__: {
    operationName: 'ClientManyProductsQuery',
    operationHash: '7502816e220673d05de1372e77ad6e797dd04559',
  },
} as unknown as TypedDocumentString<
  ClientManyProductsQueryQuery,
  ClientManyProductsQueryQueryVariables
>
export const ClientProductGalleryQueryDocument = {
  __meta__: {
    operationName: 'ClientProductGalleryQuery',
    operationHash: '177fe68cb385737b0901fc9e105f0a4813e18a20',
  },
} as unknown as TypedDocumentString<
  ClientProductGalleryQueryQuery,
  ClientProductGalleryQueryQueryVariables
>
export const ClientProductQueryDocument = {
  __meta__: {
    operationName: 'ClientProductQuery',
    operationHash: '274cacc172e36152d5725ed7279d30665204bbea',
  },
} as unknown as TypedDocumentString<
  ClientProductQueryQuery,
  ClientProductQueryQueryVariables
>
export const ClientSearchSuggestionsQueryDocument = {
  __meta__: {
    operationName: 'ClientSearchSuggestionsQuery',
    operationHash: '71809c86cb940861f01bcc57dbaf57e6f41cb378',
  },
} as unknown as TypedDocumentString<
  ClientSearchSuggestionsQueryQuery,
  ClientSearchSuggestionsQueryQueryVariables
>
export const ClientTopSearchSuggestionsQueryDocument = {
  __meta__: {
    operationName: 'ClientTopSearchSuggestionsQuery',
    operationHash: 'e2385b0f11726d0068f96548f57a8dd441c064e3',
  },
} as unknown as TypedDocumentString<
  ClientTopSearchSuggestionsQueryQuery,
  ClientTopSearchSuggestionsQueryQueryVariables
>
export const ValidateSessionDocument = {
  __meta__: {
    operationName: 'ValidateSession',
    operationHash: '5696202828f9275216a445e316ebf516f168c506',
  },
} as unknown as TypedDocumentString<
  ValidateSessionMutation,
  ValidateSessionMutationVariables
>
export const ClientShippingSimulationQueryDocument = {
  __meta__: {
    operationName: 'ClientShippingSimulationQuery',
    operationHash: 'd6667f1de2a26b94b9b55f4b25d7d823f82635a0',
  },
} as unknown as TypedDocumentString<
  ClientShippingSimulationQueryQuery,
  ClientShippingSimulationQueryQueryVariables
>
