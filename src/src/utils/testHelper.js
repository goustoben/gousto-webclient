/**
 * Stub child components life cycle events
 * @param sinon
 * @returns {function(*, *=)}
 */
export function stubComponent(sinon) {
  return (component, overwrites = {}) => {
    const overwriteMethods = Object.keys(overwrites)
    const lifecycleMethods = [
      'componentWillMount',
      'componentDidMount',
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'componentDidUpdate',
      'componentWillUnmount',
    ].filter(method => overwriteMethods.indexOf(method) === -1)

    const stubs = {}
    lifecycleMethods.forEach(method => {
      if (typeof component.prototype[method] !== 'undefined') {
        stubs[method] = sinon.stub(component.prototype, method).returns(null)
      }
    })

    overwriteMethods.forEach(method => {
      if (typeof component.prototype[method] !== 'undefined') {
        stubs[method] = sinon.stub(component.prototype, method)
          .callsFake(function () {
            return overwrites[method].apply(this, this.props)
          })
      }
    })

    return stubs
  }
}
