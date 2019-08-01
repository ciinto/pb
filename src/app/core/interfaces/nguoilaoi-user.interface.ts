export interface NguoilaoiUserInterface {
  id: string
  name: string
  loginAt: number
  connected: boolean
  room?: string
  gender?: "male" | "female" | "undefined"
}