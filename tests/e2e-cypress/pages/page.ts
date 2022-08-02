import { address, payment } from "../support/data";

type Selectors = {
  css: Record<string, string>;
  text: Record<string, string>;
};

type DefaultData = {
  address: typeof address;
  payment: typeof payment;
};

type PageInterface = {
  selectors: Selectors;
  defaultData: DefaultData;
};

export default class Page implements PageInterface {
  readonly selectors = {
    css: {},
    text: {},
  };

  readonly defaultData = {
    address,
    payment,
  };

  constructor(selectors: Selectors = { css: {}, text: {} }) {
    this.selectors = selectors;
  }
}
