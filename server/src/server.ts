import { appRoutes } from '@/routes';
import cors from '@fastify/cors';
import { app } from '@/plugins/fastify';

app.register(cors);
app.register(appRoutes);

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Server is running at 3333');
});
