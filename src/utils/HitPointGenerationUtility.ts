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
            totalHp += (charClass.classLevel * (this.GetRolledAverage(charClass.hitDiceValue)) + constitutionModifier);
        });
        return totalHp;
    }

    private static GenerateHitPointsWithHitDieRolls(
        characterClasses: CharacterClass[],
        constitutionModifier: number) : number {
        throw exception(`GenerateHitPointsWithHitDieRolls Method Not Implemented`);
    }
   
    private static GetRolledAverage(hitDiceValue: number) : number {
        let sum = 0;
        if (hitDiceValue > 0) {
            for(let i = 1; i <= hitDiceValue; i++) {
                sum += i;
            }
            return Math.ceil(sum/hitDiceValue)
        } else {
            return 0;
        }
    }
  }
   
  export default HitPointGenerationUtility;