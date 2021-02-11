import { frequencyMapping, frequencyMappingB, frequencyMappingC } from '../enum/frequency'

export const getFrequencyVariant = ({ currentUserId }) => {
  if (currentUserId % 3 === 0) {
    return { variation: 'A', frequency: frequencyMapping }
  } else if (currentUserId % 3 === 1) {
    return { variation: 'B', frequency: frequencyMappingB }
  } else {
    return { variation: 'C', frequency: frequencyMappingC }
  }
}
