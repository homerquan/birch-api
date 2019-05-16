/*
* @Author: homer
* @Date:   2019-05-16 10:43:10
* @Last Modified by:   homer
* @Last Modified time: 2019-05-16 10:56:24
*/

import { composeWithMongoose } from '../schemaComposer';
import Verification from '../../models/verification';

export const VerificationTC = composeWithMongoose(Verification);