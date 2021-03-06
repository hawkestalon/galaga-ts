import Graphics from "./graphics";
import ParticleSystem from "./particle-system";

interface IPosition {
   x: number,
   y: number,
}

export default class EnemyMissile {
   private position: IPosition;
   private graphics: Graphics; 
   private particleSystem: ParticleSystem;
   private size: IPosition;
   private alive: boolean; 
   private rotation: number; 
   private moveRate: number; 

   constructor(pos: IPosition, rotation: number, graphics: Graphics, particleSystem: ParticleSystem){
      this.position = pos; 
      this.graphics = graphics; 
      this.particleSystem = particleSystem;
      this.size = {
         x: 2,
         y: 10,
      } 
      this.alive = true; 
      this.rotation = rotation; 
      this.moveRate = 200; 
   }

   public destroyMissile(){
      this.alive = false; 
   }

   public getCollisionInfo(){
      return {
         pt1: {
            x: this.position.x,
            y: this.position.y - (this.size.y / 2),
         },
         pt2: {
            x: this.position.x,
            y: this.position.y + (this.size.y / 2),
         }
      }
   }

   public update = (elapsedTime: number)=> {
      // this.particleSystem.missileThrust(this.position, this.rotation + (Math.PI / 2), 1000, {mean: 1, stdev: 0.5}, {mean: 0.8, stdev: 0.3})
      this.position.y += Math.sin(this.rotation) * this.moveRate * (elapsedTime / 1000);
      this.position.x += Math.cos(this.rotation) * this.moveRate * (elapsedTime / 1000);
   }

   public render(){
      if(this.position.y > 0) this.graphics.drawRect({center: this.position, size: this.size, rotation: this.rotation + (Math.PI / 2), fill: "rgb(255,100, 0)", stroke: "rgb(255, 100, 0)"});
   }

   public isAlive(){
      if(!this.alive) return false; 
      return this.isInbounds();
   }

   private isInbounds(): boolean{
      if(this.position.x < 0) return false; 
      if(this.position.x > 1024) return false; 
      if(this.position.y < 0) return false; 
      if(this.position.y > 1024) return false; 
      return true;
   }
}