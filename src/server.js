import fastify from './index';

(async () => {
  try {
    fastify.get('/', async (request, reply) => {
      return '<h1 style="color:red">Galina Cheren</h1>';
    });
    await fastify.listen(3000);
  } catch (err) {
    console.log(err);
  }
})();
