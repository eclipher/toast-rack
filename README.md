<div align="center" width="100%">

# Toast Rack

Beautiful Toast Notifications Built with Vanilla JavaScript

[Website](https://toast-rack.vercel.app)

![NPM Version](https://img.shields.io/npm/v/toast-rack?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftoast-rack)
![NPM License](https://img.shields.io/npm/l/toast-rack)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/toast-rack)

</div>

Toast Rack is a lightweight, customizable Javascript toast notification library with zero dependencies.

## Usage

```bash
pnpm i toast-rack
```

```ts
// create a single instance of Toaster for the entire app
import { Toaster } from "toast-rack";
const toaster = new Toaster();

// import the toaster from anywhere in your app
toaster.toast("Hello, world!");
```

See the doc site for more examples and advanced usages: https://toast-rack.vercel.app

## License

MIT
