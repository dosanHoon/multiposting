import { observable, set } from "mobx";

export interface BlogType {
  type: string;
  name: string;
  id: string;
  pw: string;
}

class BlogModel implements BlogType {
  constructor(param) {
    set(this, param);
  }
  @observable
  type: string;
  @observable
  name: string;
  @observable
  id: string;
  @observable
  pw: string;
}

export default BlogModel;
