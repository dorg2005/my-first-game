var bord=[],//לוח המשחק
    size=25,//גודל הריבועים
    extra=15; //מירכוז הטקסט לאמצע הריבוע
let m,//הגרלה של מיקום הפצצות
    counter,//כמות הפצצות מסביב למקום
    x,//כמות הריבעים בטור
    y,//כמות הריבועים בשורה
    winer,//ציליל ניצחון
    sound,//ציליל של פגיעה בפצצה
    n,//הגרלה של מיקום הפצצות
    mind,//כמות המוקשים
    boom,//תמונה של הפצצה
    marks,//תמונה במלבן הבחירה של הלסמן פצצה
    dig=true,//שימוש בחפירה
    mark=false,//שימוש בסימון
    digs,//תמונה במלבן הבחירה של החפירה
    game=true,//האם המשתמש עדיין במשחק או שהוא הפסיד
    level1=true,//באיזה רמה המשתמש בחור לשחק
    level2=false,//באיזה רמה המשתמש בחור לשחק
    level3=false,//באיזה רמה המשתמש בחור לשחק
    v=0,//
    open,//צליל של חשיפה של ריבוע
    music,//תמונה של צליל
    nomusic,//תמונה של מיוט
    sounds=true;//האם המשתמש רוצה מוזיקה של המשחק או לא
function preload(){    
  digs=loadImage("digs.jpg");
  marks=loadImage("marks.png");
  boom=loadImage("boom.jpg");  
  sound=loadSound("boom.mp4");
  winer=loadSound("win.mp4");
  open=loadSound("open.mp4");
  music=loadImage("music.jpg");
  nomusic=loadImage("nomusic.jpg");
}//הורדה של הצלילים ותמונות 
function setup() { 
  createCanvas(windowWidth,windowHeight);
  mind=round(random(round(((height/size)*(width/size)))/10,round(((height/size)*(width/size)))/15));//הגרלה של כמות הפצצות
  for(let i=0;i<(height/size)+10;i++){//יצירת לוח משחק דו מימדי עם עצם של קוביות    
    bord[i]=[];
    for(let j=0;j<(width/size)+10;j++){
      bord[i][j]=new Cub();
    }
  }
  for(let i=0;i<mind;i++){ //הגרלת המוקשים ללוח המשחק
    m=round(random(2,((height/size)-2))); 
    n=round(random(1,((width/size)-2)));
    while(bord[m][n].number=='X'){//כל עוד במקום יש כבר מוקש  
      m=round(random(2,((height/size)-2))); 
      n=round(random(1,((width/size)-2))); 
    } 
    bord[m][n].number='X'; //סימון משתנה
    bord[m][n].number2='X';//הסימון הקבוע
  }  
  for(let i=1;i<(height/size)-1;i++){//סימון המספרים במקומות ללא הפצצות
    for(let j=1;j<(width/size)-1;j++){
      if(bord[i][j].number!='X'){
        bord[i][j].number=hikef(i,j);//זימון הפעולה של כמות הפצצות מסביב למיקום
        bord[i][j].number2=hikef(i,j);//זימון הפעולה של כמות הפצצות מסביב למיקום
      }
    }
  }
}//דברים ראשוניים שקורים רק פעם אחת
function draw() {
  background(99,99,115);
  fill(255);
  textSize(15);
  text("level 1",width-55,20);
  text("level 2",width-55,38); 
  text("level 3",width-55,56);  
  drawoutside();//זימון פעולת הציור שלא קשור ללוח המשחק
  if(game==true){//אם השחקן עדיין במשחק
    for(let i=2;i<(height/size)-2;i++){//ציור לוח המשחק
      for(let j=1;j<(width/size)-1;j++){
        bord[i][j].show(i,j);//זימון פעולת הציור של הקוביה
      }
    }
  }
  else{//game==false//אם השחקן הפסיד
    for(let i=2;i<(height/size)-2;i++){//פתיחת כל הריבועים ולהחזיר להם את הסימון המקורי שלהם ולצייר אותם
      for(let j=1;j<(width/size)-1;j++){
        bord[i][j].set=true;  
        bord[i][j].number=bord[i][j].number2;
        bord[i][j].show(i,j); 
      }
    }
    frameRate(0.45);//לתת זמן לשחקן לראות את המסר
    textSize(width/9.25);
    fill(0,150,255);   
    stroke(0);   
    strokeWeight(12);
    text("GAME OVER\n     you lost",width/2-width/3.1,height/2);
    noStroke();
    if(sounds){//אם השחקן רוצה מוזיקה
      sound.play();
    }
    seting();//זימון פעולת רסיטרט למשחק
  }
  if((win1()||win2())&&game&&mind>=0){
    textSize(width/9.25);
    fill(0,150,255);
    stroke(0);   
    strokeWeight(12);
    text("GAME OVER\n    you won",width/2-width/3.1,height/2);
    fill(0,255,0);
    textSize(width/18);
    if(sounds){//אם השחקן רוצה מוזיקה
      winer.play();
    }
    frameRate(0.45);//לתת זמן לשחקן לראות את המסר
    seting();//זימון פעולת ריסטרט למשחק
  }
}//
function mousePressed(){
  y=round((mouseY-extra-size/2)/size);//מיקום ה Y של הלחיצה
  x=round((mouseX-size/2)/size);  //מיקום ה X  של הלחיצה
  if((touches.length===1)){//אם המשתמש לחץ
    if(mouseX>35&&mouseX<75&&mouseY>25&&mouseY<55){//אם מיקום הלחיצה הוא על הסאונד
      if(sounds==true){//שינוי הסימון של הסאונד
        sounds=false;
      }
      else{
        sounds=true;
      }
    }
    else{
      if(mouseX<width&&mouseX>width-55&&mouseY<20&&mouseY>0){//אם מיקום הלחיצה הוא על הרמה הראשונה
        level1=true;
        level2=false;
        level3=false;
        v=0;//
      }
      else{
        if(mouseX<width&&mouseX>width-55&&mouseY<38&&mouseY>20){//אם מיקום הלחיצה הוא על הרמה השנייה
           level1=false;
           level2=true;
           level3=false;
           v=0;//
        } 
        else{
          if(mouseX<width&&mouseX>width-55&&mouseY<56&&mouseY>38){//אם מיקום הלחיצה הוא על הרמה השלישית
             level1=false; 
             level2=false;
             level3=true;
             v=0;//
          } 
          else{
            if(mouseY>65){//אם הלחיצה היא על לוח המשחק
               if(dig){//אם השחקן רוצה לחפור
                 if(bord[y][x].number2=='X'){ //אם במקום הזה יש פצצה אז המשתמש הפסיד
                   game=false; 
                 }
                 else{//אם זה לא פצצה
                   if(bord[y][x].set==false){//אם המיקום עוד לא נפתח אז פותחים אותו
                     if(sounds){//אם השחקן רוצה מוזיקה
                       open.play();
                     }
                     bord[y][x].set=true;//פתיחה של המיקום 
                     if(bord[y][x].number==0){ //אם המקום הוא ללא פצצות מסביב אז פותחים את כול המסביב                                 
                       for(let r=1;r<height/size;r++){
                         for(let s=2;s<(height/size)-2;s++){
                           for(let p=1;p<(width/size)-1;p++){
                             if(bord[s][p].number==0&&bord[s][p].set){ 
                               for(let i=-1;i<2;i++){ 
                                 for(let j=-1;j<2;j++){ 
                                   bord[s+i][p+j].set=true; 
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }
                 }
               }
               else{//if(mark==true){ //אם השחקן רוצה לסמן
                 if(bord[y][x].set==false){//אם המקום עוד לא נפתח
                   bord[y][x].set=true;//פתיחת המקום 
                   bord[y][x].number='X';//שינוי הסימון המשתנה שלו ל פצצה
                   mind--;//הורדת כמות המוקשים שנשארו 
                 }
                 else{ //אם המקום היה פתוח כבר
                   bord[y][x].number=bord[y][x].number2;//החזרת הסימון הקבוע של הריבוע
                   bord[y][x].set=false;//סגירת המקום 
                   mind++; //הוספת כמות המוקשים שנשארו
                 }
               }
             }
           }
         }
       }
     }
  }
 }//מיקום הלחיצה ומשמעות
function hikef(i,j){
  counter=0;//כמות המוקשים שמסביב למקום
  for(let s=-1;s<2;s++){
    for(let g=-1;g<2;g++){
      if(bord[i+s][j+g].number=='X'){
        counter++; 
      }
    }
  }
  return counter;
}//מחזיר כמות הפצצות מסביב למיקום
function win1(){
  for(let i=0;i<(height/size)+1;i++){
    for(let j=0;j<(width/size)+1;j++){ 
      if(bord[i][j].number2=='X'&&bord[i][j].set==false){//אם במקום אחד שבו יש פצצה והיא לא פתוחה אז אין ניצחון עוד
        return false;
      }
    }
  }
  return true;
}//האם יש ניצחון בדרך אחת
function win2(){
  if(level1||level3){//אם הרמה היא אחד או שלוש
    for(let i=2;i<(height/size)-2;i++){
      for(let j=1;j<(width/size)-1;j++){ 
        if(bord[i][j].number2!='X'&&bord[i][j].set==false){ //אם באחד המקומות שאין בהם פצצה והוא לא פתוח אז אין עוד ניצחון
          return false;
        }
      }
    }
  }
  else{
    for(let i=2;i<(height/size)-3;i++){
      for(let j=1;j<(width/size)-2;j++){ 
        if(bord[i][j].number2!='X'&&bord[i][j].set==false){ //אם באחד המקומות שאין בהם פצצה והוא לא פתוח אז אין עוד ניצחון
          return false;
        }
      }
    }
  }
  return true;
}//האם יש ניצחון בדרך אחרת
function seting(){
  mind=round(random(round(((height/size)*(width/size)))/10,round(((height/size)*(width/size)))/15));//הגרלת כמות המוקשים
  for(let i=0;i<(height/25)+10;i++){//איפוס לוח המשחק 
    for(let j=0;j<(width/25)+10;j++){
      bord[i][j]=new Cub();
    }
  }
  for(let i=0;i<mind;i++){//הגרלת מוקשים ללוח המשחק
    if(level3){//אם בוא ברמה שלוש
      m=round(random(2,((height/size)-2))); 
      n=round(random(1,((width/size)-1)));
      while(bord[m][n].number=='X'){  
        m=round(random(2,((height/size)-2))); 
        n=round(random(1,((width/size)-1))); 
      }
      bord[m][n].number='X';
      bord[m][n].number2='X';
    }
    else{
      if(level1){//אם הוא ברמה אחד
        m=round(random(2,((height/size)-3))); 
        n=round(random(1,((width/size)-1)));
        while(bord[m][n].number=='X'){  
          m=round(random(2,((height/size)-3))); 
          n=round(random(1,((width/size)-1))); 
        }
        bord[m][n].number='X';
        bord[m][n].number2='X';
      }
      else{//אם הוא ברמה שתיים
        m=round(random(2,((height/size)-3))); 
        n=round(random(1,((width/size)-2)));
        while(bord[m][n].number=='X'){  
          m=round(random(2,((height/size)-3))); 
          n=round(random(1,((width/size)-2))); 
        }
        bord[m][n].number='X';
        bord[m][n].number2='X';
      }
    }
    for(let i=1;i<(height/size)-1;i++){//סימון המקומות שהם ללא פצצות במפר המתאים
      for(let j=1;j<(width/size)-1;j++){
        if(bord[i][j].number!='X'){
          bord[i][j].number=hikef(i,j);
          bord[i][j].number2=hikef(i,j);
        }
      }
    }
  }
  game=true;//החזרת השחקן למשחק
}//חידוש המשחק
function drawoutside(){
  if(level1){//אם השחקן ברמה 1
    size=50;
    v++;// 
    if(v<2){ 
      seting();//זימון חידוש המשחק
    }
    fill(0,255,0);
    text("level 1",width-55,20);
  } 
  else{  
    if(level2){//אם השחקן ברמה 2
      size=30;
      v++;//
      if(v<2){
        seting();//זימון חידוש המשחק
      }
      fill(0,255,0);
      text("level 2",width-55,38);  
    }
    else{ 
      if(level3){//אם השחקן ברמה 3
        size=25;
        v++;
        if(v<2){
          seting();//זימון חידוש המשחק
        }
        fill(0,255,0);
        text("level 3",width-55,56);
      }
    }
  }
  frameRate(255);
    if(dig){//אם השחקן בחר בלחפור
      fill(0,255,0);
      textSize(15); 
      text("ON",width/2-130,42); 
      fill(255,0,0);
      textSize(15); 
      text("OFF",width/2+105,43);
      fill(255);
      noStroke(0);
      textSize(10);
    }
    else{//mark==true//אם השחקן בחר לסמן
      fill(255,0,0);
      textSize(15); 
      text("OFF",width/2-135,42);
      fill(0,255,0);    
      textSize(15);     
      text("ON",width/2+105,43);
      fill(255);   
      noStroke(0);  
      textSize(10); 
    }
    text(mind+" booms left",2,20);    
    image(boom,2,25,30,30); 
    if(sounds){//אם השחקן רצה מוזיקה
      image(music,35,25,30,30);
    }
    else{//אם הוא לא רצה
      image(nomusic,35,25,30,30);
    }
    if(dig){//אם השחקן בחר לחפור
      fill(0,255,0);
    }
    else{//mark==true//אם השחקן בחר לסמן
      fill(255,0,0);
    }
    stroke(0); 
    strokeWeight(2);
    rect(width/2-100,10,100,50,25);
    fill(0);
    textSize(17);
    noStroke();  
    text("DIG",width/2-85,25,50,50);
    image(digs,width/2-45,15,25,35);
    if(mark){//אם השחקן רצה לסמן  
      fill(0,255,0);  
    }
    else{//dig==true//אם השחקן בחר לחפור
      fill(255,0,0); 
    }    
    stroke(0);  
    strokeWeight(2); 
    rect(width/2,10,100,50,25);
    fill(0); 
    noStroke();
    textSize(17);
    text("MARK",width/2+10,25,75,75);
    image(marks,width/2+60,15,25,35);    
    if(mouseX>width/2-100&&mouseX<width/2&&mouseY>10&&mouseY<60){//אם הלחיצה היא במיקום של החפירה 
      dig=true; 
      mark=false; 
    }
    else{
      if(mouseX>width/2&&mouseX<width/2+100&&mouseY>10&&mouseY<60){//אם הלחיצה היא במיקום של הסימון
        mark=true;  
        dig=false;  
      }
    }
}//ציור כל מה שהוא לא לוח המשחק