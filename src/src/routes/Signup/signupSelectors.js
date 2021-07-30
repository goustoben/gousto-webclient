export const getIsSocialBelongingEnabled = ({ features }) =>
  features && features.getIn(['isSocialBelongingEnabled', 'value'], false)
