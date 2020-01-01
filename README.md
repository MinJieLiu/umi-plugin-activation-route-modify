# umi-plugin-activation-route-modify

[![NPM version](https://img.shields.io/npm/v/umi-plugin-activation-route-modify.svg?style=flat)](https://npmjs.org/package/umi-plugin-activation-route-modify)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-activation-route-modify.svg?style=flat)](https://npmjs.org/package/umi-plugin-activation-route-modify)

KeepAlive with umi route.

Refer [umi-plugin-keep-alive](https://github.com/alitajs/umi-plugin-keep-alive)

## Install

```bash
# or yarn
$ npm install
```

```bash
$ npm run build --watch
$ npm run start
```

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-activation-route-modify', options],
  ],
}
```

## Options

```ts

interface IOptions {
  exclude: string[] | RegExp[];
}

```

## LICENSE

MIT
