//forvo api key:b04a284c5d3bf50c72b78876cd8d5a1e
 var wordGame= angular.module('wordGame', []);


//this controller covers the main board functions
wordGame.controller('GameCtrl',['$scope','$interval',function($scope, $interval){
	
  var total_time=0; //holds value of time in total centiSecond. (1/10 sec)
  var timer=null; //varialble to hold the running timer
  $scope.game_phase="not_yet_started"; //not_yet_started stands for phase when game is yet to begin,vwaiting stands for waiting of game that will be on the begining of the game before game start triggered and at begining of new word when the original word'/hint is displaying., playing stands for running game , paused stands for paused mode of game 
	$scope.time_min=0;
  $scope.time_sec=0;
  $scope.time_csec=0;
  $scope.play_pause_button_text="Pause";
  $scope.current_word_index=0;
  $scope.total_score=0;
  $scope.words=[{ spell:"actor", mean:"A one who act in drama"}, { spell:"addition",mean:"Summation of any thing" }, { spell:"admire",mean:"To praise something or somebody for work." }, { spell:"apple",mean:"A rounded fruit with red color." }, { spell:"April",mean:"A month that comes after March and before  May."}, { spell:"august",mean:"A month that comes after July and before September." }, { spell:"beautiful",mean:"Thing which is visibly nice " }, { spell:"blue", mean:"A color of sky" }, { spell:"cabbage", mean:"A cultivated plant eaten as a vegetable, having thick reen or purple leaves surrounding a spherical heart or head of young leaves." }, { spell:"camera", mean:"An instrument used to capture the picture" }, { spell:"car", mean:"A vehicle with four tyres" }, { spell:"carrot", mean:"A tapering orange-coloured root eaten as a vegetable. " }, { spell:"choice",mean:"Selection between two or more options" }, { spell:"church",mean:"Holy place for Catholic people" }, { spell:"cloth", mean:"A fibre made thing that can wear" }, { spell:"complex", mean:"Something which is not simple in usual way" }, { spell:"contact", mean:"A person or industrial body in touch"}, { spell:"cook",mean:"To prepare food with the use of fire" }, { spell:"cow",mean:"A holy animal for Hindu, gives milk as well" }, { spell:"cricket",mean:"A game played with bat and ball" }, { spell:"crime",mean:"An unlawful act punishable by a state" }, { spell:"daily",mean:"Some action that is performed every day"  }, { spell:"December",mean:"Last month of the Year" }, { spell:"dentist", mean:"Doctor that gives treatment of teeth related problem" }, { spell:"doctor", mean:"The one who treat some sick person or animal" }, { spell:"dollar", mean:"American currency" }, { spell:"door", mean:"A place from where entry is taken to any building" }, { spell:"easy",mean:"Things that can be done with out any special efforts" }, { spell:"elephant", mean:"A big animal with huge ear and trunk" }, { spell:"eraser", mean:"Thing which can rubout the note written by pencil" }, { spell:"eye",mean:"Part of human body which enable a one to see around the world" }, { spell:"February", mean:"A month that comes after January and before March" }, { spell:"Friday",mean:"A day of week which comes after Thursday" }, { spell:"giraffe",mean:"An animal with tall neck" }, { spell:"gun",mean:"A weapon which fires bullet and shoots target" }, { spell:"hair", mean:"A filament that comes out from human body" }, { spell:"heaven", mean:"A place which give pleasure of paradise" }, { spell:"hockey",mean:"National game of India" }, { spell:"house",mean:"A building where human live" }, { spell:"January",mean:"First month of the Year" }, { spell:"July",mean:"A month that comes after June and before August" }, { spell:"June",mean:"A month that comes after May and before July" }, { spell:"knife",mean:"A tool that used to cut vegetables" }, { spell:"lamp", mean:"A light source that gives low intense light" }, { spell:"lawyer", mean:"A person who has knowledge of law of Nation" }, { spell:"leader",mean:"A one who leads any team or political party or organization" }, { spell:"march", mean:"A month that comes after February and before April" }, { spell:"may", mean:"A month that comes after April" }, { spell:"member", mean:"A person who is part of any team" }, { spell:"Monday", mean:"The day of week comes after Sunday " }, { spell:"monkey",mean:"An animal that can jump from tree to tree" }, { spell:"moon",mean:"A natural satellite of earth, clearly visible at night " }, { spell:"mother",mean:"Person who gave birth" }, { spell:"mountain",mean:"A big piece or collection of rock, hard to climb" }, { spell:"museum", mean:"A place where old and precious things are kept and cared" }, { spell:"noise", mean:"The situation which created by unwanted sounds" }, { spell:"notebook",mean:"A thing created by binding the blank papers together" }, { spell:"November",mean:"A month which comes after October and before December" }, { spell:"occasion", mean:"An event of celebration" }, { spell:"October", mean:"A month that comes after September and before November" }, { spell:"office", mean:"Work place of any organization" }, { spell:"orange", mean:"Name of color which is found on fruit of that name." }, { spell:"owner", mean:"The person who owns the property or thing" }, { spell:"paper", mean:"A flat thin thing on which writing or printing is done" }, { spell:"phone", mean:"Electronic instrument which enables communication" }, { spell:"poison", mean:"Things which are unexpected and dangerous to human body" }, { spell:"pollution", mean:"Situation generation due to Unwanted environmental activity" }, { spell:"poor", mean:"The person with less money" }, { spell:"purse", mean:"A container that is used to keep small important things" }, { spell:"quite", mean:"The place with no noise or voice" }, { spell:"relax",mean:"Sleep or do nothing after a period of activity " }, { spell:"request", mean:"To ask for something or ask somebody to do something in a polite or formal way" }, { spell:"rice",mean:"A cooking variety that with small white piece" }, { spell:"rope",mean:"Very strong thick string made by twisting thinner strings" }, { spell:"rush",  mean:"A situation in which you are in a hurry and need to do things quickly" }, { spell:"salad",  mean:"A mixture of raw vegetables" }, { spell:"satisfaction",mean:"The good feeling that you have when you have achieved something " }, { spell:"Saturday",  mean:"A day of week that comes before Sunday"}, { spell:"school",  mean:"A place where Student goes for education" }, { spell:"scissors", mean:"Tool for cutting paper or cloththat has two sharp blades with handlesjoined together in the middle" }, { spell:"score", mean:"To win points goals etc. in a game or competition" }, { spell:"seek", mean:"To look for something" }, { spell:"September",mean:"A month that comes after August and before October" }, { spell:"shirt",mean:"A piece of clothing, worn on the upper part of the body" }, { spell:"short", mean:"Object with less height" }, { spell:"shoulder", mean:"Either of the two parts of the body between the top of each arm and the neck" }, { spell:"signal", mean:"To make a movement or sound to give somebody a message, an order" }, { spell:"soccer", mean:"A game played by hitting ball by foot" }, { spell:"soldier",  mean:"A member of an army" }, { spell:"square",mean:"A shape with four same sides and same angels" }, { spell:"stream", mean:"A small narrow river" }, { spell:"Sunday",mean:"Day of week which comes before Monday" }, { spell:"table",mean:"A piece of furniture that consists of a flat top supported by legs" }, { spell:"television",mean:"Electrical equipment with a screen on which you can watch programmes with moving pictures and sounds" }, { spell:"temple",mean:"Holy place of Hindu where they go for prayer" }, { spell:"theatre", mean:"A building or an outdoor area where plays and similar types of entertainment are performed" }, { spell:"thief",mean:"A person who steals something from another person or place" }, { spell:"thumb", mean:"The short thick finger at the side of the hand, slightly apart from the other four" }, { spell:"Thursday",mean:"Day of Week that comes before Friday" }, { spell:"Tuesday",mean:"Day of week that comes after Monday" }, { spell:"umbrella", mean:"An object with a round folding frame of long straight pieces of metal covered with material, that you use to protect yourself from the rain or from hot sun" }, { spell:"unique", mean:"Being the only one of its kind" }, { spell:"vacation", mean:"Bunch of / collection  holidays" }, { spell:"wallet", mean:"A small flat folding case made of leather or plastic used for keeping paper money and credit cards in" }, { spell:"watch", mean:"An electrical instrument that shows time" }, { spell:"water", mean:"A liquid important for human body" }, { spell:"Wednesday",mean:"A day of week that comes after Tuesday" }, { spell:"whistle",mean:"To make a high sound or a musical tune by forcing your breath out when your lips are closed" }, { spell:"window", mean:"A hole of home that allows exchange of air with outside" }, { spell:"worship",  mean:"To go to a service in a religious building" }, { spell:"Zebra", mean:"An animal with black and white strips" }]; 
  $scope.total_words=$scope.words.length; 
	var suffle_array=function(array){

		var currentIndex = array.length
				 , temporaryValue
				 , randomIndex;
    console.log("suffle_array fired");
      // While there remain elements to shuffle...
		while (0 !== currentIndex) {

	  // Pick a remaining element...
		  randomIndex = Math.floor(Math.random() * currentIndex);
		   currentIndex -= 1;
       if(currentIndex==1)
        array[0].spell=array[0].spell.trim().toUpperCase();
       array[currentIndex].spell=array[currentIndex].spell.trim().toUpperCase();
	  // And swap it with the current element.
			 temporaryValue = array[currentIndex];
			 array[currentIndex] = array[randomIndex];
			 array[randomIndex] = temporaryValue;
		}
	};

	start_timer=function(){
    console.log("start_timer fired");
		if(timer==null)
     {
        timer= $interval(function() {
    			total_time+=1;
    			$scope.time_csec=total_time%10;
    			$scope.time_sec=Math.floor(total_time/10)%60;
    			$scope.time_min=Math.floor(total_time/600);
          $scope.$broadcast('update_progress_bar',total_time);
    		},100);
    } 
	};

  
  stop_timer=function(){
    console.log("pause_timer fired");
    if(timer!=null){
      $interval.cancel(timer);
      timer=null;
    }
  };

  play_it=function(){
      start_timer();
      $scope.game_phase="playing";
      $scope.$broadcast('resume_up_tile');
      $scope.$broadcast('add_active_to_progressbar',total_time);
      $scope.play_pause_button_text="Pause";

  };

  pause_it=function(){
    stop_timer();
      $scope.game_phase="paused";
      $scope.$broadcast('turn_tile_blank');
      $scope.$broadcast('remove_active_of_progressbar');
      $scope.$broadcast('reset_progress_bar');
      $scope.play_pause_button_text="Resume";
  };
  $scope.play_pause=function(){
    console.log("play_pause fired");
    var e=document.getElementById("play_pause_btn");
    if($scope.game_phase=="paused"){
        $scope.flip(e,"btn_play");
        e.className=e.className.replace(" btn-success"," btn-warning");
          e.innerHTML=' <font size="5px"><span class="glyphicon glyphicon-pause" ></span><font color="#2E2E2E">Pause</font></font>';
        play_it();
    }

    else if($scope.game_phase=="playing")
    {
      $scope.flip(e,"btn_pause");
      e.className=e.className.replace(" btn-warning"," btn-success");
          e.innerHTML='<font size="5px"><span class="glyphicon glyphicon-play" ></span><font color="#2E2E2E">Play</font></font>';
      pause_it();
    }
   
  };

  $scope.$watch('game_phase',function(){
    $scope.$broadcast('accept_phase',$scope.game_phase);
  });

  $scope.start_game=function(){
    console.log("start_game fired");
    suffle_array($scope.words);
    $scope.game_phase="playing";
    start_timer();
    $scope.current_word_index=0;
    //fire a call to wordCtrl
    $scope.$broadcast('start_game_from_0');
  };

  $scope.terminate_game=function(){
    alert("Hellow, your word score is:"+ $scope.total_score+ "\n\nReport this score before closing this");
      location.reload();
  }

  $scope.get_word_at=function(index){
    return $scope.words[index];
  };

  $scope.flip=function(e,type)
    {
          var time_req='0.4'

          switch (type){
          case "true":
            flip_color='#ABD0A5';     
            break;

          case "false":
            flip_color='#D0A5A5';
            break;
          case "reset":
            flip_color="#6884CC";
            break;

          case "pause":
            flip_color="silver";
            break;
          case "hint":
            flip_color="#64A55A";
            break;
          case "btn_pause":
            flip_color="#ABD0A5"
            break;
          case "btn_play":
            flip_color="#f0ad4e"
            break;
          case "btn_start":
            flip_color="#ABD0A5"
            break;
          case "word_conter":
            flip_color="#e1e1e1"
            break;
          }
            e.style.background=flip_color;   
            if (e.style.webkitAnimationName != 'flip_tile') {
                e.style.webkitAnimationName = 'flip_tile';
                e.style.webkitAnimationDuration = time_req+'s';
                if(type!="btn_pause" && type!="btn_play")
                e.style.background=flip_color;   
                setTimeout(function() {
                   e.style.webkitAnimationName = '';
                },time_req*1000);
            }
        };

  //Filp the image div and set the new  image for new word.
    $scope.show_word=function()
    {
      var hint_place=document.getElementById("hint_place");
      $scope.flip(hint_place,"hint");
      $scope.show_hint(2);
      pause_it();
      $scope.game_phase="waiting";
      setTimeout(function(){$scope.game_phase="playing";hide_hint();var e=document.getElementById("play_pause_btn");e.disabled=false;play_it();},2000);
    }
//If game is in playing mode. It Displays a correct word on hint tile. 
     //If game is paused , Game is not suppose to showup a word.
    $scope.show_hint=function(seconds)
     {  
      var e=document.getElementById("hint_place");console.log("show_hint fired");        
     
      if($scope.game_phase=="playing" || $scope.game_phase=="waiting") 
      { e.style.lineHeight="40px";
        e.innerHTML='<font size="5px" color="silver">Word is:</font><br/><font size="8px" color="white"><b>'+$scope.words[$scope.current_word_index].spell+'</b></font>';
        $scope.$broadcast('speak',$scope.words[$scope.current_word_index].spell);
      }
      else if($scope.game_phase !="not_yet_started")
      {
      e.style.lineHeight="40px";
      e.innerHTML="<font size='5px' color='white'><br/>Game Paused <br/><small>Click 'play' button to resume</small></font>";
      }
      setTimeout(function(){hide_hint();},(seconds)*1000);
     };

     //Flip the hint tile and hide the hint on it.
     function hide_hint()
     {
      if($scope.game_phase !='not_yet_started')
      {
      var e=document.getElementById("hint_place");
      e.style.lineHeight="18px";
      e.innerHTML='<font size="4px" color="silver"><p style="margin-bottom:5px;">Spell a word that stands for following meaning</font><br/></p><font size="5px" color="white">'+$scope.words[$scope.current_word_index].mean+'</font><font color="#e1e1e1" size="4px"><br/><div id="show_hint_div class="show_word_box"> <button id="show_word_box" type="button" class="btn btn-warning btn-lg show_word_box" onclick="show_hint_up(1.5);" onmouseover="show_hint_up(1.5);"><font size="4px><span class="glyphicon glyphicon-info-sign" ></span><font color="#2E2E2E">Find your word here...</font></font></button></div>';    
      $scope.flip(e,"hint");

      }
     }
     show_hint_up=function(time){
      console.log("in show_hint_up with phase"+$scope.game_phase);

      $scope.show_hint(time);

      
     }
  $scope.$on('flip',function(event,element,type){
    $scope.flip(element,type);
  });
  $scope.$on('up_score_by',function(event,char_score){
    $scope.total_score+=char_score;
  });

  $scope.$on('get_current_time',function(event,type){
    if(type=="start_time"){
      console.log("sending start time:"+total_time);
      $scope.$broadcast('accept_start_time',total_time);}
    
    else if(type=="end_time"){
      console.log("sending end time:"+total_time);
      $scope.$broadcast('accept_end_time',total_time);}
  });

  $scope.$on('update_my_phase',function(event){
    
  });
}]);
//This scope is child scope of the GameSession. Will handle the operations at level of words,

wordGame.controller('WordCtrl',['$scope',function($scope){
    var current_char_index;
    var current_spell;
    var speak_lock=false;
    var my_frame=document.getElementById("audio_frame");
    load_word=function(){
      current_spell=$scope.$parent.words[$scope.$parent.current_word_index].spell;
     // speak(current_spell);
      console.log("load_new_word fired with word "+current_spell);
      current_char_index=0;
      $scope.$parent.show_word();
      setTimeout(function(){load_subword()},2000);
    } 


    speak=function(word,time)
    {
      var lock_period;
      if(time==0)
        lock_period=800;
      else
        lock_period=time*(word.length)/2;
      if(!speak_lock){
        speak_lock=true;
      my_frame.src="http://translate.google.com/translate_tts?tl=en&q="+word;
      setTimeout(function(){speak_lock=false;},lock_period);
      }
    }

    load_subword=function(){ 
        var sub_word=current_spell.slice(0,current_char_index+1);
        console.log(sub_word);
        $scope.$broadcast('prepare_board_for',sub_word);
    };

    

    word_done=function(){
      
      if(++$scope.$parent.current_word_index==$scope.$parent.words.length){
        $scope.$parent.terminate_game();
        }
      else{
        load_word();
      }
    };

    $scope.$on("char_done",function(event){
      current_char_index++;
      if(current_char_index==current_spell.length)
      {
        word_done();
      }
      else
      {
        load_subword();
      }  
    });

    $scope.$on('start_game_from_0',function(event){
      load_word();
    });

    $scope.$on('speak',function(event,word){
      speak(word,0);
    });

    $scope.$on('speak_chars',function(event){
        var word=current_spell;
        word=word.split("").join("-");
        speak(word,350);
    });

}]);
















//This scope is child scope of the WordSession. Will handle the operations at level of character,

wordGame.controller('CharCtrl',['$scope',function($scope){
var sub_word='';
var char_time_start=0,char_time_end=0;
$scope.time_diff=0;
$scope.tile=['','','','','','','','',''];
$scope.phase;

  prepare_board_for_subword=function(){
    $scope.$emit('get_current_time','start_time');
    $scope.tile=get_options_for_subword();
    turn_all_tile("reset");
  };


  get_options_for_subword=function(){
    var random_list=sub_word.charAt(sub_word.length-1);
      while (random_list.length<9)
        random_list=random_list+get_new_valid_char(random_list);
      return get_joined_option_array(sub_word,random_list.shuffle());
  };

  get_new_valid_char=function(random_list)
    {
      var temp_char,temp_ascci;
      while (true)
      {
        temp_ascci=Math.floor(Math.random()*25+65);
        temp_char=String.fromCharCode(temp_ascci);
        if(random_list.indexOf(temp_char)==-1)  
          return temp_char;
      }
     };

  String.prototype.shuffle = function ()
    {
      var a = this.split(""),
            n = a.length;
          for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
          }
        return a.join("");
    };

  get_joined_option_array=function(sub_word,random_list)
    {
      var subword_options=[],new_word;
      for(var i=0;i<9;i++)
      { 
        new_word=sub_word.slice(0,sub_word.length-1)+random_list.charAt(i);
        subword_options.push(new_word);
      }
      return subword_options;
    };


    $scope.check_me=function(id){
      console.log("Phase found is:"+$scope.phase);
      if($scope.phase=="playing"){
      if($scope.tile[id]==sub_word)
       { 
      $scope.$emit('flip',document.getElementById(id),"true");
      setTimeout(function(){
        char_done();},500);}
      else{
      $scope.$emit('flip',document.getElementById(id),"false");
      $scope.$emit('speak_chars');
      }    
      }    
    };

    //When some tile is clicked,it checks if the clicked tile is correct tile or not.
    //If its correct, will flip true and new set of character will be loaded 
    //if its not correct then, it will flip false and set red.
 
    //returns a score for character 
    //will be calculated on bases of start and end time
    function get_char_score()
    {
      $scope.time_diff = char_time_end - char_time_start;
      if($scope.time_diff<=20)
        return 100;
      else if($scope.time_diff<=38)
        return 70;
      else if($scope.time_diff<=56)
        return 30;
      else
        return 10;
    }

  char_done=function(){
    //console.log("charCtrl->char_done()");
    $scope.$emit('get_current_time','end_time');
    //console.log(char_time_end +" vs "+ char_time_start);
    $scope.$emit('up_score_by',get_char_score());
    $scope.$emit('char_done');
  };



  //set the progress bar as per the time goes on.
    update_progress_bar=function(total_time)
      {
        var diff=total_time - char_time_start;
        var bar,percent;
        if(diff<18)
        {
          bar=document.getElementById("bar_one");
          document.getElementById("bar_two").style.width="28%";
          document.getElementById("bar_three").style.width="28%";
          percent=30*(17-diff)/18;
          //console.log(percent);
          bar.style.width=percent+"%";
        }
        else if(diff<=36)
        {
          diff=diff-18;
          bar=document.getElementById("bar_two");
          document.getElementById("bar_three").style.width="28%";
          percent=30*(17-diff)/18;
          bar.style.width=percent+"%";
        }

        else if(diff<=54)
        {
          diff=diff-36;
          bar=document.getElementById("bar_three");
          percent=30*(18-diff)/18;
          bar.style.width=percent+"%";
        }
      }

  //reset the progress bar to 100 points
   reset_progress_bar=function(){
    document.getElementById("bar_two").style.width="28%";
    document.getElementById("bar_three").style.width="28%";
    document.getElementById("bar_one").style.width="28%";
    document.getElementById("bar_four").style.width="16%";
   }

  //adds the activeness to progress bar
    add_active_to_progressbar=function()
    {
      document.getElementById("bar_one").className+=" progress-bar-striped active";
      document.getElementById("bar_two").className+=" progress-bar-striped active";
      document.getElementById("bar_three").className+=" progress-bar-striped active";
      document.getElementById("bar_four").className+=" progress-bar-striped active";
    }

  //this function stops the time bar from moving strips
    remove_active_of_progressbar=function()
    {
      document.getElementById("bar_one").className="progress-bar progress-bar-success my_bar";
      document.getElementById("bar_two").className="progress-bar progress-bar-info my_bar";
      document.getElementById("bar_three").className="progress-bar progress-bar-warning  my_bar"
      document.getElementById("bar_four").className="progress-bar progress-bar-danger  my_bar"
    }

turn_all_tile=function(type){
  for(var i=0;i<9;i++){
    var id=''+i;
    $scope.$emit('flip',document.getElementById(id),type);
  }
};

//apllies hover effect to child
    child_hover=function(e)
    {
      if($scope.phase=="playing")
      {
        e.style.color="#E2E2E2";
        e.style['-webkit-box-shadow'] = "2px 2px 3px #2E2e2e";
      }
    } 

    //Removes the hover effect after mouse is out
    child_mouse_out=function(e)
    {
        e.style.color="white";  
        e.style.textDecoration='none';
        e.style['-webkit-box-shadow'] = "none"; 
    }

  $scope.$on('turn_tile_blank',function(event){
    $scope.tile=['','','','','','','','',''];
    turn_all_tile("pause");
  });

  $scope.$on('resume_up_tile',function(event){
    prepare_board_for_subword();
  });

  $scope.$on('prepare_board_for',function(event,temp_sub_word){
    console.log("catch prepare_board_for "+temp_sub_word);
    sub_word=temp_sub_word;
    prepare_board_for_subword();
  });

  $scope.$on('accept_start_time',function(event,time){
    
    char_time_start=time;
    console.log("start time set as "+char_time_start);
  });

  $scope.$on('accept_end_time',function(event,time){
    char_time_end=time;
  });

  $scope.$on('reset_progress_bar',function(event){
    reset_progress_bar();
  });


  $scope.$on('update_progress_bar',function(event,total_time){
    update_progress_bar(total_time);
  });


  $scope.$on('remove_active_of_progressbar',function(event){
    remove_active_of_progressbar();
  });

  $scope.$on('add_active_to_progressbar',function(event){
    add_active_to_progressbar();
  });

  $scope.$on('accept_phase',function(event,current_pahse){
    $scope.phase=current_pahse;
  });
}]);


