/* eslint-disable */

import { ReCAPTCHA } from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

const getLang = () => {
  if (typeof window === "undefined") return '';

  const windowWithRecaptcha: Window & {
    recaptchaOptions?: {
      lang?: string;
    }
  } = window;

  const lang = windowWithRecaptcha.recaptchaOptions?.lang;

  return lang ? `&hl=${lang}` : '';
}
const callbackName = "onloadcallback";
const URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit${getLang()}`;
const globalName = "grecaptcha";

const WrappedReCAPTCHA = makeAsyncScriptLoader(URL, {
  callbackName,
  globalName,
})(ReCAPTCHA);

export default WrappedReCAPTCHA
