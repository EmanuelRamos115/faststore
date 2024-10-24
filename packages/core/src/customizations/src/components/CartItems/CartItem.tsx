import classNames from 'classnames'
import React, { forwardRef, type Dispatch, type SetStateAction } from 'react'
import { Price, ProductPrice } from '@faststore/ui'
import { useProductQuery_unstable as useProductQuery } from '@faststore/core/experimental'
import Link from 'next/link'
import type { ClientProductQueryQuery } from '@generated/graphql'

import ProductImage from '../ProductImage/ProductImage'
import CartItemRemoveButton from './CartItemRemoveButton'
import CartItemQuantitySelector from './CartItemQuantitySelector'
import CartItemWishlist from './CartItemWishlist'
import DeliveryMethod from '../DeliveryMethod/DeliveryMethod'
import AvailabilityMessage from '../AvailabilityMessage/AvailabilityMessage'
import ReproducibilityMessage from '../ReproducibilityMessage/ReproducibilityMessage'
import styles from './CartItem.module.scss'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import { useDeviceInfo } from '../../hooks/useDeviceInfo'
import { getSpecs, isSheetMusic } from '../../utils/productData'
import type { OpenExtraParts, FolderImprinting } from '../../typings/orderForm'
import type { CustomCartItem } from '../../typings/cart'
import { physicalWarehouses } from '../../../faststore.config'
import { useCart } from 'src/sdk/cart'

export type CartItemProps = {
  item: CustomCartItem
  isCartPage?: boolean
  openExtraParts?: OpenExtraParts
  folderImprinting?: FolderImprinting
  validateImprinting: boolean
  setValidateImprinting: Dispatch<SetStateAction<boolean>>
}

type BackorderMessageProps = {
  delivery: string
  product: ClientProductQueryQuery['product'] | undefined
  quantity: number
}

const BackorderMessage = ({
  delivery,
  product,
  quantity,
}: BackorderMessageProps) => {
  if (
    ![
      'SHIP_DIRECT',
      'Ships Direct from Manufacturer',
      'Ships from J.W. Pepper',
    ].includes(delivery) ||
    !product
  ) {
    return
  }

  const warehouses = product?.inventory.filter((item) =>
    physicalWarehouses.includes(item.warehouse.id)
  )

  const totalAvailableReduce = warehouses?.reduce(
    (sum, { availableQuantity }) => sum + availableQuantity,
    0
  )

  const totalAvailable = Math.max(0, totalAvailableReduce)

  if (totalAvailable >= quantity) {
    return
  }

  return (
    <p className={styles.backorder}>
      Your qty exceeds what we have in stock, {quantity - totalAvailable}{' '}
      item(s) will go on order and ship at a later date.
    </p>
  )
}

const CartItem = forwardRef<HTMLDivElement, CartItemProps>(function CartItem(
  {
    item,
    isCartPage = false,
    openExtraParts,
    folderImprinting,
    validateImprinting,
    setValidateImprinting,
  },
  ref
) {
  const { device } = useDeviceInfo()
  const skuSpecs = getSpecs(item.itemOffered.additionalProperty)
  const { data } = useProductQuery<ClientProductQueryQuery>(
    item.itemOffered.sku
  )

  const product = data?.product

  const slug = product?.slug ?? ''
  const isSheetMusicProduct = product ? isSheetMusic(product) : true
  const folderImprintingPrice =
    item.options?.reduce(
      (acc, option) => acc + (option.sellingPrice * option.quantity) / 100,
      0
    ) ?? 0

  const { items } = useCart()
  console.log(items)
  return (
    <article
      ref={ref}
      data-fs-cart-item
      className={classNames(styles.cartItem, isCartPage && styles.cartPage)}
    >
      <div className={styles.imageWrapper}>
        {product && (
          <ProductImage
            imageUrl={item.itemOffered.image[0].url}
            imageAlt={item.itemOffered.image[0].alternateName}
            width={device === 'mobile' ? 75 : 122}
            isSheetMusic={isSheetMusicProduct}
            linkProps={{
              href: `/${slug}/p`,
              onClick: () => null,
              'data-testid': 'Cart Item',
            }}
          />
        )}
      </div>

      <div className={styles.contentWrapper}>
        <p className={styles.title}>
          <Link href={slug ? `/${slug}/p` : '/'}>
            {item.itemOffered.isVariantOf.name}
          </Link>
        </p>

        <div>
          <p className={styles.brand}>{item.itemOffered.brand.name}</p>
          <p className={styles.skuName}>{item.itemOffered.name}</p>

          {openExtraParts?.map((part) => (
            <p className={styles.skuName} key={part.part}>
              <i>
                {part.qty}x {part.part}
              </i>
            </p>
          ))}
          <p className={styles.skuID}>{item.itemOffered.gtin}</p>
        </div>

        {skuSpecs.Delivery && (
          <>
            <p className={styles.deliveryMethod}>
              <DeliveryMethod deliveryMethod={skuSpecs.Delivery} />
            </p>

            <BackorderMessage
              delivery={skuSpecs.Delivery}
              product={product}
              quantity={item.quantity}
            />
          </>
        )}

        <div>
          <div className={styles.itemPriceEach}>
            <ProductPrice
              formatter={useFormattedPrice}
              listPrice={item.listPrice}
              value={item.price}
            />{' '}
            ea
          </div>

          {folderImprinting && item.options && (
            <>
              <p className={styles.itemPriceEach}>
                <b>Imprinting Information</b>{' '}
                {product && (
                  <Link className={styles.editLink} href={`/${product.slug}/p`}>
                    Edit
                  </Link>
                )}
              </p>

              {item.options.map((option) => (
                <p className={styles.itemPriceEach} key={option.id}>
                  <i>
                    {`${option.quantity}x ${option.skuName}: `}
                    {option.sellingPrice === 0 ? (
                      <>
                        {`FREE - `}
                        <span data-fs-price data-fs-price-variant="listing">
                          <Price
                            value={(option.listPrice / 100) * option.quantity}
                            formatter={useFormattedPrice}
                          />
                        </span>
                      </>
                    ) : (
                      <>
                        <Price
                          formatter={useFormattedPrice}
                          value={option.sellingPrice / 100}
                        />
                        {` ea - `}
                        <Price
                          formatter={useFormattedPrice}
                          value={(option.sellingPrice / 100) * option.quantity}
                        />
                        {option.sellingPrice < option.listPrice && (
                          <>
                            {' '}
                            <span data-fs-price data-fs-price-variant="listing">
                              <Price
                                value={
                                  (option.listPrice / 100) * option.quantity
                                }
                                formatter={useFormattedPrice}
                              />
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </i>
                </p>
              ))}
            </>
          )}
        </div>

        <p className={styles.itemPriceTotal}>
          <Price
            value={(item.price + folderImprintingPrice) * item.quantity}
            formatter={useFormattedPrice}
          />
        </p>

        {product && (
          <div className={styles.availability}>
            <AvailabilityMessage product={product} skuRefId={product.gtin} />
            <ReproducibilityMessage product={product} />
          </div>
        )}

        <p className={styles.wishlist}>
          <CartItemWishlist item={item} />
        </p>
      </div>

      <div className={styles.actionsWrapper}>
        <div className={styles.quantityAction}>
          <CartItemQuantitySelector
            item={item}
            product={product}
            isCartPage={isCartPage}
            openExtraParts={openExtraParts}
            folderImprinting={folderImprinting}
          />
        </div>

        <div className={styles.removeAction}>
          <CartItemRemoveButton
            item={item}
            hasExtraParts={!!openExtraParts}
            hasFolderImprinting={!!folderImprinting}
            validateImprinting={validateImprinting}
            setValidateImprinting={setValidateImprinting}
          />
        </div>
      </div>

      <div className={styles.priceWrapper}>
        <Price
          value={item.price * item.quantity + folderImprintingPrice}
          formatter={useFormattedPrice}
        />
      </div>

      <div className={styles.removeItemWrapper}>
        <CartItemRemoveButton
          item={item}
          hasExtraParts={!!openExtraParts}
          hasFolderImprinting={!!folderImprinting}
          validateImprinting={validateImprinting}
          setValidateImprinting={setValidateImprinting}
        />
      </div>
    </article>
  )
})

export default CartItem
