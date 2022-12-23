import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputNumber!: number | null;

  hintText: string = "Start Guessing to get Hint";

  NumberOfGuess: number = 0;

  ChosenNumber: number = this.getRandonNumber();
  
  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar) { }


  reset() {
    this.ChosenNumber = this.getRandonNumber();
    this.NumberOfGuess = 0;
    this.inputNumber = null; 

  }

  guess() {
    this.NumberOfGuess = this.NumberOfGuess + 1;

    if (this.inputNumber != null) {
      if (this.inputNumber == this.ChosenNumber) {
        this.hintText = "Correct";
        this._snackBar.open(this.hintText, 'OK',{
          duration:1000
        });
        this.openDialog();
      } else {
        if (this.inputNumber > this.ChosenNumber) {
          this.NumberIsHigh(this.inputNumber, this.ChosenNumber)
          this._snackBar.open(this.hintText, 'OK',{
            duration:1000
          });
        } else {
          this.NumberIsLow(this.ChosenNumber, this.inputNumber)
          this._snackBar.open(this.hintText, 'OK',{
            duration:1000
          });
        }
      }
    }
  }



  getRandonNumber(): number {

    let num= Math.floor(Math.random() * 1001);
    console.log(`chosen number :${num}`);
    return num
    
  }


  NumberIsHigh(Number1: number, Number2: number) {
    let diff = Number1 - Number2
    if (diff > 10) {
      this.hintText = "Your Guess is too High"
    } else {
      this.hintText = "Your Guess is High (pretty close)"
    }

  }


  NumberIsLow(Number1: number, Number2: number) {
    let diff = Number1 - Number2
    if (diff > 10) {
      this.hintText = "Your Guess is too Low"
    } else {
      this.hintText = "Your Guess is Low (pretty close)"
    }

  }


  openDialog(): void {
    let dialogRef = this.dialog.open(WinDialogue, {
      data: { number: this.ChosenNumber, guess: this.NumberOfGuess },
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(()=>{
      this.ChosenNumber=this.getRandonNumber()
      this.NumberOfGuess = 0;
      this.hintText = "Start Guessing to get Hint";
      this.inputNumber = null;
    })


  }
}

@Component({
  selector: 'WinDialogue',
  templateUrl: 'win-dialogue.component.html',
  styleUrls: ['./app.component.css']

})
export class WinDialogue {
  constructor(
    public dialogRef: MatDialogRef<WinDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
