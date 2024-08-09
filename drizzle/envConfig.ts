import { loadEnvConfig } from '@next/env';

//const envConfig = loadEnvConfig(process.env.PWD as string, process.env.NODE_ENV === 'production');

const projectDir = process.cwd();
loadEnvConfig(projectDir);