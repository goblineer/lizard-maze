import 'phaser';
import { AlgorithmType, Maze } from 'trailz';
import { TextButton } from '../ui/textButton';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const maze = new Maze(10, 16, AlgorithmType.AldousBroder);
    const asciiMap = this.make.text({
      x: 16,
      y: 0,
      text: '',
      style: {
        font: '24px monospace',
        fill: '#ffffff'
      }
    });

    asciiMap.setOrigin(0, 0);
    asciiMap.setText(maze.string);

    this.clickCount = 0;
    this.clickCountText = this.add.text(24, 600, '');

    this.clickButton = new TextButton(
      this,
      24,
      580,
      'Click me!',
      { fill: '#0f0' },
      () => this.updateClickCountText()
    );
    this.add.existing(this.clickButton);

    this.updateClickCountText(asciiMap);
  }

  updateClickCountText(asciiMap) {
    this.clickCountText.setText(
      `Button has been clicked ${this.clickCount} times.`
    );
    this.clickCount++;

    this.input.on('pointerup', function() {
      const maze2 = new Maze(10, 16, AlgorithmType.BinaryTree);
      asciiMap.setText(maze2.string);
    });
  }
}
