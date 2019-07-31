export interface NguoilaoiUserInterface {
  id: string
  name: string
  loginAt: number
  connected: boolean
  gender?: "male" | "female" | "undefined"
}