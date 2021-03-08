# Running Instructions
run: `docker-compose up` in your favorite command line.  
Create a character by posting [briv.json](briv.json) (or similar) to localhost:4001/character
Use the returned ID (should be 1) to access the other endpoints.
PUT /character/1/attack
PUT /character/1/heal
PUT /character/1/addTempHp

npm test to run unit tests.

# What I would improve
1. Wire up enums correctly. This is my first express project, and in the timebox I allotted I couldn't quite nail down the POST body conversion to enumerations that I would like to.  I come from a .net background, so that bothers me a lot.  I am a big fan of strongly typed everythings.

2. Logging.  Both for debugging and as a combat history log, but alas, there are so many hours in the day.

3. I'm not sure if it was intentional, but the `hitDiceValue` and `hitdicevalue` caused some issues.  I would implment some middleware to try to sanitize the json in the request bodies.

4. MOAR Unit tests!  Coverage was limited by my timebox. 

I hope to talk to you in person about this code and where else I would like to take it.

Have a lucky day!
Dustin

# Cortex Back End Developer Challenge
In this test we would like you to create an API that will manage a player character’s Hit Points(HP). Clients will need to be able to do the following:
- Deal damage of different types (bludgeoning, fire, etc) while considering character resistences and immunities
- Heal
- Add temporary hit points

The API should be built with Express on Node.js and run in docker. The service you create should calculate the HP based on the character information and persist for the life of the application. You can store the data however you'd like. You'll find the json that represents a stripped down character in  [briv.json](briv.json).

HP are an abstract representation of a character's life total. In D&D a character's HP are calculated in one of two ways. Either a random roll of a Hit Die whose number of sides is determined by a character's class for each class level they have, or the player may choose to the rounded up average result of the hit die value for each character level. You may choose either method you do not need to do both. Also included in the calculation of the character's HP is the character's constitution stat modifer. To calculate a stat modifier take the ((statValue - 10)/2) round to the lowest integer. In negative numbers this means rounding to the integer further from zero.

Temporary Hit Points are a special case of hitpoints that are added to the current HP total and are always subtracted from first, and they cannot be healed. Temporary hit points are never additive they only take the higher value, either what exists or what is being "added".

When a character has resistance to a damage type they receive half damage from that type.

When a character has immunity to a damage type they receive no damage from that type.

Feel free to fill in any gaps you may encounter as you see fit. However, if you have questions please reach out to your Fandom contact and we will get back to you.
