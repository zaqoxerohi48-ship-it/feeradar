export const CACHE_TAGS = {
  adminDashboard: 'admin-dashboard',
  cardCompanies: 'card-companies',
  gasFees: 'ethereum-gas-fees',
  legalDocuments: 'legal-documents',
  plans: 'plans'
} as const

export function getCardCompanyCacheTag(slug: string) {
  return `${CACHE_TAGS.cardCompanies}:${slug}`
}
