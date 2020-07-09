d3.csv("data/ramen.csv").then(function(csv){
	var hierarchy = d3.nest()
    .key(function(d) { return d.Country; })
/*    .key(function(d) { 
    	air = d.aired.split("to");
    	//console.log(air);
    	return air[0];
    	 })
    .key(function(d) { return d.genre; })*/
    /*.key(function(d) { 
        return d.Style;
    })*//*
    .key(function(d) { return d.Brand; })
    .key(function(d) { 
        return Math.trunc(parseFloat(d.Stars)); })*/
    .entries(csv);

    console.log(hierarchy)
	
 });