import { SyntheticEvent } from 'react'

type Fn<T> = (event: T, ...args: any) => void
export function composeEvents<T extends SyntheticEvent<any>>(...fns: (Fn<T> | undefined)[]) {
    return (event: T, ...args: any ) => {
        fns.forEach(fn => fn && fn(event, ...args))
    }
}
