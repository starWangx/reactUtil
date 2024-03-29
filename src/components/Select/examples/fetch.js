/* eslint import/prefer-default-export: 0 */

import jsonp from 'jsonp';
import querystring from 'querystring';

let timeout;
let currentValue;

export function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`http://suggest.taobao.com/sug?${str}`, (err, d) => {
      if (currentValue === value) {
        const result = d.result;
        const data = [];
        result.forEach(r => {
          data.push({
            value: r[0],
            text: r[0],
          });
        });
				console.log(data);
				callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}
