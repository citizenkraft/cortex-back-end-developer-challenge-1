import { expect } from "chai";
import { CharacterComponent } from "../src/components/characterComponent";
import { Character } from "../src/models/character/character";
import { Item } from "../src/models/item/item";
import { ItemModifier } from "../src/models/item/itemModifier";

describe('character: round stat modifer', function() {
  let component: CharacterComponent = new CharacterComponent();
  let character = new Character();
    
  let statName = `constitution`;

    it('round correctly, value 10', function() {
      const result = component.GetStatModifier(character, statName, 10);
      expect(result).equal(0);
    }); 

    it('round towards 0, value 17', function() {
        const result = component.GetStatModifier(character, statName, 17);
        expect(result).equal(3);
    }); 

    it('round away from 0, value 7', function() {
      const result = component.GetStatModifier(character, statName, 7);
      expect(result).equal(-2);
    }); 

    it('applies con item correctly', function() {
      let conItem = new Item();
      conItem.modifier = new ItemModifier(); 
      conItem.modifier.affectedObject = "stats"
      conItem.modifier.affectedValue = "constitution"
      conItem.modifier.value = 2;
      conItem.name = "Test Item";
      character.items.push(conItem);

      const result = component.GetStatModifier(character, statName, 12);
      expect(result).equal(3);
    }); 
    
    

  });

  