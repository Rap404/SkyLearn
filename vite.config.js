import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

export default {
  plugins: [
    react(),
    tailwindcss()
  ],
}
