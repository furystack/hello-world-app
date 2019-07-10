import {
  PlainTextResult,
  RequestAction,
  HttpUserContext
} from "@furystack/http-api";

export const HelloWorldAction: RequestAction = async injector => {
  const currentUser = await injector
    .getInstance(HttpUserContext)
    .getCurrentUser();
  return PlainTextResult(`Hello ${currentUser.username}!`);
};
