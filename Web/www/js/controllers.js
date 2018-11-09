angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('plantCtrl', function($scope, $state, $rootScope, PlantEdit) {
    $scope.list = [{text:"Farm1",time:"12:00",index:0},{text:"Farm2",time:"9:00",index:1},{text:"Farm3",time:"15:00",index:2}];
	$rootScope.$on('add', function() {
		var data = PlantEdit.get();
		data["index"] = $scope.list.length;
        $scope.list.push(data);
		console.log($scope.list);
    });
	$rootScope.$on('edit', function() {
		var data = PlantEdit.get();
        $scope.list[data["index"]] = data;
		console.log($scope.list);
    });
})
.controller('plantCtrl2', function($scope, $state, PlantEdit, $stateParams) {
	$scope.addval = function() {
		var id = $stateParams.Id;
		if(id == -1){
			PlantEdit.update();
		}else{
			PlantEdit.update2(id);
		}
		$state.go('app.plant');
	};
})
.factory('PlantEdit', function($rootScope){
     
     var data = {text:"Farm1",time:"12:00"};

     return {
        get: function(){
			return data;
        },
        update : function(){
			data = {text:document.getElementById("name").value,time:document.getElementById("time").innerHTML};
			$rootScope.$broadcast('add');
        },
		update2 : function(id){
			data = {text:document.getElementById("name").value,time:document.getElementById("time").innerHTML,index:id};
			$rootScope.$broadcast('edit');
        }
     }
})

.controller('HomeCtrl', function($scope, $state, PlantEdit, $stateParams) {
	
})

.controller('AirCtrl', function($scope, $state, $stateParams) {
	$("#decTemp").prop('disabled', true);
			$("#incTemp").prop('disabled', true);
			$("#Temp").prop('disabled', true);
			$("#mode").prop('disabled', true);
			$("#fan").prop('disabled', true);
	$scope.monitorstatus="monitor-grey";
	$scope.temperature = 25;
	$scope.tempColor = "balanced";
	$scope.changeColor=function(temp){
		if(temp > 35){
			$scope.tempColor = "assertive";
		}else{
			if(temp > 30 && temp <= 35){
				$scope.tempColor = "energized";
			}else{
				if(temp > 23 && temp <= 30){
					$scope.tempColor = "balanced";
				}else{
					$scope.tempColor = "positive";
				}
			}
		}
	};
	$scope.increaseTemp=function(){this.temperature++;$scope.changeColor(this.temperature);};
	$scope.decreaseTemp=function(){this.temperature--;$scope.changeColor(this.temperature);};
	$scope.change=function(){$scope.changeColor(this.temperature);};
	$scope.powerstatus=0;
	$scope.airpower="assertive";
	$scope.airmode="normal";
	$scope.fanlevel="1";
	$scope.starttime="-";
	$scope.stoptime="-";
	$scope.changepower=function(){
		if($scope.powerstatus==0){
			$scope.monitorstatus=""
			$scope.airpower="balanced";
			$scope.powerstatus=1;
			$("#decTemp").prop('disabled', false);
			$("#incTemp").prop('disabled', false);
			$("#Temp").prop('disabled', false);
			$("#mode").prop('disabled', false);
			$("#fan").prop('disabled', false);
		}
		else if($scope.powerstatus==1){
			$scope.monitorstatus="monitor-grey"
			$scope.airpower="assertive";
			$scope.powerstatus=0;
			$("#decTemp").prop('disabled', true);
			$("#incTemp").prop('disabled', true);
			$("#Temp").prop('disabled', true);
			$("#mode").prop('disabled', true);
			$("#fan").prop('disabled', true);
		}
	};
})

.controller('VaccumCtrl', function($scope, $state,  $stateParams,$interval) {
	$scope.Omanual="";
	$scope.batterypercent="100";
	$scope.batterypic="img/battery.svg";
		$interval(function () {
		if($scope.batterypercent>0){
			$scope.batterypercent--
			if($scope.batterypercent==0){
				$scope.batterypic="img/battery0.png";
			}
			else if($scope.batterypercent<25){
				$scope.batterypic="img/battery25.png";
			}
			else if($scope.batterypercent<50){
				$scope.batterypic="img/battery50.png";
			}
			else if($scope.batterypercent<75){
				$scope.batterypic="img/battery75.png";
			}
				
			}
		}
	, 50);
	
})


.controller('viewcamCtrl', function($scope, $state,  $stateParams){
	$scope.id = $stateParams.Id;
	$scope.status="";
	$scope.onoff="balanced"
	$scope.sound="ion-volume-high";
	$scope.cam = [{name:"cam1",state:"balanced",status:"Online"},{name:"cam2",state:"balanced",status:"Online"},{name:"cam3",state:"assertive",status:"Offline"},{name:"cam4",state:"balanced",status:"Online"}];
	for(i=0;i<$scope.cam.length;i++){
		if($scope.id==$scope.cam[i]["name"]){
			$scope.status=$scope.cam[i]["status"];
			if($scope.status=="Offline"){
				$scope.onoff="balanced";
				
			}
			else if($scope.status=="Online"){
				$scope.onoff="assertive";
				
			}
		}
	}
	$scope.openCam=function(){
		if($scope.onoff=="balanced"){
			$scope.onoff="assertive";
			$scope.status="Offline";
		}
		else if($scope.onoff=="assertive"){
			$scope.onoff="balanced";
			$scope.status="Online";
		}
	}
	$scope.openMic=function(){
		if($scope.sound=="ion-volume-high"){
			$scope.sound="ion-volume-mute";
		}
		else if($scope.sound=="ion-volume-mute"){
			$scope.sound="ion-volume-high";
		}
	}
})

.controller('CamCtrl', function($scope, $state, $stateParams) {
	$scope.list = [[{name:"cam1",state:"balanced",status:"Online"},{name:"cam2",state:"balanced",status:"Online"}],[{name:"cam3",state:"assertive",status:"Online"},{name:"cam4",state:"balanced",status:"Online"}]];
})

.controller('GarageCtrl', function($scope, $state, $stateParams,$timeout) {
	var status=0;
	$scope.status="closed";
	$scope.color="assertive";
	$scope.garageimg="img/storage.svg";
	$scope.changestatus=function(){
		if(status==0){
			$scope.status="opening ...";
			$scope.color="energized";
			$timeout(function(){
				$scope.garageimg="img/garagestatus1.png"
				$timeout(function(){
					$scope.garageimg="img/garagestatus2.png"
					$timeout(function(){
						$scope.garageimg="img/garagestatus3.png"
						$timeout(function(){
							$scope.garageimg="img/garagestatus4.png"
							$timeout(function(){
								$scope.garagestatus="Garage is "
								$scope.status="opened";
								$scope.color="balanced";
						},2000);
						},1000);
					},1000);
				},1000);
			},1000);
			status=1;
		}
		else{
			$scope.status="closing ...";
			$scope.color="energized";
			$timeout(function(){
				$scope.garageimg="img/garagestatus3.png"
				$timeout(function(){
					$scope.garageimg="img/garagestatus2.png"
					$timeout(function(){
						$scope.garageimg="img/garagestatus1.png"
						$timeout(function(){
							$scope.garageimg="img/garagestatus0.png"
							$timeout(function(){
								$scope.status="closed";
								$scope.color="assertive";
						},2000);
						},1000);
					},1000);
				},1000);
			},1000);
			
			status=0;
		}
	};
})

.controller('LockCtrl', function($scope, $state, $stateParams) {
	
})

.controller('MusicCtrl', function($scope, $state, $stateParams) {
	var playpause=0;
	var songpointer=$stateParams.Id;
		$scope.playlist = [
		{name:"something just like this",pic:"img/Music_cover/some_thing.jpg",artist:"The Chainsmokers & Coldplay "},
		{name:"Hello",pic:"img/Music_cover/hello.jpg",artist:"Adele"},
		{name:"I Feel It Coming",pic:"img/Music_cover/feel.jpg",artist:"The Weeknd ft. Daft Punk"},
		{name:"Lost Stars",pic:"img/Music_cover/loststar.jpg",artist:"Adam Levine"},
		{name:"I'm Yours",pic:"img/Music_cover/imyour.jpg",artist:"Jason Mraz"},
		{name:"Let Her Go",pic:"img/Music_cover/lethergo.jpg",artist:"Passenger"}];
		$scope.artist=$scope.playlist[songpointer]["artist"];
		$scope.songname=$scope.playlist[songpointer]["name"];
		$scope.musicpic=$scope.playlist[songpointer]["pic"];
		$scope.btcolor="balanced";
		$scope.btstatus="play";
		$scope.PlayPause=function(){
		if(playpause==0){
			playpause=1;
			this.btcolor="assertive";
			this.btstatus="pause";
		}
		else{
			playpause=0;
			this.btcolor="balanced";
			this.btstatus="play";
		}
		};
	$scope.nextsong=function(){
		if(songpointer<this.playlist.length-1){
			songpointer++;
		this.artist=this.playlist[songpointer]["artist"];
		this.songname=this.playlist[songpointer]["name"];
		this.musicpic=this.playlist[songpointer]["pic"];
		if(playpause==1){
			playpause=0;
			this.btcolor="balanced";
			this.btstatus="play";
		};
		}
		
		
	}
	$scope.backsong=function(){
		if(songpointer>0){
			songpointer--;
		this.artist=this.playlist[songpointer]["artist"];
		this.songname=this.playlist[songpointer]["name"];
		this.musicpic=this.playlist[songpointer]["pic"];
		if(playpause==1){
			playpause=0;
			this.btcolor="balanced";
			this.btstatus="play";
		};
		
		}
	}
})

.controller('SelectsongCtrl', function($scope, $state, $stateParams) {
	$scope.playlist = [
		{name:"something just like this",pic:"img/Music_cover/some_thing.jpg",artist:"The Chainsmokers & Coldplay "},
		{name:"Hello",pic:"img/Music_cover/hello.jpg",artist:"Adele"},
		{name:"I Feel It Coming",pic:"img/Music_cover/feel.jpg",artist:"The Weeknd ft. Daft Punk"},
		{name:"Lost Stars",pic:"img/Music_cover/loststar.jpg",artist:"Adam Levine"},
		{name:"I'm Yours",pic:"img/Music_cover/imyour.jpg",artist:"Jason Mraz"},
		{name:"Let Her Go",pic:"img/Music_cover/lethergo.jpg",artist:"Passenger"}];
	var playpause=0;
	$scope.btcolor="balanced";
	$scope.btstatus="play";
	$scope.PlayPause=function(){
		if(playpause==0){
			playpause=1;
			this.btcolor="assertive";
			this.btstatus="pause";
		}
		else{
			playpause=0;
			this.btcolor="balanced";
			this.btstatus="play";
		}
	};
		
})

.controller('TempCtrl', function($scope, $state, $stateParams) {
	$scope.humidVal=50;
	$scope.tempVal=55;
	$scope.recommentHumid="เปิดผ้าม่านเพื่อลดความชื้น";
	$scope.recommentTemp="เปิดแอร์เพื่อให้ค่าไฟที่บ้านเปลืองเล่นๆมั้ยพ่อหนุ่ม";
	$scope.humGauge = createRadGauge('hum', 0, 100, '%').setVal($scope.humidVal);
	$scope.tempGauge = createVerGauge('temp', -20, 60, ' °C').setVal($scope.tempVal).setColor("red");
		
})

.controller('LightCtrl', function($scope, $state, $rootScope, LightEdit) {
	
	$scope.list = [
		{text:"ห้องนั่งเล่น",urlicon:"img/sofa_icon.png",index:0},
		{text:"ห้องนอน",urlicon:"img/sleep_icon.jpg",index:1},
		{text:"ห้องครัว",urlicon:"img/kitchen_icon.png",index:2},
		{text:"ห้องน้ำ",urlicon:"img/bathroom_icon.png",index:3},
		{text:"หน้าบ้าน",urlicon:"img/home_icon.png",index:4},
		{text:"โรงรถ",urlicon:"img/garage_icon.png",index:5}];
	$rootScope.$on('add', function() {
		var data = LightEdit.get();
		data["index"] = $scope.list.length;
        $scope.list.push(data);
	});
	
	$scope.openall=function(){
		for(i=0;i<$scope.list.length;i++){
		$("#lighton"+i).prop('checked', true);
		}
	};
	$scope.closeall=function(){
		for(i=0;i<$scope.list.length;i++){
			$("#lighton"+i).prop('checked', false);
			}
	};
})
.controller('LightCtrl2', function($scope, $state, LightEdit, $stateParams) {
	$scope.addval = function() {
		var id = $stateParams.Id;
		if(id == -1){
			LightEdit.update();
		}
		$state.go('app.light');
	};
})
.factory('LightEdit', function($rootScope){
     
     var data = {text:"ห้อง"};

     return {
        get: function(){
			return data;
        },
        update : function(){
			data = {text:document.getElementById("name").value,urlicon:"img/other_icon.png"};
			$rootScope.$broadcast('add');
        }
     }

})