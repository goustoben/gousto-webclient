export const getIsSocialBelongingEnabled = ({ features }) =>
  features && features.getIn(['isSocialBelongingEnabled', 'value'], false)

export const getIsBoxSizeVerticalLayoutEnabled = ({ features }) =>
  features && features.getIn(['isBoxSizeVerticalLayoutEnabled', 'value'], false)
