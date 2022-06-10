import {
  GirlsNightGoodies,
  FathersDayTreat,
  BirthdayPartyPack,
  CocktailsOnTheCouch,
  WimbledonWinners,
  TheUltimateDateNightDuo,
  FilmAndAFeast,
  SeriouslyCheesyCroissants,
  PicnicInThePark,
  BestEverBaconBaps,
  MakeYourOwnMovieNight,
  StatesStyleBrunch,
  MatchDayGoodies,
} from './bundlesData'

export const bundles = [
  {
    menuWeek: '516',
    bundles: [GirlsNightGoodies, FathersDayTreat, BirthdayPartyPack],
  },
  {
    menuWeek: '517',
    bundles: [
      CocktailsOnTheCouch,
      WimbledonWinners,
      TheUltimateDateNightDuo,
      FilmAndAFeast,
      BirthdayPartyPack,
    ],
  },
  {
    menuWeek: '518',
    bundles: [
      { ...SeriouslyCheesyCroissants, isNew: true },
      { ...WimbledonWinners, isNew: true },
      { ...CocktailsOnTheCouch, isNew: true },
      { ...PicnicInThePark, isNew: true },
    ],
  },
  {
    menuWeek: '519',
    bundles: [
      { ...BestEverBaconBaps, isNew: true },
      { ...TheUltimateDateNightDuo, isNew: true },
      { ...MakeYourOwnMovieNight, isNew: true },
      { ...StatesStyleBrunch, isNew: true },
      { ...GirlsNightGoodies, isNew: true },
      WimbledonWinners,
    ],
  },
  {
    menuWeek: '520',
    bundles: [
      GirlsNightGoodies,
      { ...FilmAndAFeast, isNew: true },
      PicnicInThePark,
      { ...MatchDayGoodies, isNew: true },
      CocktailsOnTheCouch,
    ],
  },
  {
    menuWeek: '521',
    bundles: [
      TheUltimateDateNightDuo,
      SeriouslyCheesyCroissants,
      BirthdayPartyPack,
      PicnicInThePark,
      MakeYourOwnMovieNight,
    ],
  },
  {
    menuWeek: '515',
    bundles: [
      GirlsNightGoodies,
      FathersDayTreat,
      BirthdayPartyPack,
      CocktailsOnTheCouch,
      WimbledonWinners,
      TheUltimateDateNightDuo,
      FilmAndAFeast,
      SeriouslyCheesyCroissants,
      PicnicInThePark,
      BestEverBaconBaps,
      MakeYourOwnMovieNight,
      StatesStyleBrunch,
      { ...MatchDayGoodies, isNew: true },
    ],
  },
]
