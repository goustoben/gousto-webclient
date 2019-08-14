import React from 'react'
import Icon from 'components/Icon'
import Content from 'containers/Content'

module.exports = {
  hero: {
    header: 'A recipe box full of flavour',
    subheader: 'Precise ingredients, delicious recipes and a dollop of adventure.',
  },
  testimonials: [
    {
      author: 'Mrs H Pyke',
      title: 'Gousto has changed my life....',
      body: 'I cannot thank Gousto enough. What a fantastic idea! I have always struggled with time and ideas around what to cook. Now I am producing delicious, fresh and \'made from scratch\' meals for my family. I love that I don\'t have to think about what to make for our meals, its all done for me and delivered to my door (no more wandering around the supermarket hoping for inspiration). I am learning new skills and really enjoying it. I am telling everyone about Gousto, thanks so much!',
      url: 'https://uk.trustpilot.com/reviews/581cf1892ae760087cadbf17',
    },
    {
      author: 'Sophie',
      title: 'Easy, convenient and super tasty!!!',
      body: 'The best decision for my partner and I as we both work long hours! We enjoy cooking from scratch, as we know what goes into what we are eating! There is a fantastic range of meals available, all super tasty! 100% recommend to anyone!',
      url: 'https://uk.trustpilot.com/reviews/5824c0f72ae760087caf02b7',
    },
    {
      author: 'Sharon Wood',
      title: 'Hey Presto - Dinner!',
      body: 'This is a simple and convenient way to cook restaurant quality food at home. The recipes are easy to follow with everything you need in exactly the right amounts. There is a good choice of meals with new recipes added every week. All ingredients are of a vey high quality and are packed in reusable/recyclable chilled packaging. With flexible delivery schedules I would highly recommend Gousto to anybody.',
      url: 'https://uk.trustpilot.com/reviews/5824bee32ae760087caf0213',
    },
  ],
  subscription: {
    header: 'How does Gousto work?',
    description: '',
    graphicType: 'svg',
    steps: [{
      path: 'icon-choose',
      title: 'You choose',
      description: 'Up to 40 exciting recipes each week.',
    }, {
      path: 'icon-delivery',
      title: 'We deliver',
      description: '7 days a week.  Pause or skip anytime.',
    }, {
      path: 'icon-cook',
      title: 'You cook',
      description: 'Tasty home cooked meals, without all the fuss.',
    }],
  },
  //ContentKeys have been changed to Keys+"Default" to bypass CMS until CMS is working properly
  howItWorks: {
    header: <Content contentKeys={'productBenefitTitleDefault'}><span>3 simple reasons to choose Gousto</span></Content>,
    description: <Content contentKeys={'productBenefitDescriptionDefault'}><span>With the right ingredients, you can create something amazing.</span></Content>,
    steps: (variant) => ([
      {
        path: (variant === 'tv') ? require('media/photos/quality-alt.jpg') : require('media/photos/quality.jpg'), // eslint-disable-line global-require
        title: <Content contentKeys={'firstProductBenefitTitleDefault'}><span>Quality</span></Content>,
        description: <Content contentKeys={'firstProductBenefitDescriptionDefault'}><span>Fresh ingredients for tasty, home-cooked dinners.</span></Content>,
      },
      {
        path: (variant === 'tv') ? require('media/photos/simplicity-alt.jpg') : require('media/photos/simplicity.jpg'), // eslint-disable-line global-require
        title: <Content contentKeys={'secondProductBenefitTitleDefault'}><span>Simplicity</span></Content>,
        description: <Content contentKeys={'secondProductBenefitDescriptionDefault'}><span>Easy to follow recipes and perfectly measured ingredients.</span></Content>,
      },
      {
        path: (variant === 'tv') ? require('media/photos/variety-alt.jpg') : require('media/photos/variety.jpg'), // eslint-disable-line global-require
        title: <Content contentKeys={'thirdProductBenefitTitleDefault'}><span>Variety</span></Content>,
        description: <Content contentKeys={'thirdProductBenefitDescriptionDefault'}><span>From family classics and ten minute meals to Fine Dine In.</span></Content>,
      },
    ]),
  },
  CTA: {
    main: <span>Get started <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
    join: <span>Get started <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
    loggedIn: {
      main: <span>See Menu <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
      join: <span>See Menu <Icon name="fa-angle-right" size="1.5rem" style={{ marginLeft: '8px', verticalAlign: 'text-top' }} /></span>,
    },
  },
  promo: {
    // loggedIn|loggedOut|any
    applyIf: 'loggedOut',
    code: 'DTI-SB-63',
    banner: {
      text: 'Summer sale! Click here to get 60% off your first box and 30% off all other boxes in your first month',
      linkText: 'Claim discount',
    },
  },
  emailForm: {
    emailRequired: 'Please provide a valid email address',
    serverError: 'There is a techinal issue, please try again later',
  },
  knownVariants: [
    'default',
    'tv',
  ],
  defaultVariant: 'default',
}
