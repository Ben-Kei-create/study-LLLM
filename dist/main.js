import 'phaser';
class StarGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'StarGame',
        });
    }
    create() {
        this.createStarTexture();
        this.cameras.main.setBackgroundColor('#09111f');
        this.physics.world.setBounds(0, 0, 800, 600);
        this.add
            .text(24, 24, 'Click anywhere to drop bouncing stars', {
            color: '#f8fafc',
            fontFamily: 'sans-serif',
            fontSize: '24px',
        })
            .setDepth(1);
        this.input.on('pointerdown', (pointer) => {
            const star = this.physics.add.image(pointer.x, pointer.y, 'star');
            star.setCircle(22);
            star.setBounce(0.9, 0.85);
            star.setCollideWorldBounds(true);
            star.setVelocity(Phaser.Math.Between(-160, 160), Phaser.Math.Between(-260, -120));
            star.setAngularVelocity(Phaser.Math.Between(-240, 240));
        });
    }
    createStarTexture() {
        const graphics = this.make.graphics();
        const points = [];
        const centerX = 24;
        const centerY = 24;
        const outerRadius = 22;
        const innerRadius = 10;
        for (let index = 0; index < 10; index += 1) {
            const radius = index % 2 === 0 ? outerRadius : innerRadius;
            const angle = Phaser.Math.DegToRad(-90 + index * 36);
            points.push(new Phaser.Math.Vector2(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius));
        }
        graphics.fillStyle(0xfacc15, 1);
        graphics.fillPoints(points, true);
        graphics.lineStyle(3, 0xfef08a, 1);
        graphics.strokePoints(points, true);
        graphics.generateTexture('star', 48, 48);
        graphics.destroy();
    }
}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#09111f',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 200 },
        },
    },
    scene: [StarGame],
};
const game = new Phaser.Game(config);
