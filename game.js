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
            .on('pointerover', () => {
                this.showMessage("A door to your right.");
                this.blinking(right_door);
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
            // .on('pointerout', () => this.tweens.pause);
        let open_door = this.add.text(470, 550, "DOOR").setFontSize(55).setInteractive();
        open_door.on('pointerover', () => {
            this.showMessage("An open door to your left. Enter?");
            this.blinking(open_door);
        });
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
        });
        forward.on('pointerdown', () => this.scene.start('b'))
        let backward = this.add.text(350, 800, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
        })
        .on('pointerdown', () =>{
            this.gotoScene('basement_exterior');
        })
    }
}

class Bottom extends AdventureScene{
    constructor(){
        super("b", "Bottom of Stairwell");
    }
    preload(){
        this.load.image('bottom', 'assets/bottom.jpg');
    }
    onEnter(){
        this.makebg('bottom');
        let right = this.add.text(850, 550, "➡️").setInteractive().setScale(3,3);
        right.on('pointerover', () => {
            this.showMessage("Examine the space underneath the stairs?");
        });
        right.on('pointerdown', () => this.scene.start('right'));

        let backward = this.add.text(450, 900, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
        })
        .on('pointerdown', () =>{
            this.gotoScene('stairwell');
        });

        let left = this.add.text(350, 550, "⬅️").setInteractive().setScale(3, 3);
        left.on("pointerdown", () => this.gotoScene('first_door'));
        left.on("pointerover", () => this.showMessage("Turn left?"))
    }
}


class Stairs_Right extends AdventureScene{
    constructor(){
        super('right', "Spandrel")
    }
    preload(){
        this.load.image('floor', 'assets/no_key_on_floor.png');
        this.load.image('first key', 'assets/first_key.png');
    }
    onEnter(){
        this.makebg('floor');

        let check = 0;
        let k = this.add.sprite(660, 380, "first key").setInteractive().setScale(1.2, 1.2);
        k.angle = -15;
        let glow = k.preFX.addGlow();
        k.on('pointerover', () => this.showMessage("A key?"));
        k.on('pointerdown', () => {
            this.gainItem('key');
            if(check == 0){
                this.showMessage("Obtained key!")
            }else{
                this.showMessage("There's nothing else to take.");
            }
            check++;
            glow.setActive(false);
        })

        let backward = this.add.text(350, 900, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
        })
        .on('pointerdown', () =>{
            this.gotoScene('b');
        })

    }

}

class First_Door extends AdventureScene{
    constructor(){
        super("first_door", "Entrance");
    }
    preload(){
        this.load.image("door", 'assets/first_door.jpg');
    }
    onEnter(){
        this.makebg('door');
        let interact = this.add.rectangle(780, 670, 40, 150, '0xffffff').setInteractive();
        interact.alpha = 0.01;
        interact.on('pointerover', () => {
            if(this.hasItem("key")){
                this.showMessage("Continue.");
            }else{
                this.showMessage("Continue?");
            }
        });
        interact.on('pointerdown', () =>{
            if(this.hasItem("key")){
                this.showMessage("Ha. Got it!");
                this.loseItem("key");
                this.gotoScene("transition");
            }else{
                this.scene.start('closer');
            }
        })

        let backward = this.add.text(350, 800, "⬇️").setInteractive().setScale(3, 3);
        backward.on('pointerover', () => {
            this.showMessage("Go back?");
        })
        .on('pointerdown', () =>{
            this.gotoScene('b');
        })

    }
}

class Door_Closer extends Phaser.Scene{
    constructor(){
        super('closer');
    }

    preload(){
        this.load.image('message', 'assets/door_message.jpg');
    }

    create(){
        this.add.sprite(0, 0, 'message').setOrigin(0,0).setDisplaySize(this.game.config.width, this.game.config.height);
        this.time.delayedCall(3000, () =>{
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('first_door'));
        })
    }
}

class Transition extends Phaser.Scene{
    constructor(){
        super('transition');
    }
    create(){
        let message = this.add.text(25, 25, 
            `With the door opened, I stepped into a labyrinth. Bare walls and pipes surrounded me and the relics of old machines greeted me. I made my way through winding paths and confusing routes until I was greeted by another interesting door...`).setFontSize(45);
        message.setWordWrapWidth(1500);
        this.time.delayedCall(6500, () =>{
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('final_door'));
        })
    }
}

class Final_Door extends AdventureScene{
    constructor(){
        super('final_door', "The Final Door");
    }
    preload(){
        this.load.image('final_door', 'assets/final_door.jpg')
    }
    onEnter(){
        this.makebg('final_door');

        let left = this.add.text(100, 550, "⬅️").setInteractive().setScale(3, 3);
        left.on("pointerdown", () => this.gotoScene('lockers'));
        left.on("pointerover", () => this.showMessage("Turn left?"));

        

    }
}

class Lockers extends AdventureScene{
    constructor(){
        super('lockers', 'Lockers')
    }
    preload(){
        this.load.image('lockers', 'assets/lockers.jpg');
    }
    onEnter(){
        this.makebg('lockers');
        let interact = this.add.rectangle(1050, 525, 240, 240, '0xffffff').setInteractive();
        interact.alpha = 0.01;
        interact.on('pointerover', () => {
            this.showMessage("Examine Locker 89?");
        });
        interact.on('pointerdown', () => {
            this.gotoScene('locker_interior');
        })
    }
}

class Locker_Interior extends AdventureScene{
    constructor(){
        super('locker_interior', "Locker Interior");
    }
    preload(){
        this.load.image('locker_interior', 'assets/key_in_locker.jpg');
        this.load.image('end_key', 'assets/ending_key.png');
    }
    onEnter(){
        this.makebg('locker_interior');
        //figure out why the key isn't showing up!
        let final_key = this.add.sprite(480, 550, "end_key").setScale(6,6).setInteractive();
        let g = final_key.preFX.addGlow();
        let check = 0;

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
        //debug tools
        this.input.keyboard.on('keyup-' + 'O', () => {
            this.scene.start('basement_exterior');
        });
        this.input.keyboard.on('keyup-' + 'K', ()=> this.scene.start('right'));
        this.input.keyboard.on('keyup-' + 'D', ()=> this.scene.start('first_door'));
        this.input.keyboard.on('keyup-' + 'F', () => this.scene.start('final_door'));
        this.input.keyboard.on('keyup-' + 'L', () => this.scene.start('lockers'));

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
    scene: [Click, Studio, Title, Basement_Exterior, Stairs, Bottom, Stairs_Right, First_Door, Door_Closer, 
        Transition, Final_Door, Lockers, Locker_Interior, Outro],
    title: "Adventure Game",
});

