export default function manifest() {
  return {
    name: 'Laksh Pradhwani | Personal Portfolio',
    short_name: 'Laksh P.',
    icons: [
      {
        src: '/icon-192x192.png', // Use the icon from the app folder
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png', // You may need to create this image
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    theme_color: '#0f172a', // Dark theme color
    background_color: '#020617', // Dark background color
    display: 'standalone'
  }
}