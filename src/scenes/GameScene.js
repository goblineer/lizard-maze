import 'phaser';
import { AlgorithmType, Maze } from 'trailz';
import { TextButton } from '../ui/textButton';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.sprite(24, 24, 'playersprite.png', 3);
    this.player.setCollideWorldBounds(true);

    const maze = new Maze(13, 21, AlgorithmType.AldousBroder);
    const asciiMap = this.make.text({
      x: 16,
      y: 0,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    asciiMap.setOrigin(0, 0);
    asciiMap.setText(maze.string);

    this.clickCount = 0;
    this.mazeText = this.add.text(24, 600, 'This is an AldousBroder maze.');

    this.clickButton = new TextButton(
      this,
      24,
      580,
      'New maze, please!',
      { fill: '#0f0' },
      () => this.updateMazeText(asciiMap, 'BinaryTree')
    );
    this.add.existing(this.clickButton);
  }

  update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(300);
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
      const maze2 = new Maze(13, 21, AlgorithmType[mazeType]);
      asciiMap.setText(maze2.string);
    });
  }
}

// LIST OF ALGORITHMS CURRENTLY AVAILABLE: AldousBroder, BinaryTree, HuntAndKill, RecursiveBacktracker, Sidewinder, Wilsons
