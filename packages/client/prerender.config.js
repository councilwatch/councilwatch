export default {
  routes: ['/', '/about', '/resources', '/resources/flock', '/resources/right-to-repair', '/contact'], // The routes that can be statically prerendered
  serveDir: 'dist', // The directory to serve up so puppeteer can access the built app
  outDir: 'build', // The final output directory that needs to be deploy
  buildCommand: 'vite build',
  flatOutput: false,
};
