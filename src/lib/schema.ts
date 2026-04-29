export type SchemaType =
  | 'LocalBusiness'
  | 'MedicalClinic'
  | 'LegalService'
  | 'Restaurant'
  | 'EducationalOrganization'
  | 'RealEstateAgent'
  | 'ProfessionalService'
  | 'FinancialService'
  | 'ConsultingFirm'

export interface SchemaAddress {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

export interface SchemaInput {
  type: SchemaType
  name: string
  description: string
  url: string
  phone: string
  email: string
  address: SchemaAddress
  openingHours?: string[]
  priceRange?: string
  image?: string
}

export function buildSchema(input: SchemaInput): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': input.type,
    name: input.name,
    description: input.description,
    url: input.url,
    telephone: input.phone,
    email: input.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.address.streetAddress,
      addressLocality: input.address.addressLocality,
      addressRegion: input.address.addressRegion,
      postalCode: input.address.postalCode,
      addressCountry: input.address.addressCountry,
    },
  }

  if (input.openingHours && input.openingHours.length > 0) {
    schema.openingHours = input.openingHours
  }
  if (input.priceRange) schema.priceRange = input.priceRange
  if (input.image) schema.image = input.image

  return JSON.stringify(schema)
}
