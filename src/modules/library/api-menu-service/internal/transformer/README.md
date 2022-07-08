# Recipe transformers

When the menu service was introduced (~2019), the Webclient components were very tightly coupled to the old API responses (`recipe` and `collection` services).

For this reason, we chose to implement a 'transformer layer' for the menu service implementation in webclient.

This layer:
- takes in the `menu service` response
- maps the recipes into a format that is more acceptable to the Webclient UI

This may be something we want to remove in future as our components become more domain-focused, especially with the aid of TypeScript. However, to reduce the impact of the menu-service library module, we have migrated the transformer layer for now.