'use strict';

controllers.controller('PlayQCMCtrl',['$scope','$timeout', 'PlayQCMService','usSpinnerService','$routeParams','sha256','$location','dialogs','$interval',
    function ($scope,$timeout, PlayQCMService,usSpinnerService,$routeParams,sha256,$location,dialogs,$interval) {
        var responded=false;
        var wait=false;
        var questionDuration=0;
        usSpinnerService.spin('spinner-1');
        var questionNumber=0;
        $scope.score=0;
        $scope.answers=new Int8Array(20).fill(0);
        $scope.lock=false;
        $scope.playContainer=false;
        $scope.endContainer=true;
        var idQCM=$routeParams.idQCM;

        $scope.btnResponseStyle1={};
        $scope.btnResponseStyle2={};
        $scope.btnResponseStyle3={};
        $scope.btnResponseStyle4={};

        $scope.time=10;

        var interval=$interval(function(){
            if($scope.time>0) {
                $scope.time--;
                
            }},1000);

        /**Rating**/
        var note=0;
        $scope.onRating=function(rating){
            note=rating;
        };

        PlayQCMService.getValidatedQcm(idQCM).query().$promise
            .then(
                function success(response) {
                    $scope.qcm=response;
                    $scope.qcm.questions=shuffle($scope.qcm.questions);
                    randomProposition($scope.qcm.questions[questionNumber]);
                    usSpinnerService.stop('spinner-1');
                },
                function error(response){
                    if(response.status!==401) {
                        dialogs.error("Erreur", "Le QCM n'est pas valide !");
                        $location.path("/home");
                    }
                });

        /**
         * When the user respond.
         * good response = 2
         * bad response = 1
         * no response = 0
         * @param proposition
         */
        $scope.respond=function(proposition,number){
            $scope.lock=true;
            
            if(proposition!=null & proposition!=null) {
                responded=true;
                wait=true;
                var encrypt = sha256.convertToSHA256(proposition);

                if (encrypt === $scope.question.encryptAnswer) {
                    $scope.answers[questionNumber] = 2;
                    $scope.score++;
                    if (number === 1)
                        $scope.btnResponseStyle1 = {'background-color': '#42f480', 'color': 'black'};
                    else if (number === 2)
                        $scope.btnResponseStyle2 = {'background-color': '#42f480', 'color': 'black'};
                    else if (number === 3)
                        $scope.btnResponseStyle3 = {'background-color': '#42f480', 'color': 'black'};
                    else
                        $scope.btnResponseStyle4 = {'background-color': '#42f480', 'color': 'black'};
                }
                else {
                    $scope.answers[questionNumber] = 1;
                    if (number === 1)
                        $scope.btnResponseStyle1 = {'background-color': '#dd483e', 'color': 'black'};
                    else if (number === 2)
                        $scope.btnResponseStyle2 = {'background-color': '#dd483e', 'color': 'black'};
                    else if (number === 3)
                        $scope.btnResponseStyle3 = {'background-color': '#dd483e', 'color': 'black'};
                    else
                        $scope.btnResponseStyle4 = {'background-color': '#dd483e', 'color': 'black'};
                }
                if (questionNumber !== 19) {
                    $timeout(function () {
                        questionNumber++;
                        randomProposition($scope.qcm.questions[questionNumber]);
                        //$scope.question=$scope.qcm.questions[questionNumber];
                        $scope.lock = false;
                        $scope.btnResponseStyle1 = {'color': 'white', 'background-color': '#287F50'};
                        $scope.btnResponseStyle2 = {'color': 'white', 'background-color': '#287F50'};
                        $scope.btnResponseStyle3 = {'color': 'white', 'background-color': '#287F50'};
                        $scope.btnResponseStyle4 = {'color': 'white', 'background-color': '#287F50'};
                        wait=false;
                    }, 2000);
                }
                else {
                    $scope.playContainer = true;
                    $scope.endContainer = false;
                }
            }else{
                if (questionNumber !== 19) {
                    questionNumber++;
                    randomProposition($scope.qcm.questions[questionNumber]);
                    $scope.lock = false;
                }
                else{
                    $interval.cancel(interval);
                    $scope.playContainer = true;
                    $scope.endContainer = false;
                }
            }
        };

        function randomProposition(question){
            var propositions=[];
            propositions.push(question.proposition1);
            propositions.push(question.proposition2);
            propositions.push(question.proposition3);
            propositions.push(question.proposition4);
            propositions=shuffle(propositions);
            $scope.question=question;
            $scope.question.proposition1=propositions[0];
            $scope.question.proposition2=propositions[1];
            $scope.question.proposition3=propositions[2];
            $scope.question.proposition4=propositions[3];
            
            if(question.time===null){
                questionDuration=10000;
            }
            else{
                questionDuration=question.time*1000;
            }
            //time=questionDuration;
            $scope.time=10;
            /*$timeout(function () {
                if(wait===false && responded==false){
                    $scope.respond(null,null);
                }else{
                    responded=false;
                }
            },questionDuration);*/

        };

        function shuffle(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
            return a;
        };

        /**
         * Send QCM result, comment and rating.
         */
        $scope.sendQCM=function(){
          
            var endQCM={};
            endQCM.idQcm=$scope.qcm.id;

            endQCM.question1=($scope.answers[0]===2 ? true : false);
            endQCM.question2=($scope.answers[1]===2 ? true : false);
            endQCM.question3=($scope.answers[2]===2 ? true : false);
            endQCM.question4=($scope.answers[3]===2 ? true : false);
            endQCM.question5=($scope.answers[4]===2 ? true : false);
            endQCM.question6=($scope.answers[5]===2 ? true : false);
            endQCM.question7=($scope.answers[6]===2 ? true : false);
            endQCM.question8=($scope.answers[7]===2 ? true : false);
            endQCM.question9=($scope.answers[8]===2 ? true : false);
            endQCM.question10=($scope.answers[9]===2 ? true : false);
            endQCM.question11=($scope.answers[10]===2 ? true : false);
            endQCM.question12=($scope.answers[11]===2 ? true : false);
            endQCM.question13=($scope.answers[12]===2 ? true : false);
            endQCM.question14=($scope.answers[13]===2 ? true : false);
            endQCM.question15=($scope.answers[14]===2 ? true : false);
            endQCM.question16=($scope.answers[15]===2 ? true : false);
            endQCM.question17=($scope.answers[16]===2 ? true : false);
            endQCM.question18=($scope.answers[17]===2 ? true : false);
            endQCM.question19=($scope.answers[18]===2 ? true : false);
            endQCM.question20=($scope.answers[19]===2 ? true : false);
            endQCM.score=$scope.score;
            endQCM.rating=note;
            endQCM.comment=$scope.comment;
            endQCM.finished=true;
            

            PlayQCMService.finishQCM().query(endQCM)
                .$promise
                .then(
                    function success(response) {
                        $location.path("/qcm/presentationQCM/"+$scope.qcm.id);
                    },
                    function error(response) {
                        dialogs.error("Erreur", "Une erreur est survenue.");
                    }
                );

        };


    }]);
