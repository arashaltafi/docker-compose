import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [
        {
            provide: 'REDIS_CLIENT',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const client = new Redis({
                    host: configService.get<string>('REDIS_HOST', 'localhost'),
                    port: configService.get<number>('REDIS_PORT', 6379),
                    username: configService.get<string>('REDIS_USERNAME'),
                    password: configService.get<string>('REDIS_PASSWORD'),
                    tls: undefined,
                    maxRetriesPerRequest: null,
                    connectTimeout: 10000,
                });

                client.on('error', (err) => {
                    console.error('[Redis] Error', err);
                });

                return client;
            },
        },
    ],
    exports: ['REDIS_CLIENT'],
})

export class RedisModule { }