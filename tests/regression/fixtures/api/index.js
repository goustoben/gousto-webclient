import { interceptApiEndpoint, interceptApiEndpointWithQuery, fixturePath, HTTP_METHODS, HTTP_STATUS_CODES } from './helpers'

const GoustoApi = {
  identify: {
    success: {
      testUser: {
        statusCode: HTTP_STATUS_CODES.OK,
        fixture: fixturePath('identify/success-test-user.json'),
      },
    },
  },
  login: {
    success: {
      testUser: {
        statusCode: HTTP_STATUS_CODES.OK,
        fixture: fixturePath('login/success-test-user.json'),
      },
    },
  },

  boxPrices: {
    OK: () => interceptApiEndpoint('boxPrices', 'default-ok')
  },

  brand: {
    v1: {
      theme: {
        OK: () => interceptApiEndpoint('brand/v1/theme', 'default-ok')
      },
      'menu-headers': {
        OK: () => interceptApiEndpoint('brand/v1/menu-headers', 'default-ok')
      }
    }
  },
  
  clientmetrics: {
    v1:{
      metric:{
        OK: () => interceptApiEndpoint('clientmetrics/v1/metric', 'default-ok')
      }
    }
  },
  
  deliveries: {
    'v1.0':{
      days: {
        OK: () => interceptApiEndpointWithQuery('deliveries/v1.0/days', '*', 'default-ok')
      }
    }
  },
  
  delivery_day:{
    $day:{
      stock: {
        OK: () => interceptApiEndpoint('delivery_day/*/stock', 'default-ok', HTTP_METHODS.GET, 200, false, {
          fixture: 'api/delivery_day/$day/stock/default-ok.json'
        }),
      }
    }
  },
  
  menu: {
    v1: {
      menus: {
        OK: () => interceptApiEndpointWithQuery('menu/v1/menus', '*', 'default-ok'),
      },
    },
  },
  
  order: {
    preview: {
      OK: () => interceptApiEndpoint('order/preview', 'default-ok'),
    }
  }, 
  
  payments: {
    v1: {
      payments: {
        token: {
          OK: () => interceptApiEndpoint('payments/v1/payments/token', 'default-ok'),
        }
      }
    }
  },
  
  prices: {
    OK: () => interceptApiEndpointWithQuery('prices', '*', 'default-ok')
  },

  user: {
    current: {
      notFound: () => interceptApiEndpoint('user/current', 'not-found', HTTP_METHODS.GET, 401, true),
      orders: {
        notFound: () => interceptApiEndpointWithQuery('user/current/orders', '*', 'not-found', HTTP_METHODS.GET, 401, true)
      },
      projectedDeliveries: {
        notFound: () => interceptApiEndpointWithQuery('user/current/projected-deliveries', '*', 'not-found', HTTP_METHODS.GET, 401, true)        
      },
    }
  },  
}

    
   
   

export { GoustoApi }

// this.api.menu.v1.menus.fakeSuccess()
// cy.intercept('GET', 'https://staging-api.gousto.info/menu/v1/menus?*', { statusCode: 200, fixture: 'api/menu/v1/menus' })
