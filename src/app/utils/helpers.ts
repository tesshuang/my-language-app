export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number = 2000,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}