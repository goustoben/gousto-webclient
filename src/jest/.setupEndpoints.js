import fs from "fs";
import JSON5 from "json5"

const config = JSON5.parse(fs.readFileSync('config/default.json5'))
global.__ENDPOINTS__ = config.endpoints
