import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import models from './models'
import resolvers from './resolvers'
import typeDefs from './types'

const PORT = process.env.PORT || '4000';
const SECRET = process.env.SECRET || 'localhost';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const apollo = new ApolloServer({
  schema,
  context: ({ req, res }) =>{
    return {
      models,
      SECRET,
      headers: req.headers
    }
  }
});

models.sequelize.sync().then(() => {
  apollo.listen(PORT).then(({ url }) => {
    console.log(`Servidor corriendo en [${url}]`);
  });
})