import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('robologo', 'assets/robologo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
