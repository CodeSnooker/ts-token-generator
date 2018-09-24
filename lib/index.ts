import { rejects } from "assert";

export function echo(): boolean {
    return true
}

export function echoWithPromise(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        return resolve(true)
    })
}

export function echoWithFailedPromise(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        return reject(false)
    })
}
