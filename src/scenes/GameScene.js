import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const logo = this.add.image(400, 150, 'logo');
    this.tweens.add({
      targets: logo,
      x: { value: 600, duration: 4000, ease: 'Power2' },
      y: { value: 350, duration: 1500, ease: 'Bounce.easeOut' }
    });
  }
}
