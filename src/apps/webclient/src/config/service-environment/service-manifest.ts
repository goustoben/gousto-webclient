/*
 * @type {ServiceManifest} - type for describing the service manifest
 */
export type ServiceManifest = {
  [key: string]: ServiceVersion[]
}

/*
 * @type {ServiceVersion} - type for describing the service and its version in the service manifest
 */
export type ServiceVersion = {
  version: number,
  basePath: string
}

export const serviceManifest: ServiceManifest = {
  "auth": [
    {
      "version": 1,
      "basePath": "/auth/v1.0.0"
    },
    {
      "version": 2,
      "basePath": "/auth/v2"
    }
  ],
  "brand": [
    {
      "version": 1,
      "basePath": "/brand/v1"
    }
  ],
  "clientmetrics": [
    {
      "version": 1,
      "basePath": "/clientmetrics/v1"
    }
  ],
  "collections": [
    {
      "version": 1,
      "basePath": "/collections/v1"
    }
  ],
  "complaints": [
    {
      "version": 1,
      "basePath": "/complaints/v1"
    }
  ],
  "content": [
    {
      "version": 1,
      "basePath": "/content/v1"
    }
  ],
  "core": [
    {
      "version": 1,
      "basePath": ""
    }
  ],
  "customers": [
    {
      "version": 1,
      "basePath": "/customers/v1"
    },
    {
      "version": 2,
      "basePath": "/customers/v2"
    }
  ],
  "deliveries": [
    {
      "version": 1,
      "basePath": "/deliveries/v1.0"
    }
  ],
  "felogging": [
    {
      "version": 1,
      "basePath": "/felogging/v1"
    }
  ],
  "loggingmanager": [
    {
      "version": 1,
      "basePath": "/loggingmanager"
    }
  ],
  "menu": [
    {
      "version": 1,
      "basePath": "/menu/v1"
    }
  ],
  "order": [
    {
      "version": 1,
      "basePath": "/order/v1"
    },
    {
      "version": 2,
      "basePath": "/order/v2"
    }
  ],
  "orders": [
    {
      "version": 1,
      "basePath": "/orders/v1"
    },
    {
      "version": 2,
      "basePath": "/orders/v2"
    }
  ],
  "orderskiprecovery": [
    {
      "version": 1,
      "basePath": "/orderskiprecovery/v1"
    }
  ],
  "payments": [
    {
      "version": 1,
      "basePath": "/payments/v1"
    }
  ],
  "products": [
    {
      "version": 1,
      "basePath": "/products/v1.0"
    },
    {
      "version": 2,
      "basePath": "/products/v2.0"
    }
  ],
  "recipes": [
    {
      "version": 1,
      "basePath": "/recipes/v2"
    }
  ],
  "ssr": [
    {
      "version": 1,
      "basePath": "/ssr/v1"
    },
    {
      "version": 2,
      "basePath": "/ssr/v2"
    }
  ],
  "ssrdeliveries": [
    {
      "version": 1,
      "basePath": "/ssrdeliveries/v1"
    }
  ],
  "ssrrecipecards": [
    {
      "version": 1,
      "basePath": "/ssrrecipecards/v1"
    }
  ],
  "subpauseosr": [
    {
      "version": 1,
      "basePath": "/subpauseosr/v1"
    }
  ],
  "subscriptioncommand": [
    {
      "version": 1,
      "basePath": "/subscriptioncommand/v1"
    }
  ],
  "subscriptionquery": [
    {
      "version": 1,
      "basePath": "/subscriptionquery/v1"
    }
  ],
  "tastepreferences": [
    {
      "version": 1,
      "basePath": "/tastepreferences/v1"
    }
  ],
  "userbucketing": [
    {
      "version": 1,
      "basePath": "/userbucketing/v1"
    }
  ],
  "userfeedback": [
    {
      "version": 1,
      "basePath": "/userfeedback/v1"
    }
  ],
  "webclient": [
    {
      "version": 1,
      "basePath": "https://www.gousto.co.uk"
    }
  ],
  "workable": [
    {
      "version": 1,
      "basePath": "/workable/v1"
    }
  ]
}
