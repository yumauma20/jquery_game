var bom = [9,9,1]; //[ブロックの行数,ブロックの列数,爆弾の数]
var bomPosi = [];
var gameFlg = true;

function addBlock(){
  for(i = 0; i < bom[0]*bom[1];i++){
    $('<div></div>').appendTo('#stage');
  }
}

function addBom(){
  for(i = 0; i < bom[2]; i++){
    while(true){
      var randomNum = Math.floor(Math.random()*(bom[0]*bom[1]+1));
      if(!bomPosi.includes(randomNum)){ //配列bomPosiにrandomNum(同じ数字)が含まれていなかったら
        bomPosi.push(randomNum);//配列bomPosiにrandomNum追加
        $('#stage div').eq(randomNum).addClass('bomb');
        break;
      }
    }
  }
}

//周囲の爆弾チェック
function checkBom(n){
  var countBom = 0;
 
  //一番左端でなければ
  if(( n % bom[1] ) != 0){
    //左チェック
    if($('#stage div').eq(n-1).hasClass('bomb')){
      countBom ++;
    }
    //一番上端でなければ
    if( n >= bom[1]){
      //左上チェック
      if($('#stage div').eq(n-bom[1]-1).hasClass('bomb')){
        countBom ++;
      }
    }
    //左下チェック
    if($('#stage div').eq(n+bom[1]-1).hasClass('bomb')){
      countBom ++;
    }
  }
  //一番右端でなければ
  if(( n % bom[1] ) != bom[1]-1){
    //右チェック
    if($('#stage div').eq(n+1).hasClass('bomb')){
      countBom ++;
    }
    //一番上端でなければ
    if( n >= bom[1]){
      //右上チェック
      if($('#stage div').eq(n-bom[1]+1).hasClass('bomb')){
        countBom ++;
      }
    }
    //右下チェック
    if($('#stage div').eq(n+bom[1]+1).hasClass('bomb')){
      countBom ++;
    }
  }
  //一番上端でなければ
  if( n >= bom[1]){
    //上チェック
    if($('#stage div').eq(n-bom[1]).hasClass('bomb')){
      countBom ++;
    }
  }
  //下チェック
  if($('#stage div').eq(n+bom[1]).hasClass('bomb')){
    countBom ++;
  }
  return countBom;
}

//ゲームオーバー時の処理
function gameover(){
  $('.bomb').html('<i class="fas fa-bomb"></i>');  //.bombのタイルに爆弾を表示させる
  $('.bomb').css('background-color','#ffff00');  //.bombの背景色を変更
  alert("ゲームオーバー！");
  gameFlg = false;   //ゲーム進行の変数をfalseに
}

//ゲームクリアのチェック
function clearCheck(){
  var cnt = $(".open").length;//現在開かれているタイル数を調べる
  if(cnt >= (bom[0]*bom[1]-bom[2])){
    alert('クリアー')
    gameFlg = false;
  }
}

$(function(){
  $('#stage').width(bom[1]*20);
  addBlock();
  addBom();

  //タイルクリックしたら
  $('#stage div').on("click",function(){
    if(gameFlg == true){
      var index = $('#stage div').index(this);//クリックしたタイルの順番取得
      var countBom = checkBom(index); //周囲の爆弾数を調べcountBomに代入
      $(this).addClass('open');//クリックしたタイルにopen付与
      $(this).text(countBom);//タイルに周囲の爆弾数を表示
      clearCheck();
    }
  });

  //爆弾のタイルをクリックしたら
  $('.bomb').on("click",function(){
    if(gameFlg == true){
      gameover();
    }
  });
});