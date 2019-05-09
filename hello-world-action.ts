import { IRequestAction, HttpUserContext } from "@furystack/http-api";
import { Injectable } from "@furystack/inject";
import { ServerResponse } from "http";

@Injectable({ lifetime: "transient" })
export class HelloWorldAction implements IRequestAction {
  public dispose() {
    /** all actions should be disposables, you can implement cleanup logic here. */
  }

  public async exec(): Promise<void> {
    const currentUser = await this.userContext.getCurrentUser();
    this.response.end(`Hello ${currentUser.username}!`);
  }

  /** The parameters from the constructor will be injected */
  constructor(
    private readonly userContext: HttpUserContext,
    private readonly response: ServerResponse
  ) {}
}
