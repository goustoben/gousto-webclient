const childProcess = require('child_process')
const nodeConfig = require('node-config')

const {
  NODE_ENV,
} = process.env

const API_NAME = nodeConfig.get('api_name')
const API_TOKEN = nodeConfig.get('api_token')
const AUTH_CLIENT_ID = nodeConfig.get('auth_client_id')
const AUTH_CLIENT_SECRET = nodeConfig.get('auth_client_secret')

const BUILD = nodeConfig.get('build')
const CHECKOUT_PUBLIC_KEY = nodeConfig.get('checkout_pk')
const CLIENT_PROTOCOL = nodeConfig.get('client_protocol')
const CLOUDFRONT_URL = nodeConfig.get('cloudfront_url')

const DOMAIN = nodeConfig.get('domain')
const ENV_NAME =  nodeConfig.get('environment_name')

const RUNNING_ENV = nodeConfig.get('running_env')
const ENDPOINTS = nodeConfig.get('endpoints')
const RECAPTCHA_REFERRAL_PUBLIC_KEY = nodeConfig.get('recaptcha_referral_public_key')
const RECAPTCHA_REFERRAL_PRIVATE_KEY = nodeConfig.get('recaptcha_referral_private_key')

const PUBLIC_PATH = CLOUDFRONT_URL ? `${CLIENT_PROTOCOL}://${CLOUDFRONT_URL}/build/latest/` : '/nsassets/'

const DEBUG = false
const DEBUG_ENABLED_CONFIG = {
  hash: true,
  version: true,
  timings: true,
  assets: true,
  chunks: true,
  modules: true,
  reasons: true,
  children: true,
  source: true,
  errors: true,
  errorDetails: true,
  warnings: true,
  publicPath: true
}

const DEBUG_DEFAULT_CONFIG = {
  hash: false,
  version: false,
  timings: false,
  assets: false,
  chunks: false,
  modules: false,
  reasons: false,
  children: false,
  source: false,
  errors: true,
  errorDetails: true,
  warnings: false,
  publicPath: false
}

const DEBUG_CONFIG = DEBUG ? DEBUG_ENABLED_CONFIG : DEBUG_DEFAULT_CONFIG

const CSS_HASH_PATTERN_DEV = '[name]__[local]___[hash:base64:5]'
const CSS_HASH_PATTERN_PROD = 'G[sha1:hash:hex:6]'

const GIT_HASH = `${childProcess.execSync("git rev-parse --short HEAD | tr -d '\n'").toString()}`

const IS_DEV_MODE = BUILD === 'development'
const IS_HMR_MODE = BUILD === 'hmr'
const IS_PROD_MODE = BUILD === 'production'
const IS_NON_PROD_MODE = NODE_ENV !== 'production'

module.exports = {
  API_NAME,
  API_TOKEN,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  BUILD,
  CHECKOUT_PUBLIC_KEY,
  CLIENT_PROTOCOL,
  CLOUDFRONT_URL,
  CSS_HASH_PATTERN_DEV,
  CSS_HASH_PATTERN_PROD,
  DEBUG_CONFIG,
  DOMAIN,
  ENV_NAME,
  GIT_HASH,
  IS_DEV_MODE,
  IS_HMR_MODE,
  IS_PROD_MODE,
  IS_NON_PROD_MODE,
  PUBLIC_PATH,
  RUNNING_ENV,
  ENDPOINTS,
  RECAPTCHA_REFERRAL_PUBLIC_KEY,
  RECAPTCHA_REFERRAL_PRIVATE_KEY
}
