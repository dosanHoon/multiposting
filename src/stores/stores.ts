import { useStaticRendering } from "mobx-react";

import BlogStore from "./BlogStore";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

let store = null;

export default function initializeStore(initialData = { postStore: {} }) {
  if (isServer) {
    return {
      BlogStore: new BlogStore(),
    };
  }
  if (store === null) {
    store = {
      BlogStore: new BlogStore(),
    };
  }

  return store;
}
