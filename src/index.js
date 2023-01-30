import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  const result = request.body.toUpperCase();
  if (result.includes('FUCK')) {
    reply.code(403).send('unresolved');
  } else {
    reply.send(result);
  }
});

fastify.post('/lowercase', (request, reply) => {
  const result = request.body.toLowerCase();
  if (result.includes('fuck')) {
    reply.code(403).send('unresolved');
  } else {
    reply.send(result);
  }
});

fastify.get('/user/:id', (request, reply) => {
  const id = request.params.id;

  if (users[id]) {
    reply.send(users[id]);
  } else {
    reply.code(400).send('User not exist');
  }
});

fastify.get('/users', (request, reply) => {
  const { filter, value } = request.query;
  const result = Object.values(users);
  if (filter && value) {
    reply.send(result.filter((user) => user[filter].toString() === value));
  } else {
    reply.send(result);
  }
});

export default fastify;
