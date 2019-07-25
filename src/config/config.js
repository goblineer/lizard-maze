export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 960,
  height: 640,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
};
