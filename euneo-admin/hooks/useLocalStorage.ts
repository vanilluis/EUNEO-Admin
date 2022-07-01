// React&NextJs
import { useState } from 'react'

type TValue =
    | string
    | boolean
    | Record<string, unknown>
    | ((value: string) => void)

/**
 * Custom hooks to get and set items in localstorage. useLocalStorage
 * returns a value and a setter that is synced with localstorage.
 */
export const useLocalStorage = (key: string, initialValue: TValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    })

    const setValue = (value: TValue) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            // noop
        }
    }

    return [storedValue, setValue]
}
