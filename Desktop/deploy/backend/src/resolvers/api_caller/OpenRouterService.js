import optimization from '../../api/optimization';
import directions from '../../api/directions';

const Optimization = async ( ans1 ) => {
    // data preparation
    var request_array = [];
    var len_of_result = ans1.length;
    var start_and_end = [parseFloat(ans1[0][0]["Px"]), parseFloat(ans1[0][0]["Py"])];

    for (let i = 0; i < len_of_result; i++) {
        var request = {}
        var jobs = []
        var vehicles = [{
            "id": 1,
            "profile": "driving-car",
            "start": [parseFloat(ans1[0][0]["Px"]), parseFloat(ans1[0][0]["Py"])],
            "end": [parseFloat(ans1[0][0]["Px"]), parseFloat(ans1[0][0]["Py"])]
        }]
        
        for (let j = 1; j < ans1[i].length; j++) {
            var temp = {}
            temp["id"] = j;
            temp["description"] = ans1[i][j]["Name"];
            temp["location"] = [parseFloat(ans1[i][j]["Px"]), parseFloat(ans1[i][j]["Py"])];

            jobs.push(temp)
        }

        request["jobs"] = jobs;
        request["vehicles"] = vehicles;
        request_array.push(request)
    }

    // call optimization API and get all steps coords
    var all_steps = [];
    for (let i = 0; i< len_of_result; i++) { // PREVENT API overflow limit !!!
        var request_body = JSON.stringify(request_array[i]);
        var response_body = await optimization(request_body);
        var steps = JSON.parse(response_body).routes[0].steps;
        // console.log(response_body)

        var steps_array = [ans1[0][0]]; // start
        for (let j = 1; j< steps.length-1; j++) {
            for (let k = 1; k< ans1[0].length; k++) {
                if (steps[j]["location"][0] === parseFloat(ans1[0][k]["Px"]) &&
                    steps[j]["location"][1] === parseFloat(ans1[0][k]["Py"])) {
                    steps_array.push(ans1[0][k])
                }
            }
        }
        steps_array.push(ans1[0][0]) // end 
        
        all_steps.push(steps_array);
    }
    
    return all_steps
}

const Directions = async ( geometry ) => {
    // data preparation
    var request_array = {"coordinates": geometry};

    var request_body = JSON.stringify(request_array);
    var response_body = await directions(request_body);

    var all_steps_line = JSON.stringify(response_body)
    return all_steps_line
}

export { Optimization, Directions }