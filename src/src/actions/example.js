import fetch from 'isomorphic-fetch'
/* eslint-disable camelcase */
function example_receiveCategories(data) {
  return ({
    type: 'RECEIVE_CATEGORIES',
    categories: data,
  })
}

export default {
  example_loadCategories: () => (
    (dispatch) => (
      fetch('https://api.gousto.co.uk/products/v2.0/categories')
        .then(req => req.json())
        .then(json => dispatch(example_receiveCategories(json.data)))
    )
  ),
}
