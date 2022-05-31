import { TestBundle1, TestBundle2 } from './bundlesData'

export const bundles = [
  {
    menuWeek: '516',
    bundles: [
      { ...TestBundle1, isNew: true },
      { ...TestBundle2, isNew: true },
    ],
  },
  {
    menuWeek: '517',
    bundles: [TestBundle1],
  },
  {
    menuWeek: '518',
    bundles: [{ ...TestBundle2, isNew: true }, TestBundle1],
  },
  {
    menuWeek: '519',
    bundles: [TestBundle1, TestBundle2],
  },
  {
    menuWeek: '520',
    bundles: [TestBundle2, TestBundle1],
  },
  {
    menuWeek: '521',
    bundles: [TestBundle2],
  },
]
