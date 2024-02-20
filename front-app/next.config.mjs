/** @type {import('next').NextConfig} */
import  path from 'path';
import { fileURLToPath } from 'url';

// 현재 파일의 경로를 얻기 위해 import.meta.url을 사용
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const nextConfig = {
  sassOptions:  [path.join(__dirname, 'styles')],
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
