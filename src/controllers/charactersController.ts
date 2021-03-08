import express from "express";
import { HealCharacterDtoRequest } from "../models/dto/healCharacterDtoRequest";
import { CharacterComponent } from "../components/characterComponent";
import { Character } from "../models/character/character";
import { AddTemporaryHitPointsDtoRequest } from "../models/dto/addTemporaryHitPointsDtoRequest";
import { ApplyDamageDtoRequest } from "../models/dto/applyDamageDtoRequest";

class CharactersController {
  public path = '/character';
  public router = express.Router();
 
  private characterComponent : CharacterComponent;

  constructor() {
    this.intializeRoutes();
    this.characterComponent = new CharacterComponent();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllCharacters);
    this.router.post(this.path, this.createCharacter);
    this.router.get(`${this.path}/:id`, this.getCharacterById);
    this.router.put(`${this.path}/:id/heal`, this.healCharacter);
    this.router.put(`${this.path}/:id/applyTempHp`, this.applyTempHp);
    this.router.put(`${this.path}/:id/attack`, this.attackCharacter);
  }
 
  getAllCharacters = (request: express.Request, response: express.Response) => {
    response.send(this.characterComponent.GetAllCharacters());
  }
 
  createCharacter = (request: express.Request, response: express.Response) => {
    const character: Character = request.body;
    
    let result = this.characterComponent.CreateCharacter(character);
    if (result) {
      response.status(201).send(result);
    } else {
      response.status(400).send();
    }
  }

  getCharacterById = (request: express.Request, response: express.Response) => {
    const character = this.characterComponent.GetCharacterById(request.params.id);
    if (character) {
      response.send(character);
    } else {
      response.status(404).send();
    }
  }

  healCharacter = (request: express.Request, response: express.Response) => {
    const character = this.characterComponent.GetCharacterById(request.params.id);
    if (character) {
      let healCharacterDto = request.body as HealCharacterDtoRequest;
      this.characterComponent.HealHitPoints(character, healCharacterDto.value)
      response.send(character);
    } else {
      response.status(404).send();
    }
  }

  applyTempHp = (request: express.Request, response: express.Response) => {
    const character = this.characterComponent.GetCharacterById(request.params.id);
    if (character) {
      let applyTempHpDto = request.body as AddTemporaryHitPointsDtoRequest;
      this.characterComponent.AddTemporaryHitPoints(character, applyTempHpDto.value)
      response.send(character);
    } else {
      response.status(404).send();
    }
  }

  attackCharacter = (request: express.Request, response: express.Response) => {
    const character = this.characterComponent.GetCharacterById(request.params.id);
    if (character) {
      let applyDamageDto = request.body as ApplyDamageDtoRequest;
      this.characterComponent.ApplyDamage(character, applyDamageDto.damageType, applyDamageDto.value);
      response.send(character);
    } else {
      response.status(404).send();
    }
  }
}
 
export default CharactersController;