import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'
import { NestConfig } from './common/config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)
  const nestConfig = configService.get<NestConfig>('nest')

  const port = process.env.PORT || nestConfig?.port || 5005

  await app.listen(port, () => {
    Logger.log(`Listening at port ${port}`)
  })
}

bootstrap()
