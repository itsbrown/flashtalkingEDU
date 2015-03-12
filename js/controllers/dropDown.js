/**
 * Created by coreybrown on 3/5/15.
 */
ftEDuApp.controller("dropDownMenu",function($scope, ftData,$rootScope,$sce){

    $scope.videoSelected = function(_sc){
        console.log('dd',_sc.video);
        $rootScope.card.vsrc = $sce.trustAsResourceUrl("http://cdn.flashtalking.com/" + _sc.video);
        $rootScope.card.chapters = _sc.chapters;
        loadVideo();
    };
});