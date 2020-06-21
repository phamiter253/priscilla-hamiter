d3.csv("/data/cereal.csv").then(function(csv) {

	const svg = d3.select("#cereal");

  const details = d3.select("#cerealInfo");

  const body = details.append("xhtml:body")
    .style("text-align", "left")
    .style("background", "none")
    .html("<p>N/A</p>");

  details.style("visibility", "hidden");

  div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("width", "0px")
    .style("height", "0px")
    .style("visibility", "hidden");
 
 
  const nodes = svg.append("g").attr('id', 'nodes');
  
  let simulation = d3.forceSimulation();

  width = 300;
  height = 300;
  
  simulation = simulation
    .force("collide", d3.forceCollide(30).iterations(12))
    .force("charge", d3.forceManyBody())
    .velocityDecay(0.75)
    .alphaDecay(0.006)
    .force("center", d3.forceCenter(350, 450))
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
      .attr("height", 40)
      .attr("width", 40);
  
  const node = nodes.selectAll("circle")
      .data(simulation.nodes(), d => d.name)
      .enter().append("circle")
      .attr("r", 20)
      .attr("fill", function(d){
        if(d.name == "100% Natural Bran"){
            return "url(#image)";
        }else{
          return "black";
        }
      })
      .on("click", function(d){
        type = d.type == "C" ? "Cold Cereal" : "Hot Cereal";
        manufacture = "";

        const html = `
          <div class="tile" style="margin-bottom: 50px">
            <div class="columns">
              <div class="column is-2">
                <img src="${d.boxImage}" width="200" height="auto"></img>
              </div>
              <div class="column">
                <p class="title">${d.name}</p>
                <hr></hr>
                <div class="level">
                  <p class="text"><strong>Manufacturer:</strong> ${d.mfr}</p>
                  <p class="text"><strong>Type:</strong> ${type}</p>
                  <p class="text"><strong>Rating:</strong> ${d.rating}</p>
                </div>
                <svg width="100" height="100">
                  <img src="assets/pictures/cereal/cup.png" width="300" height="auto"></img>
                </svg>
              </div>
            </div>
          </div>
        `
        body.html(html);
        details.style("visibility", "visible");
      })
      .on("mouseover", function(d){
        //console.log(d)
        div.html(`<p class="text" style="font-size: 12px">${d.name}</p>`)
         .style("width", "120px")
        .style("height", "60px")
        .style("left", (d.x + 30) + "px")
        .style("top", (d.y +50) + "px")
        .style("visibility", "visible");
      })
      .on("mouseout", function(d){
        div.style("visibility", "hidden");
      });
	
	//console.log(csv);
});