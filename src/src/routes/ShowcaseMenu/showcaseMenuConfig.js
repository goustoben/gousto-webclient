/**
 * For the purposes of the experiment, the categories should be displayed in a
 * well-defined order.  On small screens, two lines of pills should be
 * displayed.  The descriptors contain:
 *
 * - line: which line the pill should be displayed on
 * - shortTitle: user-visible title to use while the data from server isn't available yet
 * - slug: corresponds to the server's represenation of the collection
 */
export const collectionDescriptors = [
  {
    slug: 'all-recipes',
    line: 0,
    shortTitle: 'All Recipes',
  },
  {
    slug: 'healthy-choices',
    line: 0,
    shortTitle: 'Healthy Choices',
  },
  {
    slug: 'lean-in-15',
    line: 0,
    shortTitle: 'Lean in 15',
  },
  {
    slug: 'fish',
    line: 0,
    shortTitle: 'Fish',
  },
  {
    slug: 'prepped-in-5',
    line: 0,
    shortTitle: 'Prepped in 5',
  },
  {
    slug: 'beef-pork',
    line: 0,
    shortTitle: 'Beef & Pork',
  },
  {
    slug: 'dairy-free',
    line: 0,
    shortTitle: 'Dairy-Free',
  },
  {
    slug: '10-minute-meals',
    line: 1,
    shortTitle: '10-Minute Meals',
  },
  {
    slug: 'vegetarian',
    line: 1,
    shortTitle: 'Vegetarian',
  },
  {
    slug: 'everyday-favourites',
    line: 1,
    shortTitle: 'Everyday Favourites',
  },
  {
    slug: 'chicken',
    line: 1,
    shortTitle: 'Chicken',
  },
  {
    slug: 'plant-based',
    line: 1,
    shortTitle: 'Plant-Based',
  },
  {
    slug: 'gluten-free',
    line: 1,
    shortTitle: 'Gluten-Free',
  },
]
