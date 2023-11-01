namespace SpriteKind {
    export const b = SpriteKind.create()
    export const treat = SpriteKind.create()
    export const flower = SpriteKind.create()
    export const berry = SpriteKind.create()
    export const fireball = SpriteKind.create()
    export const heart = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.heart, function (sprite, otherSprite) {
    if (info.life() == 5) {
        otherSprite.destroy()
    } else {
        otherSprite.destroy()
        info.changeLifeBy(1)
    }
})
// How you actually win the game
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    game.over(true, effects.hearts)
})
// Jump handler, moves bonnie up by 100 if she's not already in flight!
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bonnie.vy == 0) {
        bonnie.vy = -100
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    game.over(false, effects.dissolve)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    current_Adventer += 1
    stratlevel()
})
// treat handler
sprites.onOverlap(SpriteKind.Player, SpriteKind.treat, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// start fuction- levels bonnie up when sh pases through the portal
function stratlevel () {
    if (current_Adventer == 0) {
        tiles.setTilemap(tilemap`level1`)
    } else if (current_Adventer == 1) {
        tiles.setTilemap(tilemap`level2`)
    } else if (current_Adventer == 2) {
        tiles.setTilemap(tilemap`level3`)
    } else {
        tiles.setTilemap(tilemap`level4`)
    }
    scene.cameraFollowSprite(bonnie)
    bonnie.ay = 100
    info.setLife(5)
    tiles.placeOnRandomTile(bonnie, assets.tile`myTile7`)
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.treat)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.berry)) {
        value.destroy()
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        dog_treat = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . f f f . . . . . . . . . f f . 
            . f 4 f f f f f f f f f f 4 f . 
            . . f f 4 4 4 4 4 4 4 4 f f . . 
            . f 4 f 4 4 4 4 4 4 4 4 f 4 f . 
            . f f f f f f f f f f f f f f . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.treat)
        tiles.setTileAt(value, assets.tile`transparency16`)
        tiles.placeOnTile(dog_treat, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        cherry = sprites.create(assets.image`flower`, SpriteKind.berry)
        tiles.placeOnTile(cherry, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile15`)) {
        Fireball = sprites.create(img`
            . . . . . . . 5 . . . . . . . . 
            . . . . . . . . . 8 . . . . . . 
            . 2 . . . 5 4 5 . . . . 2 . . . 
            . . . . 5 4 2 4 5 . . . . . . . 
            . . . 5 4 2 8 2 4 5 4 5 . . . . 
            . . . 5 4 2 8 2 4 5 . . . . 2 . 
            4 . . 5 4 2 8 2 4 5 . . . . . . 
            . 8 . 5 4 2 8 2 4 5 . 8 . . . . 
            . . . 5 4 2 8 2 4 5 . . 4 . . . 
            . . . . 5 4 2 4 5 . . . . . . . 
            . . 5 . . 5 5 5 . . . . . . . . 
            . . 2 . . . 5 . . . . . . . . . 
            . . . . . . . . . . 8 . . 2 . . 
            . . . . . . . . . . . . . . . . 
            . . . 2 . . . 4 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.fireball)
        tiles.placeOnTile(Fireball, value)
        animation.runMovementAnimation(
        Fireball,
        "c 0 -100 0 100 0 0",
        5000,
        true
        )
        tiles.setTileAt(value, assets.tile`transparency16`)
        Fireball.startEffect(effects.fire)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile19`)) {
        heart = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f . f f f . . . . 
            . . . . f 3 3 3 f 3 3 3 f . . . 
            . . . . f 3 3 3 3 3 1 3 f . . . 
            . . . . f 3 3 3 3 3 3 3 f . . . 
            . . . . . f 3 3 3 3 3 f . . . . 
            . . . . . f f 3 3 3 f f . . . . 
            . . . . . . f f 3 f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.heart)
        tiles.placeOnTile(heart, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        heart.startEffect(effects.trail)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.fireball, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy()
})
// berry handler - spawns a wasp to chase bonnie
sprites.onOverlap(SpriteKind.Player, SpriteKind.berry, function (sprite, otherSprite) {
    otherSprite.destroy()
    wasp = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f 1 1 f f 1 1 f . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f 5 5 f 5 5 5 f . . . . . 
        . f f f 5 5 f 5 5 5 f . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    wasp,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f 1 1 f f 1 1 f . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f 5 5 f 5 5 5 f . . . . . 
        . f f f 5 5 f 5 5 5 f . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . f 5 5 f 5 5 5 f . . . . . 
        . f f f 5 5 f 5 5 5 f . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    50,
    true
    )
    wasp.follow(bonnie)
    wasp.setPosition(bonnie.x + 80, bonnie.y + -80)
})
// bonnie vs wasp - if bonnie is higher up she wins, otherwise wasp wins
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (bonnie.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
    otherSprite.destroy()
})
let wasp: Sprite = null
let heart: Sprite = null
let Fireball: Sprite = null
let cherry: Sprite = null
let dog_treat: Sprite = null
let bonnie: Sprite = null
let current_Adventer = 0
scene.setBackgroundImage(assets.image`sky backround`)
current_Adventer = 0
bonnie = sprites.create(img`
    . . 4 4 4 . . . . 4 4 4 . . . . 
    . 4 5 5 5 e . . e 5 5 5 4 . . . 
    4 5 5 5 5 5 e e 5 5 5 5 5 4 . . 
    4 5 5 4 4 5 5 5 5 4 4 5 5 4 . . 
    e 5 4 4 5 5 5 5 5 5 4 4 5 e . . 
    . e e 5 5 5 5 5 5 5 5 e e . . . 
    . . e 5 f 5 5 5 5 f 5 e . . . . 
    . . f 5 5 5 4 4 5 5 5 f . . f f 
    . . f 4 5 5 f f 5 5 6 f . f 5 f 
    . . . f 9 9 9 9 9 9 4 4 f 5 5 f 
    . . . f 4 5 5 5 5 5 5 4 4 5 f . 
    . . . f 5 5 5 5 5 4 5 5 f f . . 
    . . . f 5 f f f 5 f f 5 f . . . 
    . . . f f . . f f . . f f . . . 
    `, SpriteKind.Player)
controller.moveSprite(bonnie, 100, 0)
stratlevel()
