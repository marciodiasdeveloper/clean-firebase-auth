type Setup = () => GetIpAddressExpress
type Input = { ipAddress: string }
type Output = {
  ipAddress: string
}

export type GetIpAddressExpress = (input: Input) => Promise<Output>

export const setupGetIpAddressExpress: Setup = () => async input => {
  return { ipAddress: input.ipAddress }
}
