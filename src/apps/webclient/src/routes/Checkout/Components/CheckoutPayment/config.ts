import { createClientConfig } from 'utils/clientConfig'

/**
 * These are PUBLIC keys which will be removed
 * from the codebase as part of FEF-325
 */
const checkoutPublicKeyMap = {
  fef: 'pk_test_1beb7946-2254-44ed-94e7-97acddbaaee1',
  potatoes: 'pk_test_870e2e03-730e-4db2-abd3-7799cdf9a927',
  turnips: 'pk_test_252a059e-8c44-40fe-9f4c-7acff20dd83a',
  peas: 'pk_test_faf038df-0a54-4a70-8f30-ebc55ab41a13',
  jalapenos: 'pk_test_027d88a5-9a87-4589-8d7e-ec9763e85668',
  carrots: 'pk_test_802512f8-56b3-44a2-b8e4-a22554153191',
  rockets: 'pk_test_729a3351-f1a7-49f4-84a5-5bf014456001',
  sprouts: 'pk_test_ba15bc9d-de1c-4b83-af98-8e3ca326c622',
  parsnips: 'pk_test_8fc85a80-71f1-4b41-b6a4-209c29e4bfab',
  radishes: 'pk_test_756717b0-978f-4e01-84f8-055732e25cba',
  beetroots: 'pk_test_b22155cc-76a6-46c0-8b68-23a6b448a0bc',
  haricots: 'pk_test_4833c254-43d0-4f65-bebe-195cda9628db',
  sol: 'pk_test_fc98c379-a1d4-48a9-a993-3727d1f0cd85',
  staging: 'pk_test_252a059e-8c44-40fe-9f4c-7acff20dd83a',
  production: 'pk_21e655ee-2f2d-4c7f-9dc5-4f4dde6498f0',
}

export const formName = 'payment'
export const sectionName = 'payment'
export const deliveryAddressSectionName = 'delivery'

export const getPublicKey = createClientConfig(checkoutPublicKeyMap, { defaultKey: 'staging' })
