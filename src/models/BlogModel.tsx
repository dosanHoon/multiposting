import { observable, set, action } from "mobx";
import { v4 as uuidv4 } from "uuid";

export interface BlogType {
  blog: string;
  aliasName: string;
  id: string;
  pw: string;
  uiId: string;
}

export class BlogModel implements BlogType {
  constructor(param?) {
    set(this, param);
    this.uiId = uuidv4();
  }
  @observable
  uiId: string;
  @observable
  aliasName: string;
  @observable
  blog: string;
  @observable
  id: string;
  @observable
  pw: string;
  @observable
  checked: boolean = false;
  @action
  changeAliasName = (value) => {
    this.aliasName = value;
  };
  @action
  changeId = (value) => {
    this.id = value;
  };
  @action
  changePassword = (value) => {
    this.pw = value;
  };
  @action
  handleChecked = () => {
    this.checked = !this.checked;
  };
}

export default BlogModel;
