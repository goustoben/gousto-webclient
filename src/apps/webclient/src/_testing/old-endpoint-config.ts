/*
  This file is here to provide a way of testing the new endpoint inplementation against the old endpoint code.
  We can likely safely delete this after the new implementation has bedded in.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OldEndpointConfig {
  export type Endpoints = {
    [key: string]: Environment
  }

  export type Environment = {
    envDomain: string
    services: Services
  }

  export type Services = {
    [key: string]: ServiceVersions
  }

  export type ServiceDetails = {
    versionString: EndpointVersionString
    clientSide: ServiceUrls
    serverSide: ServiceUrls
  }

  export type ServiceUrls = {
    live: string
    local: string
  }

  export type EndpointVersionString = '' | 'v1' | 'v1.0' | 'v1.0.0' | 'v2' | 'v2.0'

  export type ServiceVersions = {
    [key: string]: ServiceDetails
  }
}

export const oldEndpointConfig = (): OldEndpointConfig.Endpoints => ({
  staging: {
    envDomain: 'gousto.info',
    services: {
      auth: {
        1: {
          versionString: 'v1.0.0',
          clientSide: {
            live: 'https://staging-api.gousto.info/auth/v1.0.0',
            local: 'https://staging-api.gousto.info/auth/v1.0.0',
          },
          serverSide: {
            live: 'http://staging-auth.gousto.info',
            local: 'https://staging-api.gousto.info/auth/v1.0.0',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://staging-api.gousto.info/auth/v2',
            local: 'https://staging-api.gousto.info/auth/v2',
          },
          serverSide: {
            live: 'http://staging-auth.gousto.info',
            local: 'https://staging-api.gousto.info/auth/v2',
          },
        },
      },
      brand: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/brand/v1',
            local: 'https://staging-api.gousto.info/brand/v1',
          },
          serverSide: {
            live: 'http://staging-brand.gousto.info',
            local: 'https://staging-api.gousto.info/brand/v1',
          },
        },
      },
      clientmetrics: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/clientmetrics/v1',
            local: 'https://staging-api.gousto.info/clientmetrics/v1',
          },
          serverSide: {
            live: 'http://staging-clientmetrics.gousto.info',
            local: 'https://staging-api.gousto.info/clientmetrics/v1',
          },
        },
      },
      collections: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/collections/v1',
            local: 'https://staging-api.gousto.info/collections/v1',
          },
          serverSide: {
            live: 'http://staging-collections.gousto.info',
            local: 'https://staging-api.gousto.info/collections/v1',
          },
        },
      },
      complaints: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/complaints/v1',
            local: 'https://staging-api.gousto.info/complaints/v1',
          },
          serverSide: {
            live: 'http://staging-complaints.gousto.info',
            local: 'https://staging-api.gousto.info/complaints/v1',
          },
        },
      },
      content: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/content/v1',
            local: 'https://staging-api.gousto.info/content/v1',
          },
          serverSide: {
            live: 'http://staging-content.gousto.info',
            local: 'https://staging-api.gousto.info/content/v1',
          },
        },
      },
      core: {
        1: {
          versionString: '',
          clientSide: {
            live: 'https://staging-api.gousto.info',
            local: 'https://staging-api.gousto.info',
          },
          serverSide: {
            live: 'http://staging-core.gousto.info',
            local: 'https://staging-api.gousto.info',
          },
        },
      },
      customers: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/customers/v1',
            local: 'https://staging-api.gousto.info/customers/v1',
          },
          serverSide: {
            live: 'http://staging-customers.gousto.info',
            local: 'https://staging-api.gousto.info/customers/v1',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://staging-api.gousto.info/customers/v2',
            local: 'https://staging-api.gousto.info/customers/v2',
          },
          serverSide: {
            live: 'http://staging-customers.gousto.info',
            local: 'https://staging-api.gousto.info/customers/v2',
          },
        },
      },
      deliveries: {
        1: {
          versionString: 'v1.0',
          clientSide: {
            live: 'https://staging-api.gousto.info/deliveries/v1.0',
            local: 'https://staging-api.gousto.info/deliveries/v1.0',
          },
          serverSide: {
            live: 'http://staging-deliveries.gousto.info',
            local: 'https://staging-api.gousto.info/deliveries/v1.0',
          },
        },
      },
      felogging: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/felogging/v1',
            local: 'https://staging-api.gousto.info/felogging/v1',
          },
          serverSide: {
            live: 'http://staging-felogging.gousto.info',
            local: 'https://staging-api.gousto.info/felogging/v1',
          },
        },
      },
      loggingmanager: {
        1: {
          versionString: '',
          clientSide: {
            live: 'https://staging-api.gousto.info/loggingmanager',
            local: 'https://staging-api.gousto.info/loggingmanager',
          },
          serverSide: {
            live: 'https://staging-api.gousto.info/loggingmanager',
            local: 'https://staging-api.gousto.info/loggingmanager',
          },
        },
      },
      menu: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/menu/v1',
            local: 'https://staging-api.gousto.info/menu/v1',
          },
          serverSide: {
            live: 'http://staging-menu.gousto.info',
            local: 'https://staging-api.gousto.info/menu/v1',
          },
        },
      },
      order: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/order/v1',
            local: 'https://staging-api.gousto.info/order/v1',
          },
          serverSide: {
            live: 'http://staging-order.gousto.info',
            local: 'https://staging-api.gousto.info/order/v1',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://staging-api.gousto.info/order/v2',
            local: 'https://staging-api.gousto.info/order/v2',
          },
          serverSide: {
            live: 'http://staging-order.gousto.info',
            local: 'https://staging-api.gousto.info/order/v2',
          },
        },
      },
      orders: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/orders/v1',
            local: 'https://staging-api.gousto.info/orders/v1',
          },
          serverSide: {
            live: 'http://staging-orders.gousto.info',
            local: 'https://staging-api.gousto.info/orders/v1',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://staging-api.gousto.info/orders/v2',
            local: 'https://staging-api.gousto.info/orders/v2',
          },
          serverSide: {
            live: 'http://staging-orders.gousto.info',
            local: 'https://staging-api.gousto.info/orders/v2',
          },
        },
      },
      orderskiprecovery: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/orderskiprecovery/v1',
            local: 'https://staging-api.gousto.info/orderskiprecovery/v1',
          },
          serverSide: {
            live: 'http://staging-orderskiprecovery.gousto.info',
            local: 'https://staging-api.gousto.info/orderskiprecovery/v1',
          },
        },
      },
      payments: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/payments/v1',
            local: 'https://staging-api.gousto.info/payments/v1',
          },
          serverSide: {
            live: 'http://staging-payments.gousto.info',
            local: 'https://staging-api.gousto.info/payments/v1',
          },
        },
      },
      products: {
        1: {
          versionString: 'v1.0',
          clientSide: {
            live: 'https://staging-api.gousto.info/products/v1.0',
            local: 'https://staging-api.gousto.info/products/v1.0',
          },
          serverSide: {
            live: 'http://staging-products.gousto.info',
            local: 'https://staging-api.gousto.info/products/v1.0',
          },
        },
        2: {
          versionString: 'v2.0',
          clientSide: {
            live: 'https://staging-api.gousto.info/products/v2.0',
            local: 'https://staging-api.gousto.info/products/v2.0',
          },
          serverSide: {
            live: 'http://staging-products.gousto.info',
            local: 'https://staging-api.gousto.info/products/v2.0',
          },
        },
      },
      // NOTE: the original config specified the version as '1'
      // changing to fix the test cases and follow the correct pattern
      recipes: {
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://staging-api.gousto.info/recipes/v2',
            local: 'https://staging-api.gousto.info/recipes/v2',
          },
          serverSide: {
            live: 'http://staging-recipes.gousto.info',
            local: 'https://staging-api.gousto.info/recipes/v2',
          },
        },
      },
      ssr: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/ssr/v1',
            local: 'https://staging-api.gousto.info/ssr/v1',
          },
          serverSide: {
            live: 'http://staging-ssr.gousto.info',
            local: 'https://staging-api.gousto.info/ssr/v1',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://staging-api.gousto.info/ssr/v2',
            local: 'https://staging-api.gousto.info/ssr/v2',
          },
          serverSide: {
            live: 'http://staging-ssr.gousto.info',
            local: 'https://staging-api.gousto.info/ssr/v2',
          },
        },
      },
      ssrdeliveries: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/ssrdeliveries/v1',
            local: 'https://staging-api.gousto.info/ssrdeliveries/v1',
          },
          serverSide: {
            live: 'http://staging-ssrdeliveries.gousto.info',
            local: 'https://staging-api.gousto.info/ssrdeliveries/v1',
          },
        },
      },
      ssrrecipecards: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/ssrrecipecards/v1',
            local: 'https://staging-api.gousto.info/ssrrecipecards/v1',
          },
          serverSide: {
            live: 'http://staging-ssrrecipecards.gousto.info',
            local: 'https://staging-api.gousto.info/ssrrecipecards/v1',
          },
        },
      },
      subpauseosr: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/subpauseosr/v1',
            local: 'https://staging-api.gousto.info/subpauseosr/v1',
          },
          serverSide: {
            live: 'http://staging-subpauseosr.gousto.info',
            local: 'https://staging-api.gousto.info/subpauseosr/v1',
          },
        },
      },
      subscriptioncommand: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/subscriptioncommand/v1',
            local: 'https://staging-api.gousto.info/subscriptioncommand/v1',
          },
          serverSide: {
            live: 'http://staging-subscriptioncommand.gousto.info',
            local: 'https://staging-api.gousto.info/subscriptioncommand/v1',
          },
        },
      },
      subscriptionquery: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/subscriptionquery/v1',
            local: 'https://staging-api.gousto.info/subscriptionquery/v1',
          },
          serverSide: {
            live: 'http://staging-subscriptionquery.gousto.info',
            local: 'https://staging-api.gousto.info/subscriptionquery/v1',
          },
        },
      },
      tastepreferences: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/tastepreferences/v1',
            local: 'https://staging-api.gousto.info/tastepreferences/v1',
          },
          serverSide: {
            live: 'http://staging-tastepreferences.gousto.info',
            local: 'https://staging-api.gousto.info/tastepreferences/v1',
          },
        },
      },
      userbucketing: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/userbucketing/v1',
            local: 'https://staging-api.gousto.info/userbucketing/v1',
          },
          serverSide: {
            live: 'http://staging-userbucketing.gousto.info',
            local: 'https://staging-api.gousto.info/userbucketing/v1',
          },
        },
      },
      userfeedback: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/userfeedback/v1',
            local: 'https://staging-api.gousto.info/userfeedback/v1',
          },
          serverSide: {
            live: 'http://staging-userfeedback.gousto.info',
            local: 'https://staging-api.gousto.info/userfeedback/v1',
          },
        },
      },
      webclient: {
        1: {
          versionString: '',
          clientSide: {
            live: 'https://staging-api.gousto.info',
            local: 'https://staging-api.gousto.info',
          },
          serverSide: {
            live: 'http://staging-webclient.gousto.info',
            local: 'https://staging-api.gousto.info',
          },
        },
      },
      workable: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://staging-api.gousto.info/workable/v1',
            local: 'https://staging-api.gousto.info/workable/v1',
          },
          serverSide: {
            live: 'http://staging-workable.gousto.info',
            local: 'https://staging-api.gousto.info/workable/v1',
          },
        },
      },
    },
  },
  production: {
    envDomain: 'gousto.co.uk',
    services: {
      auth: {
        1: {
          versionString: 'v1.0.0',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/auth/v1.0.0',
            local: 'https://production-api.gousto.co.uk/auth/v1.0.0',
          },
          serverSide: {
            live: 'http://production-auth.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/auth/v1.0.0',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/auth/v2',
            local: 'https://production-api.gousto.co.uk/auth/v2',
          },
          serverSide: {
            /* this is changed from the value in the config file - as it looks like the
             * current value 'http://production-api.gousto.co.uk' is incorrect! */
            live: 'http://production-auth.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/auth/v2',
          },
        },
      },
      brand: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/brand/v1',
            local: 'https://production-api.gousto.co.uk/brand/v1',
          },
          serverSide: {
            live: 'http://production-brand.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/brand/v1',
          },
        },
      },
      clientmetrics: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/clientmetrics/v1',
            local: 'https://production-api.gousto.co.uk/clientmetrics/v1',
          },
          serverSide: {
            live: 'http://production-clientmetrics.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/clientmetrics/v1',
          },
        },
      },
      collections: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/collections/v1',
            local: 'https://production-api.gousto.co.uk/collections/v1',
          },
          serverSide: {
            live: 'http://production-collections.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/collections/v1',
          },
        },
      },
      complaints: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/complaints/v1',
            local: 'https://production-api.gousto.co.uk/complaints/v1',
          },
          serverSide: {
            live: 'http://production-complaints.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/complaints/v1',
          },
        },
      },
      content: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/content/v1',
            local: 'https://production-api.gousto.co.uk/content/v1',
          },
          serverSide: {
            live: 'http://production-content.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/content/v1',
          },
        },
      },
      core: {
        1: {
          versionString: '',
          clientSide: {
            live: 'https://production-api.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk',
          },
          serverSide: {
            live: 'http://production-core.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk',
          },
        },
      },
      customers: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/customers/v1',
            local: 'https://production-api.gousto.co.uk/customers/v1',
          },
          serverSide: {
            live: 'http://production-customers.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/customers/v1',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/customers/v2',
            local: 'https://production-api.gousto.co.uk/customers/v2',
          },
          serverSide: {
            live: 'http://production-customers.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/customers/v2',
          },
        },
      },
      deliveries: {
        1: {
          versionString: 'v1.0',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/deliveries/v1.0',
            local: 'https://production-api.gousto.co.uk/deliveries/v1.0',
          },
          serverSide: {
            live: 'http://production-deliveries.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/deliveries/v1.0',
          },
        },
      },
      felogging: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/felogging/v1',
            local: 'https://production-api.gousto.co.uk/felogging/v1',
          },
          serverSide: {
            live: 'http://production-felogging.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/felogging/v1',
          },
        },
      },
      loggingmanager: {
        1: {
          versionString: '',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/loggingmanager',
            local: 'https://production-api.gousto.co.uk/loggingmanager',
          },
          serverSide: {
            live: 'https://production-api.gousto.co.uk/loggingmanager',
            local: 'https://production-api.gousto.co.uk/loggingmanager',
          },
        },
      },
      menu: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/menu/v1',
            local: 'https://production-api.gousto.co.uk/menu/v1',
          },
          serverSide: {
            live: 'http://production-menu.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/menu/v1',
          },
        },
      },
      order: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/order/v1',
            local: 'https://production-api.gousto.co.uk/order/v1',
          },
          serverSide: {
            live: 'http://production-order.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/order/v1',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/order/v2',
            local: 'https://production-api.gousto.co.uk/order/v2',
          },
          serverSide: {
            live: 'http://production-order.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/order/v2',
          },
        },
      },
      orders: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/orders/v1',
            local: 'https://production-api.gousto.co.uk/orders/v1',
          },
          serverSide: {
            live: 'http://production-orders.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/orders/v1',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/orders/v2',
            local: 'https://production-api.gousto.co.uk/orders/v2',
          },
          serverSide: {
            live: 'http://production-orders.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/orders/v2',
          },
        },
      },
      orderskiprecovery: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/orderskiprecovery/v1',
            local: 'https://production-api.gousto.co.uk/orderskiprecovery/v1',
          },
          serverSide: {
            live: 'http://production-orderskiprecovery.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/orderskiprecovery/v1',
          },
        },
      },
      payments: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/payments/v1',
            local: 'https://production-api.gousto.co.uk/payments/v1',
          },
          serverSide: {
            live: 'http://production-payments.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/payments/v1',
          },
        },
      },
      products: {
        1: {
          versionString: 'v1.0',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/products/v1.0',
            local: 'https://production-api.gousto.co.uk/products/v1.0',
          },
          serverSide: {
            live: 'http://production-products.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/products/v1.0',
          },
        },
        2: {
          versionString: 'v2.0',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/products/v2.0',
            local: 'https://production-api.gousto.co.uk/products/v2.0',
          },
          serverSide: {
            live: 'http://production-products.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/products/v2.0',
          },
        },
      },
      recipes: {
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/recipes/v2',
            local: 'https://production-api.gousto.co.uk/recipes/v2',
          },
          serverSide: {
            live: 'http://production-recipes.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/recipes/v2',
          },
        },
      },
      ssr: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/ssr/v1',
            local: 'https://production-api.gousto.co.uk/ssr/v1',
          },
          serverSide: {
            live: 'http://production-ssr.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/ssr/v1',
          },
        },
        2: {
          versionString: 'v2',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/ssr/v2',
            local: 'https://production-api.gousto.co.uk/ssr/v2',
          },
          serverSide: {
            live: 'http://production-ssr.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/ssr/v2',
          },
        },
      },
      ssrdeliveries: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/ssrdeliveries/v1',
            local: 'https://production-api.gousto.co.uk/ssrdeliveries/v1',
          },
          serverSide: {
            live: 'http://production-ssrdeliveries.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/ssrdeliveries/v1',
          },
        },
      },
      ssrrecipecards: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/ssrrecipecards/v1',
            local: 'https://production-api.gousto.co.uk/ssrrecipecards/v1',
          },
          serverSide: {
            live: 'http://production-ssrrecipecards.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/ssrrecipecards/v1',
          },
        },
      },
      subpauseosr: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/subpauseosr/v1',
            local: 'https://production-api.gousto.co.uk/subpauseosr/v1',
          },
          serverSide: {
            live: 'http://production-subpauseosr.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/subpauseosr/v1',
          },
        },
      },
      subscriptioncommand: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/subscriptioncommand/v1',
            local: 'https://production-api.gousto.co.uk/subscriptioncommand/v1',
          },
          serverSide: {
            live: 'http://production-subscriptioncommand.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/subscriptioncommand/v1',
          },
        },
      },
      subscriptionquery: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/subscriptionquery/v1',
            local: 'https://production-api.gousto.co.uk/subscriptionquery/v1',
          },
          serverSide: {
            live: 'http://production-subscriptionquery.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/subscriptionquery/v1',
          },
        },
      },
      tastepreferences: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/tastepreferences/v1',
            local: 'https://production-api.gousto.co.uk/tastepreferences/v1',
          },
          serverSide: {
            live: 'http://production-tastepreferences.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/tastepreferences/v1',
          },
        },
      },
      userbucketing: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/userbucketing/v1',
            local: 'https://production-api.gousto.co.uk/userbucketing/v1',
          },
          serverSide: {
            live: 'http://production-userbucketing.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/userbucketing/v1',
          },
        },
      },
      userfeedback: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/userfeedback/v1',
            local: 'https://production-api.gousto.co.uk/userfeedback/v1',
          },
          serverSide: {
            live: 'http://production-userfeedback.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/userfeedback/v1',
          },
        },
      },
      webclient: {
        1: {
          versionString: '',
          clientSide: {
            live: 'https://www.gousto.co.uk',
            local: 'https://www.gousto.co.uk',
          },
          serverSide: {
            live: 'http://production-webclient.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk',
          },
        },
      },
      workable: {
        1: {
          versionString: 'v1',
          clientSide: {
            live: 'https://production-api.gousto.co.uk/workable/v1',
            local: 'https://production-api.gousto.co.uk/workable/v1',
          },
          serverSide: {
            live: 'http://production-workable.gousto.co.uk',
            local: 'https://production-api.gousto.co.uk/workable/v1',
          },
        },
      },
    },
  },
})
