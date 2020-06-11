import Immutable from 'immutable'

import React from 'react'
import { shallow } from 'enzyme'

import { Hub } from 'routes/Cookbook/Hub/Hub'
import { Section } from 'Page/Elements'
import { Col, Row } from 'Page/Grid'
import { PageContent, PageHeader } from 'Page'
import Helmet from 'react-helmet'
import Link from 'Link'
import Image from 'routes/Menu/Recipe/Image'
import Info from 'routes/Menu/Recipe/Info'
import { RecipeRating } from 'routes/Menu/Recipe/Rating'
import Tag from 'routes/Menu/Recipe/Tag'
import { Title } from 'routes/Menu/Recipe/Title'
import { H1 } from 'Page/Header'
import { ReadMoreText } from 'routes/Cookbook/Hub/ReadMoreText'

jest.mock('utils/logger', () => ({
  error: () => { }
}))

jest.mock('routes/Menu/Recipe/RecipeAttribute', () => ({
  RecipeAttribute: () => (<div />)
}))

describe('Hub', () => {
  describe('rendering', () => {
    let wrapper
    let requiredProps

    beforeEach(async () => {
      const recipes = Immutable.fromJS([
        {
          id: 1,
          slug: 'pasta',
          pasta: {},
          title: 'pasta',
          cookingTime: 20,
        },
      ])
      const collection = Immutable.fromJS({
        recipes: ['pasta'],
        metaTitle: 'meta title'
      })
      requiredProps = {
        endSet: 3,
        fetchSetData: () => { },
        loadNextSet: () => { },
        params: { collectionSlug: 'all-recipes' },
        resetSets: () => { },
        startSet: 1,
        totalSets: 1,
        recipesCollection: '',
        stock: 10,
        location: 'https://www.gousto.co.uk',
      }

      wrapper = await shallow(
        <Hub recipes={recipes} collection={collection} {...requiredProps} />,
        {
          context: {
            store: {
              dispatch: () => { },
              getState: () => ({
                error: Immutable.Map({}),
                collections: Immutable.Map({
                  1234: Immutable.Map({
                    id: '1234',
                    slug: 'all-recipes',
                    description: 'Not sure what to cook for dinner? Browse our full library of delicious recipe ideas'
                  })
                })
              })
            }
          }
        }
      )
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    test('should render a <Section> by default', () => {
      expect(wrapper.type()).toBe(Section)
    })

    test('should have a <Helmet> child', () => {
      expect(wrapper.find(Helmet)).toHaveLength(1)
    })

    test('should have a <Link> child', () => {
      expect(wrapper.find(Link)).toHaveLength(1)
    })

    test('should have a PageHeader child', () => {
      expect(wrapper.children(PageHeader)).toHaveLength(1)
    })

    test('should have a ReadMoreText child', () => {
      expect(wrapper.find(ReadMoreText).exists()).toBe(true)
    })

    test('should have a PageContent child', () => {
      expect(wrapper.children(PageContent)).toHaveLength(1)
    })

    test('should have a nested Row child with prop row in PageContent', () => {
      expect(wrapper.children(PageContent).children(Row)).toHaveLength(1)
    })

    test('should have a 1st nested Col child with props col-xs-12, col-lg-8, & col-xl-9 in Row', () => {
      const col = wrapper
        .children(PageContent)
        .children(Row)
        .children(Col)
        .first()
      expect(col).toHaveLength(1)
      expect(col.prop('col-xs-12')).toBe(true)
      expect(col.prop('col-lg-8')).toBe(true)
      expect(col.prop('col-xl-9')).toBe(true)
    })

    test('should have a 2nd nested Col child with props col-xs-12, col-lg-4, & col-xl-3 in Row', () => {
      const colSection = wrapper
        .children(PageContent)
        .children(Row)
        .children(Col)
        .at(1)
      expect(colSection).toHaveLength(1)
      expect(colSection.prop('col-xs-12')).toBe(true)
      expect(colSection.prop('col-lg-4')).toBe(true)
      expect(colSection.prop('col-xl-3')).toBe(true)
    })

    test('should have an Image child in first Col', () => {
      expect(
        wrapper
          .children(PageContent)
          .children(Row)
          .children(Col)
          .first()
          .find(Image),
      ).toHaveLength(1)
    })

    test('should have an Info child in first Col', () => {
      expect(
        wrapper
          .children(PageContent)
          .children(Row)
          .children(Col)
          .first()
          .find(Info),
      ).toHaveLength(1)
    })

    test('should have a RecipeRating child in first Col', () => {
      expect(
        wrapper
          .children(PageContent)
          .children(Row)
          .children(Col)
          .first()
          .find(RecipeRating),
      ).toHaveLength(1)
    })

    test('should have a Tag child in first Col', () => {
      expect(
        wrapper
          .children(PageContent)
          .children(Row)
          .children(Col)
          .first()
          .find(Tag),
      ).toHaveLength(1)
    })

    test('should have a Title child in first Col', () => {
      expect(
        wrapper
          .children(PageContent)
          .children(Row)
          .children(Col)
          .first()
          .find(Title),
      ).toHaveLength(1)
    })

    test('should have a RecipeAttribute child in first Col', () => {
      expect(
        wrapper
          .children(PageContent)
          .children(Row)
          .children(Col)
          .first()
          .find('RecipeAttribute'),
      ).toHaveLength(1)
    })

    test('should have an H1 child in second Col', () => {
      expect(
        wrapper
          .children(PageContent)
          .children(Row)
          .children(Col)
          .at(1)
          .find(H1),
      ).toHaveLength(1)
    })

    test('should have an p child in second Col', () => {
      expect(
        wrapper
          .children(PageContent)
          .children(Row)
          .children(Col)
          .at(1)
          .find('p'),
      ).toHaveLength(1)
    })

    describe('when Helmet is rendered', () => {
      test('should have a meta prop', () => {
        expect(wrapper.find(Helmet).prop('meta')).toBeTruthy()
      })

      test('should have a script prop', () => {
        expect(wrapper.find(Helmet).prop('script')).toBeTruthy()
      })

      test('should have a title prop', () => {
        expect(wrapper.find(Helmet).prop('title')).toBeTruthy()
      })
    })
  })
})
