moment.locale('eu');

var greeterApp = angular.module('greeter',[]);

angular.element(document).ready(function(){
	angular.bootstrap(document, ['greeter']);
})

greeterApp.controller('clock', function clockController($scope, $interval){
    function tick(){
        $scope.clock = moment().format('YYYY MMMM D, HH:mm:ss');
    }
    
    $interval(function(){
        tick()
    }, 1000)
    
    tick()    
})

greeterApp.controller('login', function InitController($scope, $http, $timeout, $window){
	    
    $scope.users = lightdm.users;
    
    $scope.startLogin = function(){
        $scope.message = '';
        lightdm.start_authentication($scope.selectedUser.name);
    }
    
	$scope.login = function(){
        lightdm.provide_secret($scope.passwd);
	}
    
    $window.show_prompt = function(text){
	   //alert("prompt: "+text)
    }
    
    $window.authentication_complete = function(){
        if(lightdm.is_authenticated){
            lightdm.login(lightdm.authentication_user, lightdm.default_session);
        } else {
            $scope.message = 'Login error';
            lightdm.start_authentication($scope.selectedUser.name);
        }
    }

    $window.show_message = function(text){
        //alert('MSG: '+text);
    }

    $window.show_error = function(text){
        //alert('ERR: '+text);
    }
})