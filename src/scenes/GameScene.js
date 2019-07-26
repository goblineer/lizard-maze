import 'phaser';
import { AlgorithmType, Maze } from 'trailz';
import { TextButton } from '../ui/textButton';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();
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
    this.clickCountText = this.add.text(
      24,
      600,
      'This is an AldousBroder maze.'
    );

    this.clickButton = new TextButton(
      this,
      24,
      580,
      'New maze, please!',
      { fill: '#0f0' },
      () => this.updateClickCountText(asciiMap, 'BinaryTree')
    );
    this.add.existing(this.clickButton);
  }

  updateClickCountText(asciiMap, mazeType) {
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

    this.clickCountText.setText(`This is a ${mazeType} maze.`);
    this.clickCount++;

    this.input.on('pointerup', function() {
      const maze2 = new Maze(13, 21, AlgorithmType[mazeType]);
      asciiMap.setText(maze2.string);
    });
  }
}

// LIST OF ALGORITHMS CURRENTLY AVAILABLE: AldousBroder, BinaryTree, HuntAndKill, RecursiveBacktracker, Sidewinder, Wilsons
