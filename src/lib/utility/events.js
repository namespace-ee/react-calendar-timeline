export function composeEvents(...fns) {
    return (event, ...args) => {
        event.preventDefault()
        fns.forEach(fn => fn && fn(event, ...args))
    }
}