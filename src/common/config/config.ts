export interface Config {
  nest: NestConfig
  security: SecurityConfig
}

export interface NestConfig {
  port: number
}

export interface SecurityConfig {
  expiresIn: string
  refreshIn: string
}

const config: Config = {
  nest: {
    port: 5005
  },
  security: {
    expiresIn: '7d',
    refreshIn: '7d'
  }
}

export default (): Config => config
