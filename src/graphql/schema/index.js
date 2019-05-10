import { schemaComposer } from '../schemaComposer';
import { load as loadUser } from './user';
import { load as loadNotification } from './notification';


// using blueprint from mongoose composer with custom subscription
loadUser(schemaComposer);
loadNotification(schemaComposer);

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;