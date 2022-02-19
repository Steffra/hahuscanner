import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    server: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                configure: (proxy) => {
                    proxy.on('error', function (err, req, res) {
                        console.log(JSON.stringify(err))
                        res.writeHead(500, {
                            'Content-Type': 'text/plain',
                        })

                        res.end(JSON.stringify(err))
                    })
                },
            },
        },
    },
    resolve: {
        alias: {
            '/@': resolve(__dirname, 'src'),
        },
    },
    plugins: [vue()],
})
