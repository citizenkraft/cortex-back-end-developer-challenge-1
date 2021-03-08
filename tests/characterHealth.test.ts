import { expect } from "chai";
import { CharacterHealth } from "../src/models/character/characterHealth";
import { CharacterHealthStatusType } from "../src/models/enums/characterHealthStatusType";
import { CharacterComponent } from "../src/components/characterComponent";
import { Character } from "../src/models/character/character";
import { CharacterDefense } from "../src/models/character/characterDefense";

describe('character component: apply damage', function() {
    let component: CharacterComponent = new CharacterComponent();

    it('apply non lethal damage, no temp hp', function() {
      let character = new Character();
      character.health = new CharacterHealth();
      character.health.currentHitPoints = 10;
      character.health.temporaryHitPoints = 0;
  

      component.ApplyDamage(character, 'slashing', 7);
      
      expect(character.health.currentHitPoints).equal(3);
    }); 

    it('apply lethal damage, no temp hp', function() {
      let character = new Character();
      character.health = new CharacterHealth();
      character.health.currentHitPoints = 10;
      character.health.temporaryHitPoints = 0;

      component.ApplyDamage(character, 'slashing', 12);
      
      expect(character.health.currentHitPoints).equal(-2);
      expect(character.health.status == CharacterHealthStatusType.Unconscious);
      expect(character.health.status == CharacterHealthStatusType.Alive);
    }); 

    it('apply non lethal damage, with temp hp, no temp hp remains', function() {
      let character = new Character();
      character.health = new CharacterHealth();
      character.health.currentHitPoints = 10;
      character.health.temporaryHitPoints = 10;
      
    
      component.ApplyDamage(character, 'slashing', 17);
      
      expect(character.health.currentHitPoints).equal(3);
      expect(character.health.temporaryHitPoints).equal(0);
      expect(character.health.status == CharacterHealthStatusType.Alive);
    }); 

    it('apply non lethal damage, with temp hp, temp hp remains', function() {
      let character = new Character();
      character.health = new CharacterHealth();
      character.health.currentHitPoints = 10;
      character.health.temporaryHitPoints = 10;
    
      component.ApplyDamage(character, 'slashing', 7);
      
      expect(character.health.currentHitPoints).equal(10);
      expect(character.health.temporaryHitPoints).equal(3);
      expect(character.health.status == CharacterHealthStatusType.Alive);
    }); 
  
    it('apply lethal damage, with temp hp', function() {
      let character = new Character();
      character.health = new CharacterHealth();
      character.health.currentHitPoints = 10;
      character.health.temporaryHitPoints = 10;
    
      component.ApplyDamage(character, 'slashing', 22);
      
      expect(character.health.currentHitPoints).equal(-2);
      expect(character.health.temporaryHitPoints).equal(0);
      expect(character.health.status == CharacterHealthStatusType.Unconscious);
    }); 

    it('apply normal damage', function() {
      let character = new Character();
      character.health = new CharacterHealth();
      character.health.currentHitPoints = 10;
    
      component.ApplyDamage(character, 'slashing', 5);
      
      expect(character.health.currentHitPoints).equal(5);
    }); 

    it('apply immunity damage', function() {
      let defenses = new Array<CharacterDefense>();
      let defense = new CharacterDefense();
      defense.type = "fire";
      defense.defense = "immunity";
      defenses.push(defense);
    
      const result = component.ApplyDefenses(defenses, 5, 'fire');
      
      expect(result).equal(0);
    }); 

    it('apply resistance damage', function() {
      let defenses = new Array<CharacterDefense>();
      let defense = new CharacterDefense();
      defense.type = "fire";
      defense.defense = "resistance";
      defenses.push(defense);
    
    
      const result = component.ApplyDefenses(defenses, 5, 'fire');
      
      expect(result).equal(2);
    }); 

    it('apply vulnerability damage', function() {
      let defenses = new Array<CharacterDefense>();
      let defense = new CharacterDefense();
      defense.type = "fire";
      defense.defense = "vulnerability";
      defenses.push(defense);
    
    
      var result = component.ApplyDefenses(defenses, 5, 'fire');
      
      expect(result).equal(10);
    }); 
  });