d3.csv("data/cereal.csv").then(function(csv) {

	const svg = d3.select("#cereal");

  const details = d3.select("#cerealInfo");

  div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("width", "0px")
    .style("height", "0px")
    .style("visibility", "hidden");
 
 
  const nodes = svg.append("g").attr('id', 'nodes');
  
  let simulation = d3.forceSimulation();

  width = 320;
  height = 320;
  
  simulation = simulation
    .force("collide", d3.forceCollide(34).iterations(12))
    .force("charge", d3.forceManyBody())
    .velocityDecay(0.75)
    .alphaDecay(0.006)
    .force("center", d3.forceCenter(400, 400))
    .force("y", d3.forceY(0))
    .force("x", d3.forceX(0))

  
  const ticked = () => {
    nodes.selectAll("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  simulation
    .nodes(csv)
    .on("tick", ticked);

  const defs = nodes.append("defs");
  defs.append("pattern")
      .attr("id", "image")
      .attr("height", 20)
      .attr("width", 20)
      .append("svg:image")
      .attr("xlink:href", "assets/pictures/cereal/oatquaker.png")
      .attr("height", 60)
      .attr("width", 60);
  
  const node = nodes.selectAll("circle")
      .data(simulation.nodes(), d => d.name)
      .enter().append("circle")
      .attr("r", 30)
      .attr("fill", function(d){
        if(d.name == "100% Natural Bran"){
            return "url(#image)";
        }else{
          return "black";
        }
      })
      .on("mouseover", function(d){
        //console.log(d)
        div.html(`<p>${d.name}</p>`)
         .style("width", "250px")
        .style("height", "150px")
        .style("left", (d.x + 155) + "px")
        .style("top", (d.y + 65) + "px")
        .style("visibility", "visible");
      });
	
	//console.log(csv);
});