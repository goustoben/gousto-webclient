import { client, legacy } from "config/globals"

export function shouldUseReactRouter() {
    return client && !legacy()
}
