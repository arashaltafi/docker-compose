namespace NodeJS {
  interface ProcessEnv {
    PORT: number;

    MONGO_URI: string;

    REDIS_PORT: string;
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    REDIS_USERNAME: string;
  }
}