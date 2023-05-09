class Basement_Exterior extends AdventureScene {
    constructor() {
        super("basement_exterior", "Basement Exterior");
    }
    preload() {
        this.load.image('b_exterior', 'assets/basement_exterior.jpg');
    }
    onEnter() {
        this.makebg('b_exterior');
        let right_door = this.add.text(770, 550, "DOOR");
        right_door.setFontSize(64);
        let b;
        let b2;
        right_door.setInteractive()
            .on('pointerover', () => {
                this.showMessage("A door to your right.");
                b = this.blinking(right_door);
            })
            .on('pointerdown', () => {
                this.showMessage("Locked! No way you're getting into this one.")
                this.tweens.add({
                    targets: right_door,
                    x: '+=' + this.game.config.width * 0.01,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.InOut',
                    duration: 150
                });
            })
            .on('pointerout', () => {
                b.stop();
                right_door.alpha = 1;
            });
        let open_door = this.add.text(470, 550, "DOOR").setFontSize(55).setInteractive();
        open_door.on('pointerover', () => {
            this.showMessage("An open door to your left. Enter?");
            b2 = this.blinking(open_door);
        });
        open_door.on('pointerdown', () => this.gotoScene('stairwell'));
        open_door.on('pointerout', () => {
            b2.stop();
            open_door.alpha = 1;
        });
    }
}

class Stairs extends AdventureScene {
    constructor() {
        super("stairwell", "Stairwell");
    }
    preload() {
        this.load.image('stairwell', 'assets/stairwell.jpg');
    }
    onEnter() {
        this.makebg('stairwell');
        let b;
        let b2;
        let forward = this.add.text(350, 450, "⬆️").setInteractive().setScale(3, 3);
        forward.on('pointerover', () => {
            this.showMessage("Continue down the stairs?");
            b = this.blinking(forward);
        });
        forward.on('pointerdown', () => this.scene.start('b'))
        forward.on('pointerout', () => {
            b.stop();
            forward.alpha = 1;
        })
        let backward = this.add.text(350, 800, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
            b2 = this.blinking(backward);
        })
            .on('pointerdown', () => {
                this.gotoScene('basement_exterior');
            })
            .on('pointerout', () => {
                b2.stop();
                backward.alpha = 1;
            })
    }
}

class Bottom extends AdventureScene {
    constructor() {
        super("b", "Bottom of Stairwell");
    }
    preload() {
        this.load.image('bottom', 'assets/bottom.jpg');
    }
    onEnter() {
        this.makebg('bottom');
        let b;
        let b2;
        let b3;

        let right = this.add.text(850, 550, "➡️").setInteractive().setScale(3, 3);
        right.on('pointerover', () => {
            this.showMessage("Examine the space underneath the stairs?");
            b = this.blinking(right);
        });
        right.on('pointerdown', () => this.scene.start('right'));
        right.on('pointerout', () => {
            b.stop();
            right.alpha = 1;
        })

        let backward = this.add.text(450, 900, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
            b2 = this.blinking(backward);
        })
            .on('pointerdown', () => {
                this.gotoScene('stairwell');
            })
            .on('pointerout', () => {
                b2.stop();
                backward.alpha = 1;
            })

        let left = this.add.text(350, 550, "⬅️").setInteractive().setScale(3, 3);
        left.on("pointerdown", () => this.gotoScene('first_door'));
        left.on("pointerover", () => {
            this.showMessage("Turn left?");
            b3 = this.blinking(left);
        })
            .on('pointerout', () => {
                b3.stop();
                left.alpha = 1;
            });
    }
}


class Stairs_Right extends AdventureScene {
    constructor() {
        super('right', "Spandrel")
    }
    preload() {
        this.load.image('floor', 'assets/no_key_on_floor.png');
        this.load.image('first key', 'assets/first_key.png');
        this.load.audio('collect', 'assets/collect.wav');
    }
    onEnter() {
        this.makebg('floor');
        let c = this.sound.add('collect');
        let b;
        let check = 0;
        let k = this.add.sprite(660, 680, "first key").setInteractive().setScale(1.2, 1.2);
        let glow = k.preFX.addGlow();
        if (this.hasItem('key')) {
            glow.setActive(false);
        }
        k.on('pointerover', () => this.showMessage("A key?"));
        k.on('pointerdown', () => {
            this.gainItem('key');
            if (check == 0) {
                this.showMessage("Obtained key!");
                c.play({ volume: 0.25 });
            } else {
                this.showMessage("There's nothing else to take.");
            }
            check++;
            glow.setActive(false);
        })

        let backward = this.add.text(350, 900, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
            b = this.blinking(backward);
        })
            .on('pointerdown', () => {
                this.gotoScene('b');
            })
            .on('pointerout', () => {
                b.stop();
                backward.alpha = 1;
            });
    }

}

class First_Door extends AdventureScene {
    constructor() {
        super("first_door", "Entrance");
    }
    preload() {
        this.load.image("door", 'assets/first_door.jpg');
    }
    onEnter() {
        this.makebg('door');
        let b;

        let interact = this.add.rectangle(780, 670, 40, 150, '0xffffff').setInteractive();
        interact.alpha = 0.01;
        interact.on('pointerover', () => {
            if (this.hasItem("key")) {
                this.showMessage("Continue.");
            } else {
                this.showMessage("Continue?");
            }
        });
        interact.on('pointerdown', () => {
            if (this.hasItem("key")) {
                this.showMessage("Ha. Got it!");
                this.loseItem("key");
                this.gotoScene("transition");
            } else {
                this.gotoScene('closer');
            }
        })

        let backward = this.add.text(350, 800, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
            b = this.blinking(backward);
        })
            .on('pointerdown', () => {
                this.gotoScene('b');
            })
            .on('pointerout', () => {
                b.stop();
                backward.alpha = 1;
            });
    }
}

class Door_Closer extends Phaser.Scene {
    constructor() {
        super('closer');
    }

    preload() {
        this.load.image('message', 'assets/door_message.jpg');
    }

    create() {
        this.add.sprite(0, 0, 'message').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        this.time.delayedCall(3000, () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('first_door'));
        })
    }
}

class Transition extends Phaser.Scene {
    constructor() {
        super('transition');
    }
    preload() {
        this.load.audio('footsteps', 'assets/footsteps.wav');
    }
    create() {
        let f = this.sound.add('footsteps');
        f.play();
        let message = this.add.text(25, 25,
            `With the door opened, I stepped into a labyrinth. Bare walls and pipes surrounded me and the relics of old machines greeted me. I made my way through winding paths and confusing routes until I was greeted by another interesting door...`).setFontSize(45);
        message.setWordWrapWidth(1500);
        this.time.delayedCall(6500, () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('final_door');
                f.stop();
            });
        })
    }
}

class Final_Door extends AdventureScene {
    constructor() {
        super('final_door', "The Final Door");
    }
    preload() {
        this.load.image('final_door', 'assets/final_door.jpg')
    }
    onEnter() {
        this.makebg('final_door');

        let b;

        let left = this.add.text(100, 550, "⬅️").setInteractive().setScale(3, 3);
        left.on("pointerdown", () => this.gotoScene('lockers'));
        left.on("pointerover", () => {
            this.showMessage("Turn left?");
            b = this.blinking(left);
        })
            .on('pointerout', () => {
                b.stop();
                left.alpha = 1;
            })

        let interact = this.add.rectangle(650, 570, 100, 45, '0xffffff').setInteractive();
        interact.alpha = 0.01;
        interact.on('pointerover', () => {
            if (this.hasItem("key")) {
                this.showMessage("Enter.");
            } else {
                this.showMessage("Enter?");
            }
        });
        interact.on('pointerdown', () => {
            if (this.hasItem("key")) {
                this.showMessage("...");
                this.loseItem("key");
                this.gotoScene("outro");
            } else {
                this.showMessage("I must be missing something.")
            }
        })
    }
}

class Lockers extends AdventureScene {
    constructor() {
        super('lockers', 'Lockers')
    }
    preload() {
        this.load.image('lockers', 'assets/lockers.jpg');
    }
    onEnter() {
        this.makebg('lockers');
        let b;

        let interact = this.add.rectangle(1050, 525, 240, 240, '0xffffff').setInteractive();
        interact.alpha = 0.01;
        interact.on('pointerover', () => {
            this.showMessage("Examine Locker 89?");
        });
        interact.on('pointerdown', () => {
            this.gotoScene('locker_interior');
        })

        let backward = this.add.text(740, 900, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
            b = this.blinking(backward);
        })
            .on('pointerdown', () => {
                this.gotoScene('final_door');
            })
            .on('pointerout', () => {
                b.stop();
                backward.alpha = 1;
            })
    }
}

class Locker_Interior extends AdventureScene {
    constructor() {
        super('locker_interior', "Locker Interior");
    }
    preload() {
        this.load.image('locker_interior', 'assets/key_in_locker.jpg');
        this.load.image('end_key', 'assets/ending_key.png');
        this.load.audio('collect', 'assets/collect.wav')
    }
    onEnter() {
        this.makebg('locker_interior');
        let b;
        let c = this.sound.add('collect');
        let final_key = this.add.sprite(540, 950, "end_key").setScale(0.85, 0.85).setInteractive();
        let g = final_key.preFX.addGlow();
        let check = 0;
        if (this.hasItem('key')) {
            g.setActive(false);
        }
        final_key.on('pointerover', () => {
            this.showMessage("Another key?");
        });
        final_key.on('pointerdown', () => {
            this.gainItem('key');
            if (check == 0) {
                this.showMessage("Obtained key!");
                c.play({ volume: 0.25 });
            } else {
                this.showMessage("There's nothing else to take.");
            }
            check++;
            g.setActive(false);
        })

        let backward = this.add.text(740, 900, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
            b = this.blinking(backward);
        })
            .on('pointerdown', () => {
                this.gotoScene('lockers');
            })
            .on('pointerout', () => {
                b.stop();
                backward.alpha = 1;
            });
    }
}

class Studio extends Phaser.Scene {
    constructor() {
        super('studio');
    }

    preload() {
        this.load.image('logo', 'assets/studiologo.jpg');
    }

    create() {
        this.cameras.main.fadeIn(2000);
        this.cameras.main.setBackgroundColor('#949494');
        let frame = this.add.rectangle(970, 540, 550, 450, '0xffffff');
        let logo = this.add.sprite(970, 540, 'logo');
        logo.setScale(0.5, 0.5);
        let s_text = this.add.text(750, 840, "Next Slide Studio", { fontFamily: "noto", fontSize: 64 });
        this.time.delayedCall(3000, () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('title'));
        });
    }
}

class Click extends Phaser.Scene {
    constructor() {
        super('click');
    }
    create() {
        this.add.text(655, 540, "Click to begin.").setFontSize(55);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('studio'));
        });
    }
}

class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload() {
        this.load.audio('title', 'assets/title_screen.wav');
    }
    create() {
        let t = this.sound.add('title')
        t.play({ loop: true });
        this.add.text(655, 355, "89").setFontSize(55);
        let play = this.add.text(655, 540, "Begin").setFontSize(45);
        play.setInteractive();
        play.alpha = 0.05;
        this.tweens.add({
            targets: play,
            alpha: { from: 0.05, to: 1 },
            duration: 1500,
            repeat: -1,
            yoyo: true
        });
        play.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('basement_exterior');
                t.stop()
            });
        });
    }
}


class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "You wish you hadn't opened the door. You weren't sure why you were here in the first place, but you never imagined it would lead to this. Before more regret seeped in, you were dragged in by that THING. Never to be seen again.").setFontSize(50).setWordWrapWidth(1500);
        this.time.delayedCall(5000, () => this.add.text(50, 300, "Click anywhere to restart.").setFontSize(20));
        this.input.on('pointerdown', () => this.scene.start('studio'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Click, Studio, Title, Basement_Exterior, Stairs, Bottom, Stairs_Right, First_Door, Door_Closer,
        Transition, Final_Door, Lockers, Locker_Interior, Outro],
    title: "Adventure Game",
});