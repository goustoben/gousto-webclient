/*
 * @type {ServiceManifest} - type for describing the service manifest
 */
export type ServiceManifest = {
  [serviceName: string]: ServiceVersion[]
}

/*
 * @type {ServiceVersion} - type for describing the service and its version in the service manifest
 */
export type ServiceVersion = {
  version: string,
  majorVersion: number,
  basePath: string
}

export const serviceManifest: ServiceManifest = {
  "auth": [
    {
      "majorVersion": 1,
      "version": "v1.0.0",
      "basePath": "/auth/v1.0.0"
    },
    {
      "majorVersion": 2,
      "version": "v2",
      "basePath": "/auth/v2"
    }
  ],
  "brand": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/brand/v1"
    }
  ],
  "clientmetrics": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/clientmetrics/v1"
    }
  ],
  "collections": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/collections/v1"
    }
  ],
  "complaints": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/complaints/v1"
    }
  ],
  "content": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/content/v1"
    }
  ],
  "core": [
    {
      "majorVersion": 1,
      "version": "",
      "basePath": ""
    }
  ],
  "customers": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/customers/v1"
    },
    {
      "majorVersion": 2,
      "version": "v2",
      "basePath": "/customers/v2"
    }
  ],
  "deliveries": [
    {
      "majorVersion": 1,
      "version": "v1.0",
      "basePath": "/deliveries/v1.0"
    }
  ],
  "felogging": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/felogging/v1"
    }
  ],
  "loggingmanager": [
    {
      "majorVersion": 1,
      "version": "",
      "basePath": "/loggingmanager"
    }
  ],
  "menu": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/menu/v1"
    }
  ],
  "order": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/order/v1"
    },
    {
      "majorVersion": 2,
      "version": "v2",
      "basePath": "/order/v2"
    }
  ],
  "orders": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/orders/v1"
    },
    {
      "majorVersion": 2,
      "version": "v2",
      "basePath": "/orders/v2"
    }
  ],
  "orderskiprecovery": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/orderskiprecovery/v1"
    }
  ],
  "payments": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/payments/v1"
    }
  ],
  "products": [
    {
      "majorVersion": 1,
      "version": "v1.0",
      "basePath": "/products/v1.0"
    },
    {
      "majorVersion": 2,
      "version": "v2.0",
      "basePath": "/products/v2.0"
    }
  ],
  "recipes": [
    {
      "majorVersion": 1,
      "version": "v2",
      "basePath": "/recipes/v2"
    }
  ],
  "ssr": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/ssr/v1"
    },
    {
      "majorVersion": 2,
      "version": "v2",
      "basePath": "/ssr/v2"
    }
  ],
  "ssrdeliveries": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/ssrdeliveries/v1"
    }
  ],
  "ssrrecipecards": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/ssrrecipecards/v1"
    }
  ],
  "subpauseosr": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/subpauseosr/v1"
    }
  ],
  "subscriptioncommand": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/subscriptioncommand/v1"
    }
  ],
  "subscriptionquery": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/subscriptionquery/v1"
    }
  ],
  "tastepreferences": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/tastepreferences/v1"
    }
  ],
  "userbucketing": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/userbucketing/v1"
    }
  ],
  "userfeedback": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/userfeedback/v1"
    }
  ],
  "webclient": [
    {
      "majorVersion": 1,
      "version": "",
      "basePath": "https://www.gousto.co.uk"
    }
  ],
  "workable": [
    {
      "majorVersion": 1,
      "version": "v1",
      "basePath": "/workable/v1"
    }
  ]
}
