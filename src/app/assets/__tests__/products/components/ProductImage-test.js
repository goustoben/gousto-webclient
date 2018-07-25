

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const ProductImage = require('../../../js/products/components/product/ProductImage')

describe('ProductImage', function() {
    beforeEach(function() {
        shallowRenderer = Enzyme.shallow
    })

    it('should return a <div> when no image urls are specified', function() {
        let image_prop = {
            'size': 50,
            'images': {
                50: null
            }
        }

        const result = shallowRenderer(<ProductImage images={image_prop.images} size={image_prop.size} />)


        expect(result.type()).toBe('div')
    })

    it('should return a <img> when this.prop.images contains corresponding urls', function() {
        let image_prop = {
            '365': {
                url: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/theme-logo/some_logo.svg'
            }
        }

        const result = shallowRenderer(<ProductImage images={image_prop} size="365" />)


        expect(result.type()).toBe('img')
    })
})
