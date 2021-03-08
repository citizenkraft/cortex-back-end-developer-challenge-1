import { PrimaryStatType } from "../models/enums/primaryStatType";
import { Character } from "../models/character/character";
import { HitPointGenerationType } from "../models/enums/hitPointGenerationType";
import { exception } from "console";
import { CharacterClass } from "../models/character/characterClass";

class HitPointGenerationUtility {  

    public static CalculateTotalHitPoints(
        characterClasses: CharacterClass[],
        constitutionModifier: number,
        hitPointGenerationType : HitPointGenerationType) : number {
        switch(hitPointGenerationType) {
            case HitPointGenerationType.HitDieAverage:
                return this.GenerateHitPointsWithHitDieAverage(characterClasses, constitutionModifier);
            case HitPointGenerationType.HitDieRolls:
                return this.GenerateHitPointsWithHitDieRolls(characterClasses, constitutionModifier);
            default:
                return 0;
        }
    }
   
    private static GenerateHitPointsWithHitDieAverage(
            characterClasses: CharacterClass[],
            constitutionModifier: number) : number {
        let totalHp = 0;
        characterClasses.forEach((charClass) => {
            totalHp += (charClass.classLevel * (Math.ceil(charClass.hitDiceValue / 2)) + constitutionModifier);
        });
        return totalHp;
    }

    private static GenerateHitPointsWithHitDieRolls(
        characterClasses: CharacterClass[],
        constitutionModifier: number) : number {
        throw exception(`GenerateHitPointsWithHitDieRolls Method Not Implemented`);
    }
    
  }
   
  export default HitPointGenerationUtility;