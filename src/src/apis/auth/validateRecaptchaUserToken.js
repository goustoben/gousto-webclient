import isomorphicFetch from "isomorphic-fetch"
import { verifyRoute } from "config/routes/recaptcha/verifyRoute"

export function validateRecaptchaUserToken(token, secret) {
    return new Promise((resolve, reject) => {
        isomorphicFetch(verifyRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `secret=${secret}&response=${token}`,
        })
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
