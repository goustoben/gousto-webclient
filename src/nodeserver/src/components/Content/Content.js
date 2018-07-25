import React, { PropTypes } from 'react'
import logger from 'utils/logger'

const Content = (props) => {
	function getValueFromStores(valuePath, stores) {
		let value = null
		const arrayOfPath = valuePath.split('.')
		const storeName = arrayOfPath[0]
		if (storeName && stores[storeName]) {
			arrayOfPath.splice(0, 1)
			value = stores[storeName].getIn(arrayOfPath)
		}

		return value
	}

	const replacePlaceholders = (string, stores) => {
		const placeholderStart = '{:'
		const placeholderEnd = ':}'
		const regExp = new RegExp(`\\${placeholderStart}(.*?)\\${placeholderEnd}`, 'g')
		let replacedString = string
		const placeholders = string.match(regExp)
		if (!placeholders) return string
		Object.keys(placeholders).every((key) => {
			const placeholder = placeholders[key]
			const valuePath = placeholders[key].replace(placeholderStart, '').replace(placeholderEnd, '')
			const value = getValueFromStores(valuePath, stores)
			if (!value) {
				logger.warning('failPlaceholderReplacement', `Placeholder not replaced: ${placeholder}`)
				replacedString = null

				return false
			}
			replacedString = replacedString.replace(placeholders[key], value)

			return true
		})

		return replacedString
	}

	const getReplacedFieldValue = () => {
		const contentKeyParts = props.contentKeys.split('.')
		const value = props.state.content.getIn(contentKeyParts)
		if (!value) {
			logger.warning('failContentReplacement', `No value found for key: ${props.contentKeys}`)

			return null
		}

		return replacePlaceholders(value, props.state)
	}

	const handleInjectHtml = (component) => {
		const value = getReplacedFieldValue()
		if (value) {
			const componentProps = {
				children: value,
			}

			return React.cloneElement(component, componentProps, componentProps.children)
		}

		return component
	}

	const handleInjectReact = (component) => {
		const childProps = {}
		const propName = Object.keys(component.props).find((key) => key === props.propNames)
		const value = getReplacedFieldValue()
		if (value) {
			childProps[propName] = value
		}

		return React.cloneElement(component, childProps, component.props.children)
	}

	const injectContent = (child) => {
		if (!React.isValidElement(child)) return child
		if (typeof child.type === 'function') return handleInjectReact(child)

		return handleInjectHtml(child)
	}

	return (
		injectContent(props.children)
	)
}

Content.propTypes = {
	children: PropTypes.node.isRequired,
	contentKeys: PropTypes.string.isRequired,
	propNames: PropTypes.string,
	state: PropTypes.object.isRequired,
}

export default Content
