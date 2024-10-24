export class NotFoundError extends Error {
  public name = 'FastStoreError'

  constructor(
    message: string,
    public extensions: Record<string, unknown>
  ) {
    super(message)
  }
}
