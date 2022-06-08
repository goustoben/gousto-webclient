import { SignupSteps } from 'routes/Signup/constants/SignupSteps'
import twoPersonBoxImg from 'media/images/box-prices/two-person-box.jpg'
import fourPersonBoxImg from 'media/images/box-prices/four-person-box.jpg'

export const PaymentMethod = {
  Card: 'Card',
  PayPal: 'PayPal'
}

const checkAccountPageSlug = 'start'
const applyVoucherPageSlug = 'apply-voucher'
const enterPromoCodeManuallyPageSlug = 'enter-discount-code'
const postcodeSlug = 'postcode'

/*
interface?
 */
export const signupConfig = {
  /**
   * If experiment steps should be added:
   * 1. Create another entry in signupConfig with listing appropriate steps (similar to signupConfig.defaultSteps).
   * 2. Add entries of new steps into signupConfig.steps array.
   * 3. Refer to new steps variable in "getSignupSteps.ts" file.
   * 4. Map step to component in "AvailableStepComponents.ts" file.
   */
  defaultSteps: [SignupSteps.BOX_SIZE, SignupSteps.POSTCODE, SignupSteps.DELIVERY],
  personaliseMenuSteps: [SignupSteps.BOX_SIZE, SignupSteps.POSTCODE, SignupSteps.DELIVERY, SignupSteps.PERSONALISE_MENU],
  boxSizeRecommenderSteps: [SignupSteps.NUMBER_OF_PEOPLE, SignupSteps.BOX_SIZE_RECOMMENDER, SignupSteps.POSTCODE, SignupSteps.DELIVERY],
  boxSizeRecommenderWithPersonalizeMenuSteps: [
    SignupSteps.NUMBER_OF_PEOPLE, // box size recommender experiment step
    SignupSteps.BOX_SIZE_RECOMMENDER, // box size recommender experiment step
    SignupSteps.POSTCODE,
    SignupSteps.DELIVERY,
    SignupSteps.PERSONALISE_MENU // personalize menu experiment step
  ],
  steps: [
    { name: SignupSteps.BOX_SIZE, slug: 'box-size' },
    { name: SignupSteps.POSTCODE, slug: 'postcode' },
    { name: SignupSteps.DELIVERY, slug: 'delivery-options' },
    { name: SignupSteps.PERSONALISE_MENU, slug: 'personalise-menu' },
    { name: SignupSteps.NUMBER_OF_PEOPLE, slug: 'number-of-people' },
    { name: SignupSteps.BOX_SIZE_RECOMMENDER, slug: 'box-size-recommender' },
  ],
  payment_types: {
    card: 'card',
    paypal: 'paypal',
  },
  address_types: {
    billing: 'billing',
    shipping: 'shipping',
  },
  boxSizeStep: {
    title: 'Choose your box size',
    subtitle: 'You can choose 2, 3 or 4 recipes per box.',
    cta: 'Select',
    boxSize: {
      2: {
        description: 'This smaller box is packed with enough pre-measured ingredients for each recipe to feed 2 people.',
        image: twoPersonBoxImg,
      },
      4: {
        description: 'This larger box is packed with enough pre-measured ingredients for each recipe to feed 4 people.',
        image: fourPersonBoxImg,
      },
    },
    discountApplied: 'Discount applied',
    boxSizeTypes: [
      {
        heading: 'Regular box',
        suitableFor: ['2 adults (or 1 + leftovers)', '1 adult and 1-2 children'],
        ctaText: 'Choose regular box',
        value: 2,
      },
      {
        heading: 'Large box',
        suitableFor: ['4 adults (or 2-3 + leftovers)', '2 adults and 2-3 children'],
        ctaText: 'Choose large box',
        value: 4,
      },
    ],
  },
  postCodeStep: {
    title: 'Where would you like your boxes delivered?',
    goustoOnDemandTitle: 'Where would you like your box delivered?',
    reminder: 'Free UK delivery, 7 days a week',
    doNotDeliverErrorMessage: 'Sorry, it looks like we don’t currently deliver to your area.',
    genericErrorMessage: 'Please enter a valid postcode'
  },
  deliveryOptionsStep: {
    title: 'When would you like your first box delivered?',
    goustoOnDemandTitle: 'When do you want your box delivered?',
  },
  discountAppliedText: 'View this when you reach the checkout.',
  sellThePropositionPagePath: 'about',
  checkAccountPageSlug,
  applyVoucherPageSlug,
  enterPromoCodeManuallyPageSlug,
  canLandOnStepWithoutRedirecting: [
    checkAccountPageSlug,
    applyVoucherPageSlug,
    enterPromoCodeManuallyPageSlug,
    /**
     * Redirected to step from Box Prices.
     */
    postcodeSlug,
  ],
}
