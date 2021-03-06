# umi-plugin-activation-route-modify

[![NPM version](https://img.shields.io/npm/v/umi-plugin-activation-route-modify.svg?style=flat)](https://npmjs.org/package/umi-plugin-activation-route-modify)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-activation-route-modify.svg?style=flat)](https://npmjs.org/package/umi-plugin-activation-route-modify)

KeepAlive with umi route.

Refer [umi-plugin-keep-alive](https://github.com/alitajs/umi-plugin-keep-alive)

## Install

```bash
yarn add umi-plugin-activation-route-modify
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
  // Route path
  exclude: (string | RegExp)[];
  // Page layout, Should add src/layouts/PageLayout.jsx
  enablePageLayout?: boolean;
}
```

## example

[https://github.com/MinJieLiu/umi-plugin-activation-route-modify/tree/master/example](https://github.com/MinJieLiu/umi-plugin-activation-route-modify/tree/master/example)

## LICENSE

MIT
