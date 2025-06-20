import { createApp } from "vue";
import { inject } from "@vercel/analytics";

import "./style.css";
import "toast-rack/style.css";

import App from "./App.vue";

inject(); // Initialize Vercel Analytics

createApp(App).mount("#app");
