export const getRecipeTotal = ({ pricing }) => pricing.getIn(['prices','recipeTotal'])

export const getLoading = ({pricing}) => pricing.get('pending')
