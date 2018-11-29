export const touchInputsInForm = (inputs, form, section) => {
  for (let input in inputs) {
    touch(form, `${section}[${input}]`)
  }
}
