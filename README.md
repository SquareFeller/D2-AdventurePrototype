A simple adventure game by Isai Rincon based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: The scenes that are based on `AdventureScene` are **Basement_Exterior, Stairs, Bottom, Stairs_Right, First_Door, Final_Door, Lockers, and Locker_Interior**.
- **2+ scenes *not* based on `AdventureScene`**: The scenes that are not based on `AdventureScene` are **Click, Studio, Title, Transition, and Outro**.
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: **makebg(key)** was a method I made that would automatically take the key name of a preloaded image and make it fit within the boundaries created by                      `AdventureScene`. Almost all of my backgrounds were images I took on my phone and I knew I would constantly have to resize them for each scene they were in, so I made a handy method to do it for me. It adds a sprite to the scene that corresponds to the key name for the preloaded image
                        and sets its display size to a width of the game screen's width * 0.75 and a height of the game screen's height. 
    - Enhancement 2: **blinking(key)** was another method I made that would take the name of an image, text, etc. (under the name of key) and would create a tween for it. I wanted nearly every interactable element in my game to blink/pulsate if the pointer was over it so that the player would know they can click on it and that they are currently hovering over it if they want to click on it. So, to simplify this tween, I made it one that I could add rather quickly to most interactable objects with the help of this method.

Experience requirements:
- **4+ locations in the game world**: Some locations include **Basement_Exterior, Stairs, Lockers, and Bottom**.
- **2+ interactive objects in most scenes**: Nearly every scene has directional/navigational objects, and in others like in Stairs_Right, there is the navigational object and the key collectible. 
- **Many objects have `pointerover` messages**: Every single object has a `pointerover` message, which I hope helps the player know they are hovering over something they can click on. For example, the first two doors the player is greeted with each has their message, and some objects that are placed on the door handles have messages, as well. 
- **Many objects have `pointerdown` effects**: 2 examples include the "DOOR" object on the right in the first scene does a back-and-forth animation when clicked on to act as if it shakes its head to tell the player that going through there is not possible, and the two key collectibles a white glow around them that is gone once the player clicks on them (i.e. collects it),
- **Some objects are themselves animated**: The left, right, up, and down arrows that serve as navigational objects are all animated in that they loop moving in the direction they point to as another visual component that tells the player what direction they would go in should they click on it.

Asset sources:
- All background images were photos taken by me on my phone with creative assistance from Adam Smith who helped me devise a story to connect all the images.
- The footsteps audio and title screen audio was recorded by me and normalized, cut, and given fades in [audiomass](https://audiomass.co/)
- The audio that plays when the keys are obtained was made by me in [beepbox](https://www.beepbox.co/#9n31s0k0l00e03t2ma7g0fj07r1i0o432T1v1u3af0qwx10p511d08A9F4B0Q07e0Pc436E3b662663cT1v1u36f0qwx10n511d08A0F0B0Q06e0Pb330E3bi617626T7v1u20f21562kaq0x10s12d08H_SRJ6JIBxAAAAkh8IbE1b1T2v1u15f10w4qw02d03w0E0b4h400000000h4g000000014h000000004h400000000p1kBWq_3f5M4LjnU9UK0000) using the "rain drop" and "kalimba" instruments. I exported it and used [audiomass](https://audiomass.co/) to cut it down, normalize it, and give it a fade-out. 
- All other objects are emojis that I copy-and-pasted from [emojipedia](https://emojipedia.org/).

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and partially rewritten by me.
- The animation on the "DOOR" object when clicked on was provided by Adam Smith. 
