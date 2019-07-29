import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    const fadeCamera = this.cameras.add(0, 0, innerWidth, innerHeight);
    fadeCamera.fade(4000);
    if (fadeCamera._fadeAlpha >= 1.0) {
      fadeCamera._fadeAlpha = 0.0;
      fadeCamera.fade(4000);
    }
    //load logo for loading screen
    const logo = this.add.image(
      innerWidth * 0.55,
      innerHeight / 2 - 50,
      'robologo'
    );

    // optional animation for logo
    this.tweens.add({
      targets: logo,
      x: { value: 730, duration: 4000, ease: 'Power2' },
      y: { value: 400, duration: 1500, ease: 'Bounce.easeOut' }
    });

    // set up a progress bar for preloading

    var progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x333333, 0.8);
    progressBox.fillRect(45, innerHeight / 2 - 30, 320, 50);

    const percentText = this.make.text({
      x: 200,
      y: innerHeight / 2 - 5,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    percentText.setOrigin(0.5, 0.5);

    const loadingText = this.make.text({
      x: 50,
      y: innerHeight / 2 - 80,
      text: 'Loading... ',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    const assetText = this.make.text({
      x: 50,
      y: innerHeight / 2 + 50,
      text: '',
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
      progressBar.fillRect(55, innerHeight / 2 - 20, 300 * value, 30);
    });

    // update file progress text

    // this.load.on('fileprogress', function(file) {
    //   assetText.setText('Loading asset: ' + file.key);
    // });

    //load assets for game

    this.load.spritesheet({
      key: 'player',
      url: 'assets/playersprite.png',
      frameConfig: {
        frameWidth: 32,
        frameHeight: 22,
        startFrame: 0,
        endFrame: 5
      }
    });

    this.load.spritesheet({
      key: 'vplayer',
      url: 'assets/vert-player.png',
      frameConfig: {
        frameWidth: 22,
        frameHeight: 32,
        startFrame: 0,
        endFrame: 5
      }
    });

    this.load.image('robologo', 'assets/robologo.png');
    this.load.image('wizard', 'assets/wizard.png');
    this.load.image('button1', 'assets/button1.png');
    this.load.image('button2', 'assets/button2.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('logo' + i, 'assets/logo.png');
    for (var i = 0; i < 600; i++) {
      this.load.image('logo' + i, 'assets/logo.png');
    }
  }
  create() {
    this.scene.start('Title');
  }
}
