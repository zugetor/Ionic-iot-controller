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
	$scope.temperature = 25;
	$scope.increaseTemp=function(){$scope.temperature++;};
	$scope.decreaseTemp=function(){$scope.temperature--;};
	$scope.powerstatus=0;
	$scope.airpower="assertive";
	$scope.airmode="normal";
	$scope.fanlevel="1";
	$scope.starttime="-";
	$scope.stoptime="-";
	$scope.changepower=function(){
		if($scope.powerstatus==0){
			$scope.airpower="balanced";
			$scope.powerstatus=1;
		}
		else if($scope.powerstatus==1){
			$scope.airpower="assertive";
			$scope.powerstatus=0;
		}
	};
})

.controller('LightCtrl', function($scope, $state,  $stateParams) {
})


.controller('BellCtrl', function($scope, $state,  $stateParams) {
	
})

.controller('CamCtrl', function($scope, $state, $stateParams) {
	
})

.controller('GarageCtrl', function($scope, $state, $stateParams,$timeout) {
	var status=0;
	$scope.garagestatus="Garage is closed";
	$scope.garageimg="img/storage.svg";
	$scope.changestatus=function(){
		if(status==0){
			$scope.garagestatus="Garage is opening ..."
			$timeout(function(){
				$scope.garageimg="img/garagestatus1.png"
				$timeout(function(){
					$scope.garageimg="img/garagestatus2.png"
					$timeout(function(){
						$scope.garageimg="img/garagestatus3.png"
						$timeout(function(){
							$scope.garageimg="img/garagestatus4.png"
							$timeout(function(){
								$scope.garagestatus="Garage is opened"
						},2000);
						},1000);
					},1000);
				},1000);
			},1000);
			status=1;
		}
		else{
			$scope.garagestatus="Garage is closing ..."
			$timeout(function(){
				$scope.garageimg="img/garagestatus3.png"
				$timeout(function(){
					$scope.garageimg="img/garagestatus2.png"
					$timeout(function(){
						$scope.garageimg="img/garagestatus1.png"
						$timeout(function(){
							$scope.garageimg="img/garagestatus0.png"
							$timeout(function(){
								$scope.garagestatus="Garage is closed"
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
	
})

.controller('TempCtrl', function($scope, $state, $stateParams) {
	
})