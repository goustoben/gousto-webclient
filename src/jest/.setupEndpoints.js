import fs from "fs"
import path from "path"
import JSON5 from "json5"

const config = JSON5.parse(fs.readFileSync(path.join(__dirname, '../config/default.json5')))
global.__ENDPOINTS__ = config.endpoints
