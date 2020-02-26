// Font awesome
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faDownload,
  faEdit,
  faEnvelope,
  faPencilAlt,
  faPhone,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faDownload,
  faEdit,
  faEnvelope,
  faPencilAlt,
  faPhone,
  faChevronLeft,
  faChevronRight
);

import {
  faFacebookSquare,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookSquare, faInstagram);

Vue.component("font-awesome-icon", FontAwesomeIcon);
