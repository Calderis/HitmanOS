(function() {
	/* CONNECTION TO socket.io */
	//var socket = io.connect('http://141.138.157.108:4445');//Online
	var socket = io.connect('http://localhost:4444');//Offline
    var app = angular.module('Hack', ["ngSanitize"]).directive("keyboard", keyboard);
	
	
    /************ MAIN / APP ***********/
    app.controller("appController", function($scope, $http, $timeout, $compile, $sce) {
		
		
        /* DRAGGABILLY */
		this.$draggable = "";
		
		/* LOGS */
		$scope.logs = [];
		function addLogs(msg){
			$scope.logs.push(msg);
		}

		/* NAVIGATION */
		$scope.nav = {
			focus : "login",
			windows : {}
		}
		this.addWindow = function(name){
			$scope.nav.windows[name] = $("#"+name);
			$draggable = $('.mini-windowed').draggabilly({
			  handle: '.grab'
			});
			$scope.nav.windows[name].click(function(){
				console.log(this);
				$scope.nav.focus = name;
			});
		}
		$scope.showWindow = function(name){
			$scope.nav.windows[name].show();
			$scope.nav.windows[name].removeClass("closed");
		}
		$scope.closeWindow = function(name){
			$scope.nav.windows[name].addClass("closed");
			$timeout(function(){$scope.nav.windows[name].hide()},1000);
		}
		/****** CLAVIER *****/
		this.keys = {
			ZERO : function(name, code) { tip(code); },
			ONE : function(name, code) { tip(code); },
			TWO : function(name, code) { tip(code); },
			THREE : function(name, code) { tip(code); },
			FOUR : function(name, code) { tip(code); },
			FIVE : function(name, code) { tip(code); },
			SIX : function(name, code) { tip(code); },
			SEVEN : function(name, code) { tip(code); },
			HEIGHT : function(name, code) { tip(code); },
			NINE : function(name, code) { tip(code); }
		  };
		function tip(code){
			if($scope.nav.focus == "login") tipCode(code)
		}
		
		/****** LOGIN *****/
		$scope.login = reset();
		$scope.access = false;
		
		function reset(){
			return [
			{value : "", class : ""},
			{value : "", class : ""},
			{value : "", class : ""},
			{value : "", class : ""},
			{value : "", class : ""},
			{value : "", class : ""},
			{value : "", class : ""}];
		}
		
		var tipCode = function(code){
			switch(code){
				case 48:  number = 0; break;
				case 49:  number = 1; break;
				case 50:  number = 2; break;
				case 51:  number = 3; break;
				case 52:  number = 4; break;
				case 53:  number = 5; break;
				case 54:  number = 6; break;
				case 55:  number = 7; break;
				case 56:  number = 8; break;
				case 57:  number = 9; break;
				case 96:  number = 0; break;
				case 97:  number = 1; break;
				case 98:  number = 2; break;
				case 99:  number = 3; break;
				case 100: number = 4; break;
				case 101: number = 5; break;
				case 102: number = 6; break;
				case 103: number = 7; break;
				case 104: number = 8; break;
				case 105: number = 9; break;
			}
					
			for(var i = 0; i< $scope.login.length; i++){
				if($scope.login[i].value == ""){
					$scope.login[i].value = number;
					$scope.login[i].class = "active";
					
					if(i == 6) {
						if($scope.login[0].value == 2 && $scope.login[1].value == 2 && $scope.login[2].value == 2 && $scope.login[3].value == 5 && $scope.login[4].value == 3 && $scope.login[5].value == 6 && $scope.login[6].value == 1) {
							$scope.access = true;
							addLogs("Access Granted. Welcome Master!");
							$timeout(function(){
								$scope.login = reset();
								$scope.closeWindow("login");
								$scope.startDesktop();},1000);
								
						} else {
							addLogs("Access refused.");
						}
						$timeout(function(){$scope.access = false;$scope.login = reset()},2000);
					}
					break;
				}
			}
		}
		
		
		/*** GENERATION OF WINDOWS ***/
		$scope.windows = []; // ref all windows
		var maxIndex = 0;
		function createWindows(title, x, y, width, height, content, anchor){
			this.id = $scope.windows.length;
			this.title = title;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.content = content || null;
			this.anchor = anchor || "desktop";
			
			this.remove = function(){
				this.elmnt.className += " closed"; 
				setTimeout(function(){this.elmnt.parentElement.removeChild(this.elmnt);},800);
			}
			this.minimized = function(){
				
			}
			
			this.elmnt = document.createElement("section");
			this.elmnt.className = "mini-windowed";
			this.elmnt.id = this.title;
			
			this.elmnt.style.height = this.height+"px";
			this.elmnt.style.width = this.width+"px";
			
			
			
			this.elmnt.innerHTML = '<header class="grab"><h1>'+this.title+'</h1><ul class="actions"><li ng-click="windows['+this.id+'].minimized()">-</li><li ng-click="windows['+this.id+'].remove()">x</li></ul></header><section class="content" ng-bind-html="windows['+this.id+'].content"></section>';
			angular.element(document.getElementById(this.anchor)).append($compile(this.elmnt)($scope));
			
			this.elmnt = document.getElementById(this.title);
			2
			this.elmnt.style.top = this.y+"px";
			this.elmnt.style.left = this.x+"px";
			
			$draggable = $('.mini-windowed').draggabilly({
			  handle: '.grab'
			});
			$draggable.on("dragStart",function(event, pointer){
				maxIndex++;
				event.target.style.zIndex = maxIndex;
			});
			
			return this;
		};
		
		
		//Once we are authentificated
		$scope.startDesktop = function(){
			
			$scope.windows.push(new createWindows("ProgrammTest", 100, 200, 300, 300, document.createElement("textarea")));
		}
		//$scope.windows.push(new createWindows("test", 100, 200, 300, 300, "<p>Test123</p>"));
    });

   




    /**** DIRECTIVES ****/
    app.directive("login", function() {
        return {
            restrict: 'E',
            templateUrl: "public/parts/login.ejs"
        };
    });
	function keyboard($document, keyCodes) {
	  return {
		link: function(scope, element, attrs) {

		  var keysToHandle = scope.$eval(attrs.keyboard);
		  var keyHandlers  = {};

		  // Registers key handlers
		  angular.forEach(keysToHandle, function(callback, keyName){
			var keyCode = keyCodes[keyName];
			keyHandlers[keyCode] = { callback: callback, name: keyName };
		  });

		  // Bind to document keydown event
		  $document.on("keydown", function(event) {

			var keyDown = keyHandlers[event.keyCode];

			// Handler is registered
			if (keyDown) {
			  event.preventDefault();

			  // Invoke the handler and digest
			  scope.$apply(function() {
				keyDown.callback(keyDown.name, event.keyCode);
			  })
			}
		  });
		}
	  };
	}
})();