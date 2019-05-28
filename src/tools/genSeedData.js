/*
 * @Author: homer
 * @Date:   2019-05-24 12:17:21
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-28 01:11:17
 */

import dummyjson from 'dummy-json';
import fs from 'fs';
import path from 'path';

// gen 01, 001 like str
const helpers = {
  fixLenIndex: function(n, options) {
  	 const i = options.data.index;
  	 if (arguments.length !== 2) {
       throw new Error('The helper requires two numeric params');
     }
  	 const zeroLen = n-String(i).length;
     const zeroStr = new Array(zeroLen + 1).join('0');
     console.log(zeroStr + i);
     return zeroStr + i;
  }
};

const gen = name => {
  const template = fs.readFileSync(path.join(__dirname, 'template', `${name}.hbs`), {
    encoding: 'utf8',
  });
  const fakeData = dummyjson.parse(template, {helpers});
  fs.writeFileSync(path.join(__dirname, 'data', `${name}.json`), fakeData, {
    encoding: 'utf8',
  });
  return fakeData;
};

gen('users');
gen('sessions');
gen('apps');
gen('actions');
