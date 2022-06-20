export class browserHelperUtils {
  static isChrome() {
    return (navigator && navigator.userAgent && navigator.userAgent.indexOf('Chrome/') !== -1)
  }
}

export const canUseDom = () => (typeof window !== 'undefined'
  && window.document && window.document.createElement)
