import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { CryptService, MailService } from '@common/services'
import { SecurityConfig } from '@common/config'

const jwtModule = JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => {
    const securityConfig = configService.get<SecurityConfig>('security')
    return {
      secret: configService.get<string>('SECRET'),
      signOptions: {
        expiresIn: securityConfig?.expiresIn,
        noTimestamp: false
      }
    }
  },
  inject: [ConfigService]
})

@Global()
@Module({
  imports: [jwtModule],
  providers: [CryptService, MailService],
  exports: [CryptService, MailService, jwtModule]
})
export class ServicesModule {}
