/**
 * VTEX catalog slugify function
 *
 * Copied from:
 * https://github.com/vtex/faststore/blob/main/packages/api/src/platforms/vtex/utils/slugify.ts
 *
 */

const from =
  'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa'

const to =
  'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa'

const removeDiacritics = (str: string) => {
  let newStr = str.slice(0)

  for (let i = 0; i < from.length; i++) {
    newStr = newStr.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  return newStr
}

const slugifySpecialCharacters = (str: string) => {
  return str.replace(/[·/_,:]/, '-')
}

export function slugify(str: string) {
  const noCommas = str.replace(/,/g, '')
  const replaced = noCommas.replace(/[*+~.()'"!:@&[\]`/ %$#?{}|><=_^]/g, '-')
  const slugified = slugifySpecialCharacters(removeDiacritics(replaced))

  return slugified.toLowerCase()
}
