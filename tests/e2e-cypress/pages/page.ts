import { address, payment } from "../support/data";

type DefaultData = {
  address: typeof address;
  payment: typeof payment;
};

type PageInterface = {
  defaultData: DefaultData;
};

export default class Page implements PageInterface {
  readonly defaultData = {
    address,
    payment,
  };
}
