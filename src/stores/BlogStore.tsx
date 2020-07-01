import React from "react";
import { list } from "../../auth.json";
import { useLocalStore } from "mobx-react";
import { observable, computed } from "mobx";
import BlogModel from "../models/BlogModel";

class BlogStore {
  @observable
  blogList: BlogModel[] = list.map((el) => new BlogModel(el));
  @computed
  get selectedBlogList() {
    return this.blogList.filter((el) => el.checked);
  }
}

const BlogStoreContext = React.createContext(null);

const BlogStoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(() => new BlogStore());
  return (
    <BlogStoreContext.Provider value={store}>
      {children}
    </BlogStoreContext.Provider>
  );
};

// userStore의 값을 가져오는 hooks
const useBlogStore = () => {
  const store = React.useContext<BlogStore>(BlogStoreContext);
  if (!store) {
    throw Error(`Cannot find BlogStore In Cotnext Provider`);
  }
  return store;
};

export { BlogStoreContext, BlogStoreProvider, useBlogStore };

export default BlogStore;
