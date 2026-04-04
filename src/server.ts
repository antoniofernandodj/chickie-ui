import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import Fastify from 'fastify';
import staticPlugin from '@fastify/static';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = Fastify();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Fastify REST API endpoints can be defined here.
 */
app.get('/api/hello', async () => {
  return { message: 'Olá do servidor chickie-ui! 🐣' };
});

/**
 * Serve static files from /browser
 */
app.register(staticPlugin, {
  root: browserDistFolder,
  wildcard: false,
  index: false,
  maxAge: 31536000000,
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.setNotFoundHandler(async (request, reply) => {
  const response = await angularApp.handle(request.raw);
  if (response) {
    await writeResponseToNodeResponse(response, reply.raw);
  }
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT'] || 4000);
  app.listen({ port, host: '0.0.0.0' }, (err) => {
    if (err) throw err;
    console.log(`Fastify server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(async (req, res) => {
  await app.ready();
  app.server.emit('request', req, res);
});
