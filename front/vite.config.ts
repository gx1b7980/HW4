import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// http://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://ganna.one/HW4", // this should match the URL your server is running on
    },
  },
})
//axios.defaults.baseURL = "https://ganna.one"
