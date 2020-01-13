import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Immutable from 'immutable'

import Link from 'Link'
import routes from 'config/routes'
import Content from 'containers/Content'

import css from './OrderRecipes.css'
import OrderRecipeBox from './OrderRecipeBox'

const OrderRecipes = ({
  recipes,
  orderId,
  orderState,
  whenCutoff,
  portionsCount,
}) => (
    <div>
      <div className={css.headerRow}>
        <Content contentKeys="mydeliveriesOrderOrderrecipesTitle">
          <span className={css.header}>Recipe box</span>
        </Content>
        {['menu open', 'recipes chosen'].indexOf(orderState) > -1 ? (
<div className={css.buttonRow}>
            <Link className={css.editLink} to={`${routes.client.menu}/${orderId}`} clientRouted={false}>
              {orderState === 'recipes chosen' ? 'Edit recipes' : 'Choose recipes'}
            </Link>
          </div>
        ): null}
      </div>
      <OrderRecipeBox recipes={recipes} orderState={orderState} portionsCount={portionsCount} />
      {orderState === 'menu open' ? (
<div className={css.textRow}>
          <p className={css.subHeader}>
            <Content contentKeys="mydeliveriesOrderOrderrecipesMessage">
              <span>You haven't chosen any recipes yet.</span>
            </Content>
          </p>
          <p>If you do not choose by <strong>{whenCutoff}</strong>, Gousto will send you a selection of recipes based on your subscription settings.</p>
        </div>
      ): null}
    </div>
)

OrderRecipes.propTypes = {
  recipes: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      recipeImage: PropTypes.string,
      recipeTitle: PropTypes.string,
    })
  ),
  orderId: PropTypes.string,
  orderState: PropTypes.string,
  whenCutoff: PropTypes.string,
  portionsCount: PropTypes.string,
}

OrderRecipes.defaultProps = {
  recipes: Immutable.List([]),
  orderId: '',
  orderState: '',
  whenCutoff: '',
  portionsCount: '2',
}

export default OrderRecipes
