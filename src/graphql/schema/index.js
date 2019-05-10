import { schemaComposer } from '../schemaComposer';
import { load as loadUser } from './user';
import { load as loadNotification } from './notification';
import { load as loadApp } from './app';


// using blueprint from mongoose composer with custom subscription
loadUser(schemaComposer);
loadNotification(schemaComposer);
loadApp(schemaComposer);

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;