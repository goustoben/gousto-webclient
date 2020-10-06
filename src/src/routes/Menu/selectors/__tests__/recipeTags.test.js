import {
  getBrandTagline,
  getBrandAvailability
} from '../recipeTags'
import { getAllTags } from '../recipe'

describe('getBrandTagline and getBrandAvailability', () => {
  const brand = {
    data: {
      tags: [
        {
          slug: 'new-eme',
          text: 'New',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'limited-edition-eme',
          text: 'Limited Edition',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'joe-wicks-eme',
          text: 'Joe Wicks',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'health-kitchen-eme',
          text: 'Health Kitchen',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'fine-dine-in-eme',
          text: 'Fine Dine In',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'available-weekly-eme',
          text: 'Everyday Favourites',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'mexico-limited-edition-eme',
          text: 'Dough It Yourself Pizza',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
      ]
    }
  }
  const allTags = getAllTags({ brand })
  const newTag = {
    type: 'general',
    slug: 'new-eme',
    text: 'New',
    themes: undefined,
    theme: { name: 'light', color: '#01A92B', borderColor: '#01A92B' },
  }
  const limitedEditionTag = {
    slug: 'limited-edition-eme',
    text: 'Limited Edition',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const joeWicksTag = {
    slug: 'joe-wicks-eme',
    text: 'Joe Wicks',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const healthKitchenTag = {
    slug: 'health-kitchen-eme',
    text: 'Health Kitchen',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const fineDineInTag = {
    slug: 'fine-dine-in-eme',
    text: 'Fine Dine In',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const everydayFavouritesTag = {
    slug: 'available-weekly-eme',
    text: 'Everyday Favourites',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const mexicoLimitedEditionTag = {
    slug: 'mexico-limited-edition-eme',
    text: 'Dough It Yourself Pizza',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general'
  }

  let tagline
  let availability

  describe('when tags are not defined', () => {
    it('should return null', () => {
      const availabilityResult = getBrandAvailability.resultFunc('new-eme', undefined)
      const taglineResult = getBrandTagline.resultFunc('mexico-limited-edition-eme', undefined)

      expect(availabilityResult).toEqual(null)
      expect(taglineResult).toEqual(null)
    })
  })

  describe('when recipe is not new and without promotion', () => {
    test('should return null', () => {
      const taglineResult = getBrandTagline.resultFunc(undefined, allTags)
      const availabilityResult = getBrandAvailability.resultFunc(undefined, allTags)

      expect(taglineResult).toBe(null)
      expect(availabilityResult).toBe(null)
    })
  })

  describe('when recipe has limited-edition-eme promotion', () => {
    beforeEach(() => {
      availability = 'limited-edition-eme'
    })

    test('should return limited edition recipe tag', () => {
      const availabilityResult = getBrandAvailability.resultFunc(availability, allTags)

      expect(availabilityResult).toEqual(limitedEditionTag)
    })
  })

  describe('when recipe has new-eme promotion', () => {
    beforeEach(() => {
      availability = 'new-eme'
    })

    test('should return new-eme recipe tag', () => {
      const availabilityResult = getBrandAvailability.resultFunc(availability, allTags)

      expect(availabilityResult).toEqual(newTag)
    })
  })

  describe('when recipe has mexico-limited-edition promotion', () => {
    beforeEach(() => {
      tagline = 'mexico-limited-edition-eme'
    })

    test('should return mexico limited edition tag', () => {
      const taglineResult = getBrandTagline.resultFunc(tagline, allTags)
      expect(taglineResult).toEqual(mexicoLimitedEditionTag)
    })
  })

  describe('when joe-wicks-eme promotion', () => {
    describe('when recipe has joe-wicks-eme promotion', () => {
      beforeEach(() => {
        tagline = 'joe-wicks-eme'
      })

      test('should return new recipe tag', () => {
        const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

        expect(taglineResult).toEqual(joeWicksTag)
      })
    })
  })

  describe('when recipe is fine dine in', () => {
    beforeEach(() => {
      tagline = 'fine-dine-in-eme'
    })

    test('should return fineDinteInTag', () => {
      const taglineResult = getBrandTagline.resultFunc(tagline, allTags)
      expect(taglineResult).toEqual(fineDineInTag)
    })
  })

  describe('when recipe food brand is everyday favourites', () => {
    beforeEach(() => {
      tagline = 'available-weekly-eme'
    })

    test('should return available-weekly-eme', () => {
      const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

      expect(taglineResult).toEqual(everydayFavouritesTag)
    })
  })

  describe('when promotion is health kitchen', () => {
    beforeEach(() => {
      tagline = 'health-kitchen-eme'
    })

    test('should return health-kitchen-eme', () => {
      const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

      expect(taglineResult).toEqual(healthKitchenTag)
    })
  })

  describe('when promotion is not part of EME', () => {
    beforeEach(() => {
      tagline = 'something-else'
    })

    test('should return null', () => {
      const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

      expect(taglineResult).toBe(null)
    })
  })
})
