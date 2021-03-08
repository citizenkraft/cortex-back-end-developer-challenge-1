import { PrimaryStatType } from "../enums/primaryStatType";
import { Item } from "../item/item";
import { CharacterClass } from "./characterClass";
import { CharacterDefense } from "./characterDefense";
import { CharacterHealth } from "./characterHealth";
import { CharacterStats } from "./characterStats";


export class Character {
  id: string;
  name: string;
  level: number;
  classes: CharacterClass[];
  stats: CharacterStats;
  health: CharacterHealth;

  items: Item[];
  defenses: CharacterDefense[];

  constructor() {
    this.id = ``;
    this.name = ``;
    this.level = 0;
    this.classes = [];
    this.stats = new CharacterStats();
    this.health = new CharacterHealth();
    this.items = [];
    this.defenses = [];
  }
}
