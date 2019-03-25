
var W = [];
		
function hp_learn_pattern(pattern_length, train_pattern){
	//initialize Weights
	for(var l1=0; l1<pattern_length; l1++){
		W[l1] = [];
		for(var l2=0; l2<pattern_length; l2++){
			W[l1][l2] = 0;
		}
	}
	//learn patterns
	for(var t=0; t<train_pattern.length; t++){
		for(var i=0; i<pattern_length; i++){
			for(var j=0; j<pattern_length; j++){
				if(i!=j){
					if(train_pattern[t][i]==train_pattern[t][j]){
						W[i][j] += 1;
						W[j][i] += 1;
					}
					else{
						W[i][j] += -1;
						W[j][i] += -1;
					}
				}
			}
		}
	}
	alert('Done!');
}

//test model
function hp_try_pattern(pattern_length, test_pattern){
	threshold = 0;
	output_states = [];
	
	var notStable = true;
	var update_limit = 5;
	var currStates = Object.assign([], test_pattern);

	console.log("start: "+currStates);

	while(update_limit>0 && notStable){
		var preStates = Object.assign([], currStates);
		//update states
		for(var i=0; i<pattern_length; i++){
			var v = 0;
			for(var j=0; j<pattern_length; j++){
				if(i!=j){
					v += currStates[j]*W[j][i];
				}
			}
			if(v>=threshold){
				currStates[i] = 1;
			}
			else{
				currStates[i] = 0;
			}
		}
		//validate states
		notStable = false;
		for(var i=0; i<pattern_length; i++){
			if(currStates[i]!=preStates[i]){
		    	notStable = true;
		        break;
		    }
		}
		console.log("pre: "+preStates+", updated: "+currStates);
		output_states.push(currStates);
		
		update_limit -= 1;
	}

	if(notStable){
		console.log(" >> not stable!\n");
	}
	else{
		console.log(" >> yeah stable!\n");
	}
	
	return output_states;
}









