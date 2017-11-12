import config from '../config/env';
import Hashids from 'hashids';

//Use customer logger later
let hashids = new Hashids(config.hashSalt);

export default hashids;