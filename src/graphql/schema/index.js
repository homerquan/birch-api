import { schemaComposer } from '../schemaComposer';
import { load as loadUser } from './user';
import { load as loadNotification } from './notification';
import { load as loadApp } from './app';
import { load as loadSession } from './session';
import { load as loadAction } from './action';
import { load as loadAuth } from './auth';
import { load as loadGlobalNotification } from './globalNotification';
import { load as loadTest } from './test';

// using blueprint from mongoose composer with custom subscription
loadUser(schemaComposer);
loadNotification(schemaComposer);
loadApp(schemaComposer);
loadSession(schemaComposer);
loadAction(schemaComposer);
loadGlobalNotification(schemaComposer);
loadAuth(schemaComposer);
loadTest(schemaComposer);

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;
