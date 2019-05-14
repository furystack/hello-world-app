import { Injector } from "@furystack/inject";
import { ConsoleLogger } from "@furystack/logging";
import { User, StoreManager } from "@furystack/core";
import { HttpAuthenticationSettings } from "@furystack/http-api";
import { HelloWorldAction } from "./hello-world-action";
import { parse } from "url";

const injector = new Injector()
  .useLogging(ConsoleLogger)
  .useHttpApi({})
  .useHttpAuthentication()
  .useDefaultLoginRoutes()
  .addHttpRouting(msg => {
    const urlPathName = parse(msg.url || "", true).pathname;
    if (urlPathName === "/helloWorld") {
      return HelloWorldAction;
    }
  })
  .listenHttp({
    port: (process.env.PORT && parseInt(process.env.PORT)) || 654
  });

const authSettings = injector.getInstance(HttpAuthenticationSettings);

injector
  .getInstance(StoreManager)
  .getStoreFor(User)
  .add({
    username: "testuser",
    roles: [],
    password: authSettings.hashMethod("testPassword")
  } as User);
