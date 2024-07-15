import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: 'NOQ',
  define:{
    'process.env.NOQ_IS_MOCK_API':JSON.stringify(process.env.NOQ_IS_MOCK_API),
    'process.env.NOQ_BASE_URL':JSON.stringify(process.env.NOQ_BASE_URL)
  }
});
