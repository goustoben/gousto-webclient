export const getStore = (win) => win.__store__ // eslint-disable-line no-underscore-dangle

export const getFormState = (win) => getStore(win).getState().form
