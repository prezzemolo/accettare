accettare [![][mit-badge]][mit]
==========

[![Greenkeeper badge](https://badges.greenkeeper.io/prezzemolo/accettare.svg)](https://greenkeeper.io/)
[![][npm-badge]][npm]  
simple accept-language parser.

Installation:
----------
```
npm install accettare --save
```

Usage:
----------
```javascript
const accettare = require('accettare');
accettare.languages(['en-US', 'zh-CN']);
console.log(accettare.get('en-GB,en;q=0.8,sv'));

/**
 * 'en-US'
 */
```

LICENSE
----------
The MIT License. See [LICENSE](LICENSE).

[npm]: https://www.npmjs.com/package/accettare
[npm-badge]: https://nodei.co/npm/accettare.png
[mit]: http://opensource.org/licenses/MIT
[mit-badge]: https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
