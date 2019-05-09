import { Injector } from "@furystack/inject";
import { ConsoleLogger } from "@furystack/logging";
import { InMemoryStore, User, StoreManager } from "@furystack/core";
import { HttpAuthenticationSettings } from "@furystack/http-api";
import { HelloWorldAction } from "./hello-world-action";
import { parse } from "url";

const injector = new Injector()
  .useLogging(ConsoleLogger)
  .setupStores(stores =>
    stores.addStore(new InMemoryStore({ model: User, primaryKey: "username" }))
  )
  .useHttpApi({})
  .useHttpAuthentication({
    getUserStore: sm => sm.getStoreFor(User)
  })
  .useDefaultLoginRoutes()
  .addHttpRouting(msg => {
    const urlPathName = parse(msg.url || "", true).pathname;
    if (urlPathName === "/helloWorld") {
      return HelloWorldAction;
    }
  })
  .listenHttp({ hostName: "localhost", port: 654 });

const authSettings = injector.getInstance(HttpAuthenticationSettings);

injector
  .getInstance(StoreManager)
  .getStoreFor(User)
  .add({
    username: "testuser",
    roles: [],
    password: authSettings.hashMethod("testPassword")
  } as User);
