import base64url from 'base64url';
import crypto from 'crypto';

export default (size) => {
	return base64url(crypto.randomBytes(size));
};