app.service('EvaluateService', function($q, $http, $location) {
  
const EvaluateService = {

    registerEvaluate: evaluateForm => {        
        let evaluate = $http.post('http://localhost:3001/v1/evaluates/add', evaluateForm);
        return evaluate;
    },

    getEvaluates: () => {
        let evaluates = $http.get('http://localhost:3001/v1/evaluates');
        return evaluates;
    }

  };

  return EvaluateService;
});