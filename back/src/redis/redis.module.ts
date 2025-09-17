import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'REDIS_CLIENT',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const host = configService.get<string>('REDIS_HOST');
                const port = Number(configService.get<string>('REDIS_PORT', '6379'));
                const username = configService.get<string>('REDIS_USERNAME') || undefined;
                const password = configService.get<string>('REDIS_PASSWORD') || undefined;

                const client = new Redis({
                    host,
                    port,
                    username,
                    password,
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