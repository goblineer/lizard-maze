import 'phaser';
import { AlgorithmType, Maze } from 'trailz';
import { TextButton } from '../ui/textButton';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    const bg = this.add.rectangle(0, 0, 960, 570, 0xf4d03f);
    bg.setOrigin(0, 0);
    this.player = this.physics.add.sprite(35, 35, 'player', 4);
    this.player.body.setCollideWorldBounds(true);

    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [5, 3, 4, 5, 3]
      }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 0, 2, 1, 0]
      }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('vplayer', {
        frames: [1, 0, 2, 1, 0]
      }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('vplayer', {
        frames: [5, 3, 4, 5, 3]
      }),
      frameRate: 8,
      repeat: -1
    });

    const maze = new Maze(11, 18, AlgorithmType.AldousBroder);
    const asciiMap = this.make.text({
      x: -1,
      y: 0,
      text: '',
      style: {
        font: '22px monospace',
        fill: '#333'
      }
    });

    asciiMap.setOrigin(0, 0);
    asciiMap.setText(maze.string);

    this.clickCount = 0;
    this.mazeText = this.add.text(24, 600, 'This is an AldousBroder maze.');

    this.clickButton = new TextButton(
      this,
      24,
      583,
      'New maze, please!',
      { fill: '#0f0' },
      () => this.updateMazeText(asciiMap, 'BinaryTree')
    );
    this.add.existing(this.clickButton);
  }

  update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.anims.play('walk-left', true);
      this.player.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('walk-right', true);
      this.player.setVelocityX(100);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('walk-up', true);
      this.player.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('walk-down', true);
      this.player.setVelocityY(100);
    } else {
      this.player.anims.stop();
    }
  }

  updateMazeText(asciiMap, mazeType) {
    const mazeTypes = [
      'AldousBroder',
      'BinaryTree',
      'HuntAndKill',
      'RecursiveBacktracker',
      'Sidewinder',
      'Wilsons'
    ];

    if (this.clickCount >= mazeTypes.length) this.clickCount = 0;

    mazeType = mazeTypes[this.clickCount];

    this.mazeText.setText(`This is a ${mazeType} maze.`);
    this.clickCount++;

    this.input.on('pointerup', function() {
      const maze2 = new Maze(11, 18, AlgorithmType[mazeType]);
      asciiMap.setText(maze2.string);
    });
  }
}

// LIST OF ALGORITHMS CURRENTLY AVAILABLE: AldousBroder, BinaryTree, HuntAndKill, RecursiveBacktracker, Sidewinder, Wilsons
