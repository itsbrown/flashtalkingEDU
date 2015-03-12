/**
 * Created by coreybrown on 3/5/15.
 */
ftEDuApp.controller("chapterMenu",function(tCards,$scope,$rootScope,ftData,$sce){

    $scope.chapterClicked = function(){

        console.log('chapter menu',$rootScope.card.chapters);
    };

});