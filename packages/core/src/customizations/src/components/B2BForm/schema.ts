import { z } from 'zod'

import { COUNTRIES, CUSTOMER_CLASSIFICATION } from './contants'

export const b2bFormSchema = z.object({
  account: z
    .object({
      name: z
        .string()
        .min(1, { message: 'Name must contain at least 1 character' }),
      attention: z
        .string()
        .min(1, { message: 'Attention must contain at least 1 character' }),
      phone: z
        .string()
        .min(1, { message: 'Phone must contain at least 1 character' }),
      interest: z.string(),
      role: z.string().optional(),
      classification: z.enum(
        [
          CUSTOMER_CLASSIFICATION[0].value,
          ...CUSTOMER_CLASSIFICATION.slice(1).map((p) => p.value),
        ],
        { message: 'You have to select a type' }
      ),

      detail: z.string(),
    })
    .superRefine(({ interest }, refinementContext) => {
      if (interest === 'Select an option') {
        return refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'You have to select a interest',
          path: ['interest'],
        })
      }
    }),
  address: z.object({
    street: z
      .string()
      .min(1, { message: 'Address must contain at least 1 character' }),
    complement: z.string().optional(),
    city: z.string(),
    country: z.enum(
      [COUNTRIES[0].value, ...COUNTRIES.slice(1).map((p) => p.value)],
      { message: 'You have to select a country' }
    ),
    state: z.string().optional().default(''),
    postalCode: z
      .string()
      .min(1, { message: 'Postal code must contain at least 1 character' }),
  }),
  billing: z
    .object({
      name: z.string().optional(),
      attention: z.string().optional(),
      phone: z.string().optional(),
      classification: z.string().optional(),
      street: z.string().optional(),
      complement: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional().default(''),
      postalCode: z.string().optional(),
      hasBilling: z.boolean(),
    })
    .superRefine(
      (
        {
          hasBilling,
          classification,
          phone,
          attention,
          name,
          street,
          postalCode,
          country,
        },
        refinementContext
      ) => {
        if (hasBilling && classification === '') {
          return refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'You have to select a type',
            path: ['classification'],
          })
        }

        if (hasBilling && name === '') {
          return refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Name must contain at least 1 character',
            path: ['name'],
          })
        }

        if (hasBilling && attention === '') {
          return refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Attention must contain at least 1 character',
            path: ['attention'],
          })
        }

        if (hasBilling && phone === '') {
          return refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone must contain at least 1 character',
            path: ['phone'],
          })
        }

        if (hasBilling && street === '') {
          return refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Address must contain at least 1 character',
            path: ['street'],
          })
        }

        if (hasBilling && postalCode === '') {
          return refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Postal code must contain at least 1 character',
            path: ['postalCode'],
          })
        }

        if (hasBilling && country === 'Select an option') {
          return refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'You have to select a country',
            path: ['country'],
          })
        }
      }
    ),
})

export type B2BSchema = z.infer<typeof b2bFormSchema>
