export default class browserHelper {
  static isChrome() {
    return (navigator && navigator.userAgent && navigator.userAgent.indexOf('Chrome/') !== -1)
  }
}
