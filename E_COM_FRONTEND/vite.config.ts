import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/products": "http://localhost:4000/",
      "/adminLogin": "http://localhost:4000/",
      "/adminLogout": "http://localhost:4000/",
      "/userlogin": "http://localhost:4000/",
      "/user": "http://localhost:4000/",
    },
    host:true
  },
  plugins: [react()],
})
