<div align="center" width="100%">

# Toast Rack

Beautiful Toast Notifications Built with Vanilla JS

[Website](https://toast-rack-js.vercel.app)

</div>

Toast Rack is a lightweight, customizable Javascript toast notification library with zero dependencies.

## Usage

```ts
// import styles
import "toast-rack/style.css";

// create a single instance of Toaster for the entire app
import { Toaster } from "toast-rack";
const toaster = new Toaster();

// import the toaster from anywhere in your app use it to show a toast notification
toaster.toast("Hello, world!");
```

See the doc site for more examples and advanced usages: https://toast-rack.vercel.app

## License

MIT
