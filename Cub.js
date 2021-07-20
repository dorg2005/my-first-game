function Cub(){
  this.number=0;//סימון משתנה
  this.number2=0;//סימון קבוע
  this.set=false;//האם הריבוע נפתח או לא
  this.show=function(i,j){//ציור הריבוע
    if(this.set==false){//אם הריבוע עוד לא נפתח
      fill(200,215,205);
      strokeWeight(1);
      stroke(0);
      rect(size*j,size*i+extra,size,size,11);
    }
    else{//אם הריבוע כבר נפתח
      if(this.number=='X'){//אם הריבוע הוא פצצה או סומן כפצצה
       image(boom,size*j+2,size*i+2+extra,size-4,size-4);
      }
      else{//אם הוא לא פצצה כלומר מספר כלשהו
        fill(200,255,205);
        strokeWeight(1);
        stroke(0);
        rect(size*j,size*i+extra,size,size,11);
        fill(0);
        textSize(size/1.5);
        noStroke();
        text(this.number,size*j+size/2-size/5.5,size*i+size/4+extra,size,size);
      }
    }
  }
}