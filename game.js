class Basement_Exterior extends AdventureScene {
    constructor() {
        super("basement_exterior", "Basement Exterior"); //guessing the second argument is the name of the room that appears at the top-right
    }
    preload(){
        this.load.image('b_exterior', 'assets/basement_exterior.jpg');
    }
    onEnter() {
        this.makebg('b_exterior');
        let right_door = this.add.text(770, 550, "DOOR");
        right_door.setFontSize(64)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A door to your right."))
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
            });
        let open_door = this.add.text(470, 550, "DOOR").setFontSize(55).setInteractive();
        open_door.on('pointerover', () => this.showMessage("An open door to your left. Enter?"));
        open_door.on('pointerdown', () => this.gotoScene('stairwell'));
        
        
        // let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
        //     .setFontSize(this.s * 2)
        //     .setInteractive() // this function is needed for the 'pointerover' stuff
        //     .on('pointerover', () => this.showMessage("Metal, bent."))
        //     .on('pointerdown', () => {
        //         this.showMessage("No touching!");
        //         this.tweens.add({
        //             targets: clip,
        //             x: '+=' + this.s,
        //             repeat: 2,
        //             yoyo: true,
        //             ease: 'Sine.inOut',
        //             duration: 100
        //         });
        //     });

        // let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("It's a nice key.")
        //     })
        //     .on('pointerdown', () => {
        //         this.showMessage("You pick up the key.");
        //         this.gainItem('key'); //inventory function from adventure.js
        //         this.tweens.add({
        //             targets: key,
        //             y: `-=${2 * this.s}`,
        //             alpha: { from: 1, to: 0 },
        //             duration: 500,
        //             onComplete: () => key.destroy()
        //         });
        //     })

        // let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         if (this.hasItem("key")) {
        //             this.showMessage("You've got the key for this door.");
        //         } else {
        //             this.showMessage("It's locked. Can you find a key?");
        //         }
        //     })
        //     .on('pointerdown', () => {
        //         if (this.hasItem("key")) {
        //             this.loseItem("key");
        //             this.showMessage("*squeak*");
        //             door.setText("🚪 unlocked door");
        //             this.gotoScene('demo2');
        //         }
        //     })

    }
}

class Stairs extends AdventureScene{
    constructor(){
        super("stairwell", "Stairwell");
    }
    preload(){
        this.load.image('stairwell', 'assets/stairwell.jpg');
    }
    onEnter(){
        this.makebg('stairwell');
        let forward = this.add.text(350, 450, "⬆️").setInteractive().setScale(3,3);
        forward.on('pointerover', () => {
            this.showMessage("Continue down the stairs?");
        })
        .on('pointerdown', () => {
            this.gotoScene('stair_bottom'); //make a scene ASAP
        });
        
        let backward = this.add.text(350, 800, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
        })
        .on('pointerdown', () =>{
            this.gotoScene('basement_exterior');
        })
    }
}

class Bottom extends AdventureScene {
    constructor(){
        super('stair_bottom', "Bottom of Stairs")
    }
    preload(){
        //code here
    }

    onEnter(){
        //code here
    }
}


// class Demo2 extends AdventureScene {
//     constructor() {
//         super("demo2", "The second room has a long name (it truly does).");
//     }
//     onEnter() {
//         this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
//             .setFontSize(this.s * 2)
//             .setInteractive()
//             .on('pointerover', () => {
//                 this.showMessage("You've got no other choice, really.");
//             })
//             .on('pointerdown', () => {
//                 this.gotoScene('demo1');
//             });

//         let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
//             .setInteractive()
//             .on('pointerover', () => {
//                 this.showMessage('*giggles*');
//                 this.tweens.add({
//                     targets: finish,
//                     x: this.s + (this.h - 2 * this.s) * Math.random(),
//                     y: this.s + (this.h - 2 * this.s) * Math.random(),
//                     ease: 'Sine.inOut',
//                     duration: 500
//                 });
//             })
//             .on('pointerdown', () => this.gotoScene('outro'));
//     }
// }

// class Intro extends Phaser.Scene { //will want to make this one my studio scene again
//     constructor() {
//         super('intro')
//     }
//     create() {
//         this.add.text(50,50, "Adventure awaits!").setFontSize(50);
//         this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
//         this.input.on('pointerdown', () => {
//             this.cameras.main.fade(1000, 0,0,0);
//             this.time.delayedCall(1000, () => this.scene.start('demo1'));
//         });
//     }
// }
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
        this.input.keyboard.on('keyup-' + 'O', () => {
            this.scene.start('basement_exterior');
        });
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
    create() {
        this.add.text(655, 355, "89").setFontSize(55);
        let play = this.add.text(655, 540, "Begin").setFontSize(45);
        play.setInteractive();
        play.alpha = 0.05;
        this.tweens.add({
            targets: play,
            alpha: {from: 0.05, to: 1},
            duration: 1500,
            repeat: -1,
            yoyo: true
        });
        play.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('basement_exterior'));
        });
    }
}


class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
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
    scene: [Click, Studio, Title, Basement_Exterior, Stairs, Outro],
    title: "Adventure Game",
});

