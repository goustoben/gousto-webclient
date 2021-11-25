import { getBrandAvailability } from '../recipeTags'
import { getAllTags } from '../recipe'

describe('getBrandAvailability', () => {
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

  let availability

  describe('when tags are not defined', () => {
    it('should return null', () => {
      const availabilityResult = getBrandAvailability.resultFunc('new-eme', undefined)

      expect(availabilityResult).toEqual(null)
    })
  })

  describe('when recipe is not new and without promotion', () => {
    test('should return null', () => {
      const availabilityResult = getBrandAvailability.resultFunc(undefined, allTags)

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
})
