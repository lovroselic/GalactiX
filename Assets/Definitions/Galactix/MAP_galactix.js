const MAP = {
    CSS: "color: #F00",
    init() {
        Object.keys(MAP).forEach(key => {
            let numericKey = Number(key);
            if (Number.isFinite(numericKey) && Number.isInteger(numericKey)) {
                MAP[key].planeLimits = { width: ENGINE.gameWIDTH / ENGINE.INI.GRIDPIX, height: ENGINE.gameHEIGHT / ENGINE.INI.GRIDPIX };
            }
        });
        console.info("init map", MAP);
    },
    1: {
        maxBullets: 1,
        chargers: 0,
        CD: 10,
        chargerDescent: 4,
        alienBullets: 2,
        AXS: 120,
        AYS: 1440,
        asteroids: 10,
        ship: "whiteship",
        layout: {
            1: {
                num: 8,
                actor: "redinvader",
                score: 30,
                probable: 50
            },
            2: {
                num: 9,
                actor: "greeninvader",
                score: 20,
                probable: 40
            },
            3: {
                num: 8,
                actor: "invader",
                score: 10,
                probable: 30
            },
            4: {
                num: 6,
                actor: "invader",
                score: 10,
                probable: 30
            }
        }
    },
    2: {
        maxBullets: 2,
        chargers: 1,
        CD: 10,
        chargerDescent: 200, //was 4
        alienBullets: 3,
        AXS: 100,
        AYS: 1000,
        asteroids: 9,
        ship: "redship",
        layout: {
            1: {
                num: 3,
                actor: "basic1Charger",
                score: 100,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 8,
                actor: "basic1Attacker",
                score: 75,
                probable: 40
            },
            3: {
                num: 8,
                actor: "basic2Attacker",
                score: 40,
                probable: 35
            },
            4: {
                num: 7,
                actor: "basic1Fighter",
                score: 40,
                probable: 30
            }
        }
    },
    3: {
        maxBullets: 2,
        chargers: 2,
        CD: 8,
        chargerDescent: 4,
        alienBullets: 4,
        AXS: 3,
        AYS: 26,
        asteroids: 9,
        ship: "redship",
        layout: {
            1: {
                num: 3,
                actor: "basic1Charger",
                score: 100,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 5,
                actor: "basic1Charger",
                score: 100,
                probable: 50,
                type: "charger"
            },
            3: {
                num: 8,
                actor: "basic2Attacker",
                score: 40,
                probable: 35
            },
            4: {
                num: 7,
                actor: "basic3Attacker",
                score: 40,
                probable: 35
            }
        }
    },
    4: {
        maxBullets: 2,
        chargers: 4,
        CD: 4,
        chargerDescent: 4,
        alienBullets: 4,
        AXS: 3,
        AYS: 26,
        asteroids: 8,
        ship: "redship",
        layout: {
            1: {
                num: 7,
                actor: "basic2Charger",
                score: 100,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 5,
                actor: "basic4Attacker",
                score: 50,
                probable: 40,
                type: "charger"
            },
            3: {
                num: 8,
                actor: "basic2Fighter",
                score: 40,
                probable: 40
            },
            4: {
                num: 7,
                actor: "basic4Attacker",
                score: 25,
                probable: 40
            }
        }
    },
    5: {
        maxBullets: 3,
        chargers: 4,
        CD: 2,
        chargerDescent: 4,
        alienBullets: 4,
        AXS: 3,
        AYS: 26,
        asteroids: 8,
        ship: "darkship",
        layout: {
            1: {
                num: 7,
                actor: "basic4Charger",
                score: 100,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 5,
                actor: "basic3Charger",
                score: 50,
                probable: 40,
                type: "charger"
            },
            3: {
                num: 7,
                actor: "basic3Fighter",
                score: 40,
                probable: 40
            },
            4: {
                num: 8,
                actor: "basic5Attacker",
                score: 50,
                probable: 45
            }
        }
    },
    6: {
        maxBullets: 3,
        chargers: 4,
        CD: 2,
        chargerDescent: 5,
        alienBullets: 4,
        AXS: 4,
        AYS: 26,
        asteroids: 8,
        ship: "darkship",
        layout: {
            1: {
                num: 7,
                actor: "basic6Fighter",
                score: 100,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 8,
                actor: "basic5Fighter",
                score: 50,
                probable: 40,
                type: "charger"
            },
            3: {
                num: 7,
                actor: "basic7Attacker",
                score: 40,
                probable: 35,
                type: "charger"
            },
            4: {
                num: 8,
                actor: "basic4Fighter",
                score: 25,
                probable: 30
            }
        }
    },
    7: {
        maxBullets: 4,
        chargers: 4,
        CD: 2,
        chargerDescent: 6,
        alienBullets: 5,
        AXS: 4,
        AYS: 26,
        asteroids: 7,
        ship: "slimship",
        layout: {
            1: {
                num: 7,
                actor: "basic7Fighter",
                score: 100,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 8,
                actor: "basic8Fighter",
                score: 50,
                probable: 40,
                type: "charger"
            },
            3: {
                num: 7,
                actor: "basic4Fighter",
                score: 40,
                probable: 35,
                type: "charger"
            },
            4: {
                num: 5,
                actor: "basic7Attacker",
                score: 25,
                probable: 30
            }
        }
    },
    8: {
        maxBullets: 4,
        chargers: 5,
        CD: 2,
        chargerDescent: 7,
        alienBullets: 5,
        AXS: 4,
        AYS: 26,
        asteroids: 7,
        ship: "slimship",
        layout: {
            1: {
                num: 7,
                actor: "basic6Attacker",
                score: 100,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 8,
                actor: "basic5Attacker",
                score: 50,
                probable: 40,
                type: "charger"
            },
            3: {
                num: 9,
                actor: "basic1Charger",
                score: 40,
                probable: 35,
                type: "charger"
            },
            4: {
                num: 7,
                actor: "basic2Charger",
                score: 25,
                probable: 30,
                type: "charger"
            }
        }
    },
    9: {
        maxBullets: 4,
        chargers: 5,
        CD: 2,
        chargerDescent: 8,
        alienBullets: 5,
        AXS: 4,
        AYS: 26,
        asteroids: 7,
        ship: "slimship",
        layout: {
            1: {
                num: 7,
                actor: "basic5Fighter",
                score: 100,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 8,
                actor: "basic2Attacker",
                score: 50,
                probable: 40,
                type: "charger"
            },
            3: {
                num: 9,
                actor: "basic2Fighter",
                score: 40,
                probable: 35,
                type: "charger"
            },
            4: {
                num: 7,
                actor: "basic1Charger",
                score: 25,
                probable: 30,
                type: "charger"
            }
        }
    },
    10: {
        maxBullets: 4,
        chargers: 5,
        CD: 2,
        chargerDescent: 8,
        alienBullets: 5,
        AXS: 4,
        AYS: 26,
        asteroids: 7,
        ship: "slimship",
        layout: {
            1: {
                num: 7,
                actor: "basic8Fighter",
                score: 66,
                probable: 70,
                type: "charger"
            },
            2: {
                num: 2,
                actor: "alienMother",
                score: 1000,
                probable: 99
            },
            3: {
                num: 9,
                actor: "basic3Attacker",
                score: 40,
                probable: 50,
                type: "charger"
            },
            4: {
                num: 10,
                actor: "basic1Charger",
                score: 50,
                probable: 60,
                type: "charger"
            }
        }
    },
    11: {
        maxBullets: 4,
        chargers: 6,
        CD: 1,
        chargerDescent: 9,
        alienBullets: 6,
        AXS: 5,
        AYS: 26,
        asteroids: 7,
        ship: "slimship",
        layout: {
            1: {
                num: 7,
                actor: "random",
                sscore: 50,
                probable: 50,
                type: "charger"
            },
            2: {
                num: 8,
                actor: "random",
                score: 50,
                probable: 50,
                type: "charger"
            },
            3: {
                num: 9,
                actor: "random",
                score: 50,
                probable: 50,
                type: "charger"
            },
            4: {
                num: 7,
                actor: "random",
                score: 50,
                probable: 50,
                type: "charger"
            }
        }
    }
}

const SPAWN = {
    meteors() {
        const num = MAP[GAME.getRealLevel()].asteroids;
        const width = parseInt((SHIP.maxX - SHIP.minX) / (num - 1), 10);
        let assetnames = [];
        for (let a = 0; a < INI.NMETEORS; a++) {
            assetnames.push(`Asteroid_${a + 1}`);
        }
        while (assetnames.length < num) {
            assetnames = assetnames.concat(assetnames);
        }

        for (let m = 0; m < num; m++) {
            const assetName = assetnames.removeRandom();
            let x = SHIP.minX + m * width;
            let y = INI.RUBBLE_Y + RND(-24, 24);
            let angle = RND(0, 35) * 10;
            const mapLimits = MAP[GAME.getRealLevel()].planeLimits;
            const asteroid = new Meteor(new Grid(x, y), assetName, angle, mapLimits);
            PIXEL_ACTORS.add(asteroid);
        }


    },
    aliens() {
        console.log("spawning aliens");
        const mapLimits = MAP[GAME.getRealLevel()].planeLimits;
        const layout = MAP[GAME.getRealLevel()].layout;
        const center = parseInt(ENGINE.gameWIDTH / 2, 10);
        //console.log("..layout", layout);

        for (const row in layout) {
            //console.log("...row", row);
            const xes = ENGINE.spreadAroundCenter(layout[row].num, center, INI.PADDING);
            //console.log("...xes", xes);
            const Y = INI.TOP_Y + parseInt(row, 10) * INI.PADDING;
            for (let q = 0; q < xes.length; q++) {
                let angle = 0;
                if (layout[row].type === "charger") {
                    angle = 180;
                }
                if (layout[row].actor === "random") {
                    layout[row].actor = AlienShips[RND(0, AlienShips.length - 1)];
                }

                let pos = new Grid(xes[q], Y);
                const alien = new Alien(pos, layout[row].actor, angle, mapLimits, layout[row].score, layout[row].probable, layout[row].type || "grunt");
                //console.log("alien", alien);
                PIXEL_ACTORS.add(alien);
                ALIENS.existence.push(alien.id);
                /* if (layout[row].type === "charger") {
                    PIXEL_ACTORS.POOL.last().type = "charger";
                } */
            }
        }
        console.log("PIXEL_ACTORS", PIXEL_ACTORS.POOL);
        console.info("ALIENS.existence", ALIENS.existence);
    }
};

const AlienShips = ["basic7Attacker", "basic4Charger", "basic6Attacker", "basic5Attacker", "basic4Attacker", "basic8Fighter",
    "basic7Fighter", "basic6Fighter", "basic3Charger", "basic5Fighter", "basic4Fighter", "basic2Charger", "basic3Fighter",
    "basic2Fighter", "basic3Attacker", "basic1Charger", "basic2Attacker", "basic1Attacker", "basic1Fighter"];