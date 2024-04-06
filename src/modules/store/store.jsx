import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class AuthStore {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "auth",
      storage: window.localStorage,
      properties: ["auth", "setData"],
    });
  }

  login() {
    this.isAuth = true;
    window.location.reload();
  }

  checkAuthentication() {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
}

export const authStore = new AuthStore();
