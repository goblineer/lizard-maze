import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    //load logo for loading screen

    const logo = this.add.image(400, 150, 'logo');
    this.tweens.add({
      targets: logo,
      x: { value: 600, duration: 4000, ease: 'Power2' },
      y: { value: 350, duration: 1500, ease: 'Bounce.easeOut' }
    });

    // set up a progress bar for preloading

    var progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x22222, 0.8);
    progressBox.fillRect(50, innerHeight / 2 - 30, 320, 50);

    const percentText = this.make.text({
      x: 200,
      y: innerHeight / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    percentText.setOrigin(0.5, 0.5);

    const loadingText = this.make.text({
      x: 90,
      y: innerHeight / 2 - 60,
      text: 'Loading... ',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    loadingText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: 25,
      y: innerHeight / 2 + 50,
      text: 'sdfsdf',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    //update progress bar

    this.load.on('progress', function(value) {
      console.log(value);
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(60, innerHeight / 2 - 20, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    //load assets for game

    this.load.spritesheet('player', 'assets/playersprite.png', {
      frameWidth: 32,
      frameHeight: 20
    }),
      this.load.image('wizard', 'assets/wizard.png');
    this.load.image('button1', 'assets/button1.png');
    this.load.image('logo' + i, 'assets/logo.png');
    for (var i = 0; i < 1000; i++) {
      this.load.image('logo' + i, 'assets/logo.png');
    }
  }

  create() {
    // this.scene.start('Game');
  }
}
