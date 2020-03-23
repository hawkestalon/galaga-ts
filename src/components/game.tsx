import React, {Component} from 'react';
import GameModel from "../game-guts/game-model";
import spaceship_small_blue from '../assets/spaceship_small_blue.png';


export default class Game extends Component {
   private canvas: any;
   private gameModel: GameModel;
   private spaceship: any; 
   private previousTime: number; 

   constructor(props: any){
      super(props);
      this.canvas = React.createRef()
      this.spaceship = React.createRef()
      this.previousTime = performance.now();
      this.state = {
         isGameOver: false,
         level: 1,
      }
   }  
   
   componentDidMount(){
      this.gameModel = new GameModel(this.canvas.current, this.buildImageArray())
      requestAnimationFrame(this.gameloop);
   }

   buildImageArray = () =>{
      let imageArray = [];
      imageArray.push({name: "spaceship", image: this.spaceship.current})
      return imageArray
   }

   gameloop = (gameTime: number) =>{
      let elapsedTime = gameTime - this.previousTime;
      this.previousTime = gameTime;
      this.gameModel.update(elapsedTime)
      this.gameModel.render();

      requestAnimationFrame(this.gameloop)
   }


   render(){
      return(
         <div>
            <canvas ref={this.canvas} width='1024' height='1024'></canvas>
            <img src={spaceship_small_blue} alt="spaceship" ref={this.spaceship} />
         </div>
      )
   }
}