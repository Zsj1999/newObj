import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Empty,
  Input,
  Layout,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
  Tag
} from "ant-design-vue";
import "./styles/global.css";

Vue.config.productionTip = false;

[
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Empty,
  Input,
  Layout,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
  Tag
].forEach((component) => {
  Vue.use(component);
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
