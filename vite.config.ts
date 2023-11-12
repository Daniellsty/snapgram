
// https://vitejs.dev/config/
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from 'vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  server:{
    host:"localhost",
    port:3000,
  
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
