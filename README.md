[![Build Status](https://travis-ci.org/CodeSnooker/ts-token-generator.svg?branch=master)](https://travis-ci.org/CodeSnooker/ts-token-generator)

[![Coverage Status](https://coveralls.io/repos/github/CodeSnooker/ts-token-generator/badge.svg?branch=master)](https://coveralls.io/github/CodeSnooker/ts-token-generator?branch=master)

ts-token-generator
---
This library is typescript conversion of [uuid-token-generator](https://www.npmjs.com/package/uuid-token-generator) library,


Installation
---

To install this library 
```
npm install ts-token-generator
```

Usage
---

```typescript

import { TokenGenerator, TokenBase } from 'ts-token-generaor';
 
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
tokgen.generate();
// -> '4QhmRwHwwrgFqXULXNtx4d'
 
const tokgen2 = new TokenGenerator({ bitSize: 512 baseEncoding: TokenBase.BASE62 });

// Now generate the token
tokgen2.generate();
// -> 'x6GCX3aq9hIT8gjhvO96ObYj0W5HBVTsj64eqCuVc5X'
```