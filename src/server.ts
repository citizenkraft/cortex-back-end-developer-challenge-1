import App from './app';
import CharactersController from "./controllers/charactersController";

const app = new App(
  [
    new CharactersController(),
  ],
  4001,
);
 
app.listen();