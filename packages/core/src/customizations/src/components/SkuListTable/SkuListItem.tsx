import { useRouter } from 'next/router'
import { ProductPrice } from '@faststore/ui'
import classNames from 'classnames'

import AvailabilityMessage from '../AvailabilityMessage/AvailabilityMessage'
import Limited from './Limited'
import PreviewAudioAndScore from './PreviewAudioAndScore'
import PreviewRange from './PreviewRange'
import PreviewVideo from './PreviewVideo'
import ProductQuantityInputDesktop from '../ProductQuantityInput/ProductQuantityInputDesktop'
import ProductQuantityInputMobile from '../ProductQuantityInput/ProductQuantityInputMobile'
import MobilePreviewDrawer from './MobilePreviewDrawer'
import MobileSaveDrawer from './MobileSaveDrawer'
import NewBadge from '../Badges/NewBadge'
import SaleBadge from '../Badges/SaleBadge'
import NotInStockMessage from '../NotInStockMessage/NotInStockMessage'
import ExtraPartsIcon from '../Icons/General/ExtraPartsIcon'
import DeliveryMethod from '../DeliveryMethod/DeliveryMethod'
import OrderExtraModal from '../OrderExtraParts/OrderExtraModal'
import ReproducibilityMessage from '../ReproducibilityMessage/ReproducibilityMessage'
import styles from './SkuListItem.module.scss'
import { parseJson } from '../../utils/parseJson'
import {
  isNewProduct,
  isSkuOnSale,
  getSpecs,
  getSkuAvailability,
  getSkuNotInStock,
  hasEPrintExtraParts,
  hasTraditionalExtraParts,
} from '../../utils/productData'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import type { Availability, SkuDetailsFormatted } from '../../typings/sku'
import type { OrderProducts } from './SkuListTable'
import type { Product, ProductFullVariantList } from '../../typings/product'
import type { SkuItem } from '../Wishlist/AddToWishlistButton'
import AddToWishlistButton from '../Wishlist/AddToWishlistButton'

type SkuListItemProps = {
  changeOrderDesktop: (value: number, id: string) => void
  setSelected: (arg: string) => void
  orderProducts: OrderProducts
  product: Product
  sku: ProductFullVariantList[0]
  isPLP?: boolean
  isSelected?: boolean
}

const SkuListItem = ({
  changeOrderDesktop,
  orderProducts,
  product,
  setSelected,
  sku,
  isPLP,
  isSelected,
}: SkuListItemProps) => {
  const router = useRouter()
  const productSpecs = getSpecs(product.isVariantOf.additionalProperty)
  const skuSpecs = getSpecs(sku.additionalProperty)
  const hasExtraParts =
    hasEPrintExtraParts(product, sku.gtin) ||
    hasTraditionalExtraParts(product, sku.gtin)

  const isNotInStock = getSkuNotInStock(sku)
  const isOnSale = isSkuOnSale(sku)
  const isNew = isNewProduct(product.releaseDate)
  const availability = getSkuAvailability(product, sku.gtin)
  const isNotAvailable = availability?.short_message === 'Not Available'

  const {
    offers: [{ price, listPrice }],
  } = sku.offers

  const isbn = parseJson<Record<string, string>>(productSpecs.ISBN)
  const upc = parseJson<Record<string, string>>(productSpecs.Upc)
  const supplierId = parseJson<Record<string, string>>(
    productSpecs['Supplier Item ID']
  )

  const skuDetails: SkuDetailsFormatted = {
    refId: sku.gtin,
    skuName: sku.name,
    supplierId: supplierId ? supplierId[sku.gtin] : '',
  }

  const handleRowClick = () => {
    if (isNotAvailable || isSelected) {
      return
    }

    setSelected(sku.productID)

    if (!isPLP) {
      void router.replace(`/${sku.slug}/p`, undefined, {
        scroll: false,
      })
    }
  }

  const minimumSellQuantity = skuSpecs['Minimum Sell Quantity']
    ? parseInt(skuSpecs['Minimum Sell Quantity'], 10)
    : 0

  const skuItem: SkuItem = {
    skuId: sku.sku,
    quantity: 1,
  }

  return (
    <div
      className={styles.skuListItemRow}
      data-is-not-available={isNotAvailable}
      data-is-selected={!isNotAvailable && isSelected}
      onClick={handleRowClick}
    >
      {/* DESCRIPTION */}
      <div className={styles.skuListItemBox}>
        <div className={styles.descriptionWrapper}>
          <div className={styles.descriptionTextWrapper}>
            {(isNew || isOnSale) && (
              <div className={styles.badgesWrapper}>
                {isNew && <NewBadge />}
                {isOnSale && <SaleBadge />}
              </div>
            )}

            <p className={styles.descriptionText}>
              {sku.name}{' '}
              {skuSpecs['Large Print Edition'] === 'Yes' && (
                <span>- Large Print Edition</span>
              )}
            </p>

            <div className={styles.detailsWrapper}>
              {isSelected ? (
                <>
                  <p>
                    {sku.gtin}
                    {supplierId?.[sku.gtin] &&
                      `, Supplier ID: ${supplierId[sku.gtin]}`}
                  </p>

                  <p>
                    {upc?.[sku.gtin] && `UPC: ${upc[sku.gtin]}`}
                    {isbn?.[sku.gtin] && `, ISBN: ${isbn[sku.gtin]}`}
                  </p>
                </>
              ) : (
                <button
                  className={styles.viewDetailsToggle}
                  onClick={() => setSelected(sku.productID)}
                  type="button"
                >
                  View Details
                </button>
              )}
            </div>
          </div>

          <span className={styles.mobileMsrp}>
            <ProductPrice
              formatter={useFormattedPrice}
              listPrice={listPrice}
              value={price}
            />
          </span>
        </div>
      </div>

      {/* DELIVERY */}
      <div className={styles.skuListItemBox}>
        <div className={styles.deliveryWrapper}>
          {skuSpecs.Delivery && (
            <div className={styles.deliveryMethods}>
              <div
                key={skuSpecs.Delivery}
                className={styles.deliveryMethodIconWrapper}
                data-delivery-method={skuSpecs.Delivery}
              >
                <DeliveryMethod deliveryMethod={skuSpecs.Delivery} />
              </div>
            </div>
          )}

          <AvailabilityMessage product={product} skuRefId={sku.gtin} />
          <ReproducibilityMessage product={sku} />

          {skuSpecs.Grade && (
            <div className={styles.mobileLevel}>
              <p className={styles.mobileLevelText}>
                <span className={styles.mobileLevelLabel}>Level:</span>
                <br />
                <span className={styles.mobileLevelValue}>
                  {skuSpecs.Grade}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* LEVEL */}
      <div className={styles.skuListItemBox}>
        {skuSpecs.Grade && <p>{skuSpecs.Grade}</p>}
      </div>

      {/* PREVIEW */}
      <div className={styles.skuListItemBox}>
        <div className={styles.previewIconRow}>
          {skuSpecs['Audio Available'] === 'Yes' ||
          skuSpecs['Score Available'] === 'Yes' ? (
            <PreviewAudioAndScore
              productTitle={product.isVariantOf.name}
              skuDetails={skuDetails}
            />
          ) : null}

          {skuSpecs['Video Available'] === 'Yes' && (
            <PreviewVideo
              productTitle={product.isVariantOf.name}
              skuDetails={skuDetails}
            />
          )}

          {skuSpecs['MINTS Data Available'] === 'Yes' && (
            <PreviewRange
              productTitle={product.isVariantOf.name}
              skuDetails={skuDetails}
            />
          )}
        </div>
      </div>

      {/* SAVE */}
      <div className={styles.skuListItemBox}>
        <div className={styles.saveIconWrapper}>
          <AddToWishlistButton skus={[skuItem]} />
        </div>
      </div>

      {/* PRICE */}
      <div className={styles.skuListItemBox}>
        <div className={styles.priceWrapper}>
          <ProductPrice
            formatter={useFormattedPrice}
            listPrice={listPrice}
            value={price}
          />
        </div>
      </div>

      {/* ADD QTY */}
      <div className={styles.skuListItemBox}>
        <div className={styles.qtyWrapper}>
          <div className={styles.qtyMessaging}>
            {isNotInStock ? (
              <NotInStockMessage size="small" />
            ) : (
              <>
                <Limited sku={sku} />

                {minimumSellQuantity > 1 && (
                  <p>Min. {minimumSellQuantity} copies</p>
                )}
              </>
            )}
          </div>

          <ProductQuantityInputDesktop
            id={sku.productID}
            isDisabled={isNotAvailable || isNotInStock}
            changeOrderDesktop={changeOrderDesktop}
            orderProducts={orderProducts}
            minSellQty={minimumSellQuantity}
          />

          {hasExtraParts && (
            <OrderExtraModal
              buttonNode={<p>Order extra part</p>}
              sku={sku}
              product={product}
              isDesktop={true}
            />
          )}
        </div>
      </div>

      {/* MOBILE CONTROLS */}
      {/* MOBILE PREVIEW */}
      <div className={styles.mobileControls}>
        {(skuSpecs['Audio Available'] === 'Yes' ||
          skuSpecs['Score Available'] === 'Yes' ||
          skuSpecs['Video Available'] === 'Yes' ||
          skuSpecs['MINTS Data Available'] === 'Yes') && (
          <div className={styles.mobileControlGroup}>
            <MobilePreviewDrawer
              skuSpecs={skuSpecs}
              skuDetails={skuDetails}
              productTitle={product.isVariantOf.name}
            />
          </div>
        )}

        {/* MOBILE EPRINT */}
        {hasExtraParts && (
          <div className={styles.mobileControlGroup}>
            <OrderExtraModal
              buttonNode={
                <>
                  <ExtraPartsIcon />
                  <span className={styles.mobileControlButtonText}>
                    Extra Parts
                  </span>
                </>
              }
              sku={sku}
              product={product}
            />
          </div>
        )}

        {/* MOBILE SAVE */}
        <div className={styles.mobileControlGroup}>
          <MobileSaveDrawer skus={[skuItem]} />
        </div>

        {/* MOBILE ADD TO CART */}
        <div
          className={classNames(
            styles.mobileControlGroup,
            styles.mobileControlGroupCart
          )}
        >
          <ProductQuantityInputMobile
            sku={sku}
            product={product}
            minSellQty={minimumSellQuantity}
            isDisabled={isNotAvailable || isNotInStock}
          />

          <div className={styles.mobileQtyMessaging}>
            {isNotInStock ? (
              <NotInStockMessage size="small" />
            ) : (
              <>
                <Limited sku={sku} />

                {minimumSellQuantity > 1 && (
                  <p>Min. {minimumSellQuantity} copies</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkuListItem
