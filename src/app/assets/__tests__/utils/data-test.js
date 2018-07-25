import { utils } from '@fe/gousto-generic'


describe('shuffleArray', () => {
	const originalArray = ['a', 'b', 'c', 'd', 'e']

	function arraysAreEqual(arr1, arr2) {
		if (arr1.length !== arr2.length) {
			return false
		}
		for (let i = arr1.length; i--;) {
			if (arr1[i] !== arr2[i]) {
				return false
			}
		}

		return true
	}

	it('should accept array and return an array with the same number of items', () => {
		const shuffledArray = utils.data.shuffleArray(originalArray)
		expect(shuffledArray).toEqual(jasmine.any(Array))
		expect(shuffledArray.length).toEqual(originalArray.length)
	})

	it('should return array in a different order than original array at least 90% of the time', () => {
		const totalIterations = 60
		let passedIterations = 0

		for (let i = 0; i < totalIterations; i++) {
			const shuffledArray = utils.data.shuffleArray([...originalArray])
			if (!arraysAreEqual(originalArray, shuffledArray)) {
				passedIterations++
			}
		}

		expect(passedIterations * 100 / totalIterations).not.toBeLessThan(90)
	})
})
