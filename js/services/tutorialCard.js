/**
 * Created by coreybrown on 2/25/15.
 */
ftEDuApp.service('tCards', function($rootScope,ftData,$sce){
    $rootScope._cards = [];
    ftData.getData().then(function(cards){
        $rootScope._cards = cards.data;
        $rootScope.card = {
            vsrc : $sce.trustAsResourceUrl("http://cdn.flashtalking.com/" + $rootScope._cards.ftEdu[0].video),
            chapters : $rootScope._cards.ftEdu[0].chapters
        };
        console.log('videoPlayer',encodeURI($rootScope.card.vsrc));
    });

});
