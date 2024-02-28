export default (debug: boolean) => (message: string) => {
  if (debug) { console.log('*** ' + message) }
}
