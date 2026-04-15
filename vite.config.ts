import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

const disableWayfinder = process.env.WAYFINDER_DISABLED === 'true';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
           // ✅ ONLY run Wayfinder locally
          ...(!disableWayfinder
            ? [
                wayfinder({
                    formVariants: true,
                }),
            ]
            : []),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
     base: '/build/', // IMPORTANT FIX
    esbuild: {
        jsx: 'automatic',
    },
});
