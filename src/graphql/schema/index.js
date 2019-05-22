import { schemaComposer } from '../schemaComposer';
import { load as loadUser } from './user';
import { load as loadNotification } from './notification';
import { load as loadApp } from './app';
import { load as loadAuth } from './auth';

// using blueprint from mongoose composer with custom subscription
loadUser(schemaComposer);
loadNotification(schemaComposer);
loadApp(schemaComposer);
loadAuth(schemaComposer);

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;