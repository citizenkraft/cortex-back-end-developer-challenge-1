import { Character } from "../models/character/character";
import { v4 as uuidv4 } from "uuid";
import HitPointGenerationUtility from "../utils/HitPointGenerationUtility";
import { HitPointGenerationType } from "../models/enums/hitPointGenerationType";
import { CharacterHealth } from "../models/character/characterHealth";
import { PrimaryStatType } from "../models/enums/primaryStatType";
import { CharacterHealthStatusType } from "../models/enums/characterHealthStatusType";
import { CharacterStats } from "../models/character/characterStats";
import { CharacterDefense } from "../models/character/characterDefense";

export class CharacterComponent {
    private characters: Character[] = [];
    
    constructor() {
    }

    public GetAllCharacters() {
        return this.characters;
    }

    public GetCharacterById(uuid: string) : Character {
        return this.characters.find((x : Character)=> x.id == uuid);
    }

    public CreateCharacter(character: Character) : Character {
        //character.id =  uuidv4();
        character.id = (this.characters.length + 1).toString(); //for ease of use
        
        character.health = new CharacterHealth();

        const maxHp = HitPointGenerationUtility.CalculateTotalHitPoints(
            character.classes, 
            this.GetStatModifier(character, 'constitution', character.stats.constitution),
            HitPointGenerationType.HitDieAverage);

        character.health.currentHitPoints = maxHp;
        character.health.maximumHitPoints = maxHp;

        this.characters.push(character);
        return character;
    }

    public ApplyDamage(character: Character, damageType: string, incomingDamage: number) {
        let damageRemainingToApply = this.ApplyDefenses(character.defenses, incomingDamage, damageType);

        if (character.health.temporaryHitPoints > 0) {
            character.health.temporaryHitPoints -= damageRemainingToApply;
            if (character.health.temporaryHitPoints < 0) {
                damageRemainingToApply = Math.abs(character.health.temporaryHitPoints);
                character.health.temporaryHitPoints = 0;
            } else {
                damageRemainingToApply = 0;
            }
        }

        character.health.currentHitPoints -= damageRemainingToApply;
        if (character.health.currentHitPoints < 0) {
            character.health.status = CharacterHealthStatusType.Unconscious;
        }
    }

    public AddTemporaryHitPoints(character: Character, temporaryHitPointsToAdd: number) {
        character.health.temporaryHitPoints += temporaryHitPointsToAdd;
    }

    public HealHitPoints(character: Character, hitPointsToHeal: number) {
        character.health.currentHitPoints = Math.min(
            (character.health.currentHitPoints + hitPointsToHeal), 
            character.health.maximumHitPoints);
    }

    public GetStatModifier(character: Character, stat: string, statValue : number) : number {
        let modifier = Math.floor((statValue - 10) / 2);
        character.items.forEach((item) => {
            if (item.modifier.affectedObject === `stats` && item.modifier.affectedValue == stat) {
                modifier += item.modifier.value;
            }
        });
        return modifier;
    }

    public ApplyDefenses(defenses: CharacterDefense[], incomingDamage: number, damageType: string) : number{
        let isImmune = false;
        defenses.forEach((def) => {
            if (def.type === damageType) {
                if (def.defense === `immunity`) {
                    isImmune = true;
                }
                else if (def.defense === `resistance`) {
                    incomingDamage = Math.floor(incomingDamage / 2);
                }
                else if (def.defense === `vulnerability`) {
                    incomingDamage = Math.floor(incomingDamage * 2);
                }
            }
        });

        return (isImmune ? 0 : incomingDamage);
    }

}