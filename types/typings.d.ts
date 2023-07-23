// typings.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      // Add other environment variables with their types if needed
      // For example:
      // DATABASE_URL: string;
    }
}  