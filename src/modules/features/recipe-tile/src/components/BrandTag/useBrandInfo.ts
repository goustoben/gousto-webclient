/**
 *  This hook is a stub of real one from webclient.
 *
 * Revisit when it is clear where there original implementation
 * has to be moved in order to allow its re-use
 * in module.
 */

import { Tag } from "./useRecipeBrandTag"

type UseBrandInfo = {
  brand: {
    tags: Tag[]
  }
}

export const useBrandInfo = (): UseBrandInfo => ({
  brand: {
    "tags": [
      {
        "type": "general",
        "slug": "new",
        "text": "New",
        "themes": [
          {
            "name": "light",
            "color": "#01A92B",
            "borderColor": "#01A92B"
          }
        ]
      },
      {
        "type": "general",
        "slug": "oven-ready",
        "text": "Oven ready",
        "themes": [
          {
            "name": "light",
            "backgroundColor": "#f2f6f9",
            "color": "#333d47"
          },
          {
            "name": "dark",
            "backgroundColor": "#333d47",
            "color": "#d2d6d9"
          }
        ]
      },
      {
        "type": "general",
        "slug": "available-weekly",
        "text": "Available weekly",
        "themes": [
          {
            "name": "light",
            "backgroundColor": "#f2f6f9",
            "color": "#333d47"
          },
          {
            "name": "dark",
            "backgroundColor": "#333d47",
            "color": "#d2d6d9"
          }
        ]
      },
      {
        "type": "general",
        "slug": "surcharge",
        "text": "£{} per serving",
        "themes": [
          {
            "name": "light",
            "backgroundColor": "#e8c575",
            "color": "#333d47"
          }
        ]
      },
      {
        "type": "general",
        "slug": "new-eme",
        "text": "NEW",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF",
            "backgroundColor": "#01A92B"
          }
        ]
      },
      {
        "type": "general",
        "slug": "limited-edition-eme",
        "text": "NEW",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF",
            "backgroundColor": "#01A92B"
          }
        ]
      },
      {
        "type": "general",
        "slug": "available-weekly-eme",
        "text": "EVERYDAY FAVOURITES",
        "themes": [
          {
            "name": "light",
            "color": "#C20026"
          }
        ]
      },
      {
        "type": "availability",
        "slug": "new-availability",
        "text": "NEW",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF",
            "backgroundColor": "#01A92B"
          }
        ]
      },
      {
        "type": "availability",
        "slug": "limited-range-availability",
        "text": "LIMITED RANGE",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF",
            "backgroundColor": "#333D47"
          }
        ]
      },
      {
        "type": "promotion",
        "slug": "joe-wicks",
        "text": "JOE WICKS",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF",
            "backgroundColor": "#0053C7"
          },
          {
            "name": "dark",
            "color": "#0053C7",
            "backgroundColor": "#F4F7FA"
          }
        ]
      },
      {
        "type": "promotion",
        "slug": "joe-wicks-eme",
        "text": "JOE WICKS",
        "themes": [
          {
            "name": "light",
            "color": "#0053C7"
          },
          {
            "name": "dark",
            "color": "#1577FF"
          }
        ]
      },
      {
        "type": "promotion",
        "slug": "fine-dine-in-eme",
        "text": "FINE DINE IN",
        "themes": [
          {
            "name": "light",
            "color": "#F4D13D"
          }
        ]
      },
      {
        "type": "promotion",
        "slug": "health-kitchen-eme",
        "text": "HEALTH KITCHEN",
        "themes": [
          {
            "name": "light",
            "color": "#018F25"
          },
          {
            "name": "dark",
            "color": "#01A92B"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "joe-wicks-tagline",
        "text": "JOE WICKS",
        "themes": [
          {
            "name": "light",
            "color": "#0053C7"
          },
          {
            "name": "dark",
            "color": "#1577FF"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "fine-dine-in-tagline",
        "text": "FINE DINE IN",
        "themes": [
          {
            "name": "light",
            "color": "#F4D13D"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "health-kitchen-tagline",
        "text": "HEALTH KITCHEN",
        "themes": [
          {
            "name": "light",
            "color": "#018F25"
          },
          {
            "name": "dark",
            "color": "#01A92B"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "everyday-favourites-tagline",
        "text": "EVERYDAY FAVOURITES",
        "themes": [
          {
            "name": "light",
            "color": "#C20026"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "all-chopped",
        "text": "ALL CHOPPED",
        "themes": [
          {
            "name": "light",
            "color": "#9F4FC5"
          },
          {
            "name": "dark",
            "color": "#B565DB"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "prepped-in-five",
        "text": "PREPPED IN 5",
        "themes": [
          {
            "name": "light",
            "color": "#1A8087"
          },
          {
            "name": "dark",
            "color": "#A1CFD3"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "ten-minute-meals",
        "text": "10-MINUTE",
        "themes": [
          {
            "name": "light",
            "color": "#CF4B01"
          },
          {
            "name": "dark",
            "color": "#F86125"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "diy-pizza-base",
        "text": "DIY Pizza",
        "themes": [
          {
            "name": "light",
            "color": "#ADB1B5"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "healthy-choices",
        "text": "HEALTHY CHOICES",
        "themes": [
          {
            "name": "light",
            "color": "#F25801"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "sustainable-packaging-trial",
        "text": "SUSTAINABLE PACKAGING TRIAL",
        "themes": [
          {
            "name": "light",
            "color": "#7DA458"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "joe-wicks-picks",
        "text": "JOE WICKS’ PICKS",
        "themes": [
          {
            "name": "light",
            "color": "#05594C"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "chinese-new-year",
        "text": "CHINESE NEW YEAR",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "valentines-day",
        "text": "Valentine’s Day",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "pasta-pronto",
        "text": "Pasta Pronto",
        "themes": [
          {
            "name": "light",
            "color": "#B7CF93"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "takeaway-night",
        "text": "Takeaway Night",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "gousto-x-jolly-jog",
        "text": "Gousto x Jolly Hog",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF"
          }
        ]
      },
      {
        "type": "tagline",
        "slug": "easter",
        "text": "Easter",
        "themes": [
          {
            "name": "light",
            "color": "#FFFFFF"
          }
        ]
      },
      {
        "type": "health-claim",
        "slug": "carb-refuel",
        "text": "Carb refuel",
        "icon": "arrow-up",
        "themes": [
          {
            "name": "light",
            "color": "#333D47",
            "backgroundColor": "#E2F9E9",
            "iconColor": "#00B066"
          },
          {
            "name": "dark",
            "color": "#D3D6D9",
            "backgroundColor": "#2A5032",
            "iconColor": "#63AA70"
          }
        ]
      },
      {
        "type": "health-claim",
        "slug": "reduced-carbs",
        "text": "Reduced carbs",
        "icon": "arrow-down",
        "themes": [
          {
            "name": "light",
            "color": "#333D47",
            "backgroundColor": "#E2F9E9",
            "iconColor": "#00B066"
          },
          {
            "name": "dark",
            "color": "#D3D6D9",
            "backgroundColor": "#2A5032",
            "iconColor": "#63AA70"
          }
        ]
      },
      {
        "type": "health-claim",
        "slug": "health-kitchen",
        "text": "Good for you",
        "icon": "health-kitchen-heart",
        "themes": [
          {
            "name": "light",
            "color": "#333D47",
            "backgroundColor": "#E2F9E9",
            "iconColor": "#00B066"
          },
          {
            "name": "dark",
            "color": "#D3D6D9",
            "backgroundColor": "#2A5032",
            "iconColor": "#63AA70"
          }
        ]
      }
    ],
  }
})
