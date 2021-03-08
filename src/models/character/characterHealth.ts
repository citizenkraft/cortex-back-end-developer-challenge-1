import { CharacterHealthStatusType } from "../enums/characterHealthStatusType";

export class CharacterHealth {
    maximumHitPoints: number = 0;
    currentHitPoints: number = 0;
    temporaryHitPoints: number = 0;
    status: CharacterHealthStatusType = CharacterHealthStatusType.Alive;
    successfulDeathSaves: number = 0;
}