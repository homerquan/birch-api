import config from '../config/environment';
import Hashids from 'hashids';

//Use customer logger later
let hashids = new Hashids(config.hashSalt);

export default hashids;