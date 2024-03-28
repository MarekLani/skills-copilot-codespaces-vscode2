function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'app/member/member.html',
        controller: 'MemberController',
        controllerAs: 'memberCtrl',
        bindToController: true,
        scope: {
            member: '='
        }
    }
}