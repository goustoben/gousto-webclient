export type Nullable<T> = T | null;

declare global {
    interface Window {
        // eslint-disable-next-line no-unused-vars
        hj?: (action: string, name: string) => void
    }
}
