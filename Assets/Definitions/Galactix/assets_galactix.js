/* assets for Galactix */
console.log("Assets for Galactix starting .....");

LoadFonts = [
  { srcName: "MoriaCitadel.ttf", name: "Moria" },
  { srcName: "C64_Pro-STYLE.ttf", name: "C64" },
  { srcName: "CosmicAlien.ttf", name: "Alien" },
  { srcName: "ArcadeClassic.ttf", name: "Arcade" },
  { srcName: "emulogic.ttf", name: "Emulogic" },
  { srcName: "Adore64.ttf", name: "Adore" },
];

LoadTextures = [

  //title
  { srcName: "Title/GalactixWarrior768.jpg", name: "Title" },
  { srcName: "Title/stars.jpg", name: "stars" },
];

LoadAudio = [
  { srcName: "Explosion1.mp3", name: "Explosion" },
  { srcName: "Dance in the Rain - LaughingSkull.mp3", name: "Title" },
  { srcName: "Shoot.mp3", name: "Shoot" },
  { srcName: "Ufo.mp3", name: "Ufo" },
  { srcName: "ClosedDoor.mp3", name: "Hit" },
];

LoadSequences = [
  { srcName: "Sequences/SHIP_exp", name: "ShipExp", type: "png", count: 8 },
  { srcName: "Sequences/ALIEN_exp", name: "AlienExp", type: "png", count: 6 },
  { srcName: "Sequences/ASTEROID_exp", name: "AsteroidExp", type: "png", count: 12 }
];

LoadSprites = [
  { srcName: "Items/alienBullet01.png", name: "alienbullet" },
  { srcName: "Items/bullet1.png", name: "bullet" },
  { srcName: "Items/redship.png", name: "redship" },
  { srcName: "Items/ship.png", name: "whiteship" },
  { srcName: "Items/smallship.png", name: "smallship" },
];

LoadRotatedSheetSequences = [
  { srcName: "Asteroid_1.png", name: "Asteroid_1", count: 1, rotate: { first: 0, last: 359, step: 1 } },
  { srcName: "Asteroid_2.png", name: "Asteroid_2", count: 1, rotate: { first: 0, last: 359, step: 1 } },
  { srcName: "Asteroid_3.png", name: "Asteroid_3", count: 1, rotate: { first: 0, last: 359, step: 1 } },
  { srcName: "Asteroid_4.png", name: "Asteroid_4", count: 1, rotate: { first: 0, last: 359, step: 1 } },
  { srcName: "Asteroid_5.png", name: "Asteroid_5", count: 1, rotate: { first: 0, last: 359, step: 1 } },
  { srcName: "Asteroid_6.png", name: "Asteroid_6", count: 1, rotate: { first: 0, last: 359, step: 1 } },

  { srcName: "alienMother1.png", name: "alienMother", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip1.png", name: "basic1Fighter", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip10.png", name: "basic5Fighter", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip11.png", name: "basic3Charger", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip12.png", name: "basic6Fighter", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip13.png", name: "basic7Fighter", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip14.png", name: "basic8Fighter", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip15.png", name: "basic4Attacker", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip16.png", name: "basic5Attacker", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip17.png", name: "basic6Attacker", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip18.png", name: "basic4Charger", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip19.png", name: "basic7Attacker", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip2.png", name: "basic1Attacker", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip3.png", name: "basic2Attacker", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip4.png", name: "basic1Charger", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip5.png", name: "basic3Attacker", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip6.png", name: "basic2Fighter", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip7.png", name: "basic3Fighter", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip8.png", name: "basic2Charger", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "alienShip9.png", name: "basic4Fighter", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "greeninvader.png", name: "greeninvader", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "invader.png", name: "invader", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "motherShip3.png", name: "slimship", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "motherShip4.png", name: "darkship", count: 1, rotate: { first: 0, last: 350, step: 10 } },
  { srcName: "redinvader.png", name: "redinvader", count: 1, rotate: { first: 0, last: 350, step: 10 } },
];
console.log("Assets for Galactix completed");