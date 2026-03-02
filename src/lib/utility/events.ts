import { SyntheticEvent } from 'react'

type Fn<T> = (event: T, ...args: unknown[]) => void
export function composeEvents<T extends SyntheticEvent<any>>(...fns: (Fn<T> | undefined)[]) {
    return (event: T, ...args: unknown[] ) => {
        fns.forEach(fn => fn && fn(event, ...args))
    }
}
