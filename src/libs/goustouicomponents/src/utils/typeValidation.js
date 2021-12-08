export const validateEmail = (email) => {
  const regex = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i)

  return regex.test(email)
}

export const validatePhone = (tel) => {
  const regex = (/^\d{10}$/)

  return regex.test(tel)
}
