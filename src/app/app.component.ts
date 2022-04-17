import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _ScreenType = ScreenType;
  _PlayerType = PlayerType;
  _Attack = Attack;
	
  _screenType: ScreenType = ScreenType.Start;
  _playerType: PlayerType = PlayerType.Unknown;
  
  _player: Player = {type: PlayerType.Person, name: '', wins: 0, attack: Attack.Unknown };
  _opponent: Player = {type: PlayerType.Unknown, name: '', wins: 0, attack: Attack.Unknown };
  _currentPlayer: Player = {type: PlayerType.Unknown, name: '', wins: 0, attack: Attack.Unknown };
  _winner: string = null;
  
  consructor(){}
  
  _newGame(): void{
	this._screenType = ScreenType.Versus;
  }
  
  _uploadSave(event: any): void{
	if (event.target.files.length !== 1) {
		console.error('No file selected');
	} else {
		const reader = new FileReader();
		reader.onloadend = (e) => {
			this._player = JSON.parse(JSON.parse(reader.result as string).player);
			this._opponent = JSON.parse(JSON.parse(reader.result as string).opponent);
			this._play();
		};
		reader.readAsText(event.target.files[0]);
	  }
  }
  
  _startGame(p: PlayerType): void{
	this._opponent.type = p;
	if(p === PlayerType.PC){
		this._opponent.name = 'Computer';
	}
	this._screenType = ScreenType.NameInput;
  }
  
  _play(){
	this._screenType = ScreenType.PickRPS;
	this._currentPlayer = this._player;
  }
  
  _chooseAttack(attack: Attack): void{
	  this._currentPlayer.attack = attack;
	  this._currentPlayer = this._opponent;
	  if(this._opponent.type == PlayerType.PC && this._opponent.attack == Attack.Unknown){
		  this._opponent.attack = this._getRandomAttack();
	  }
	  if(this._player.attack != Attack.Unknown && this._opponent.attack != Attack.Unknown){
		  this._fight();
	  }
  }
  
  _getRandomAttack(): Attack{
	  const ranInt = Math.floor(Math.random() * 3) + 1; 
	  switch(ranInt){
		  case 1:
			return Attack.Rock;
		  case 2:
			return Attack.Paper;
		  case 3:
			return Attack.Scissors;
		  default:
			return Attack.Rock;
	  }
  }
  
  _fight(): void{
	this._screenType = ScreenType.RoundEnd;

	if(this._player.attack == this._opponent.attack){
		this._winner = null;
	} else{
		switch(this._player.attack){
			case Attack.Rock:{
				if(this._opponent.attack == Attack.Paper){
					this._winner = this._opponent.name;
					this._opponent.wins++;
				} else if (this._opponent.attack == Attack.Scissors){
					this._winner = this._player.name;
					this._player.wins++;
				}
				break;
			}
			case Attack.Paper:{
				if(this._opponent.attack == Attack.Rock){
					this._winner = this._player.name;
					this._player.wins++;
				} else if (this._opponent.attack == Attack.Scissors){
					this._winner = this._opponent.name;
					this._opponent.wins++;
				}
				break;
			}
			case Attack.Scissors:{
				if(this._opponent.attack == Attack.Rock){
					this._winner = this._opponent.name;
					this._opponent.wins++;
				} else if (this._opponent.attack == Attack.Paper){
					this._winner = this._player.name;
					this._player.wins++;
				}
				break;
			}
		}
	}
	
	this._player.attack = Attack.Unknown;
	this._opponent.attack = Attack.Unknown;
	this._currentPlayer = this._player;
  }
  
  _saveGame(): void{
	console.log('');
	const obj: any = {player: JSON.stringify(this._player), opponent: JSON.stringify(this._opponent)};
	this.saveText( JSON.stringify(obj), "rps.json" );
  }
  
  saveText(text: any, filename: any){
	  const a = document.createElement('a');
	  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
	  a.setAttribute('download', filename);
	  a.click()
	}
  
}

export enum ScreenType{
	Start = 1,
	Versus = 2,
	NameInput = 3,
	PickRPS = 4,
	RoundEnd = 5,
	End = 6
}

export enum PlayerType{
	Unknown = 0,
	Person = 1,
	PC = 2
}

export enum Attack{
	Unknown = 0,
	Rock = 1,
	Scissors = 2,
	Paper = 3,
}

export interface Player{
	type: PlayerType;
	name: string;
	wins: number;
	attack: Attack;
}

