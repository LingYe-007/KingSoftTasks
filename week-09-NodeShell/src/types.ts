export interface CommandArgs {
  cmd: string
  argv: string[]
  options: {
    [propName: string]: string | boolean
  }
}