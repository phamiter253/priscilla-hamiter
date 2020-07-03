d3.csv("data/cereal.csv").then(function(csv) {

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
    .style("padding", "0px")
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
        switch(d.mfr){
          case "A":
            manufacture = "American Home Food Products";
            break;
          case "G":
            manufacture = "General Mills";
            break;
          case "K":
            manufacture = "Kelloggs";
            break;
          case "N":
            manufacture = "Nabisco";
            break;
          case "P":
            manufacture = "Post";
            break;
          case "Q":
            manufacture = "Quaker Oats";
            break;
          case "R":
            manufacture = "Ralston Purina";
            break;
          default:
            manufacture = "";
        }

        const html = `
          <div class="tile">
            <div class="columns">
              <div class="column is-2">
                <img src="${d.boxImage}" width="200" height="auto"></img>
              </div>
              <div class="column">
                <p class="title">${d.name}</p>
                <hr></hr>
                <div class="level">
                  <p class="text"><strong>Manufacturer:</strong> ${manufacture}</p>
                  <p class="text"><strong>Type:</strong> ${type}</p>
                  <p class="text"><strong>Rating:</strong> ${d.rating}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">

              <section class="performance-facts" style="margin:0px">
                <header class="performance-facts__header">
                  <h1 class="performance-facts__title">Nutrition Facts</h1>
                  <p style="line-height:14px">Serving Size ${d.cups} cup
                </header>
                <table class="performance-facts__table">
                  <thead>
                    <tr>
                      <th colspan="3" class="small-info" style="line-height: 8px">
                        Amount Per Serving
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th colspan="2" style="line-height:12px">
                        <b>Calories</b>
                        ${d.calories}
                      </th>
                    </tr>
                    <tr class="thick-row">
                    </tr>
                    <tr>
                      <th colspan="2" style="line-height:12px">
                        <b>Total Fat</b>
                        ${d.fat}g
                      </th>
                    </tr>
                    <tr>
                      <th colspan="2" style="line-height:12px">
                        <b>Sodium</b>
                        ${d.sodium}mg
                      </th>
                    </tr>
                    <tr>
                      <th colspan="2" style="line-height:12px">
                        <b>Total Carbohydrate</b>
                        ${d.carbo}g
                      </th>
                    </tr>
                    <tr>
                      <td class="blank-cell">
                      </td>
                      <th style="line-height:12px">
                        Dietary Fiber
                        ${d.fiber}g
                      </th>
                    </tr>
                    <tr>
                      <td class="blank-cell">
                      </td>
                      <th style="line-height:12px">
                        Sugars
                        ${d.sugars}g
                      </th>
                    </tr>
                    <tr class="thick-end">
                      <th colspan="2" style="line-height:12px">
                        <b>Protein</b>
                        ${d.protein}g
                      </th>
                    </tr>
                  </tbody>
                </table>

                <table class="performance-facts__table--grid" style="margin-bottom:0px">
                  <tbody>
                    <tr>
                      <td colspan="2" style="line-height:12px">
                        Vitamins
                        ${d.vitamins}%
                      </td>
                      <td style="line-height:12px">
                        Potassium
                        ${d.potass}mg
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
            <div class="column">
              <svg id="cup" width="300" height="270" style="margin-top: 50px"></svg>
            </div>
            <div class="column">
              <svg width="300px" height="270px" style="background-color: blue"></svg>
            </div>
          </div>
        `
        body.html(html);
        details.style("visibility", "visible");

        cup = d3.select("#cup");
        cup.style("background", "url('assets/pictures/cereal/cup.png')")
          .style("background-size", "contain")
          .style("background-repeat", "no-repeat")
        var y = d3.scaleLinear()
          .domain([0, 4])
          .range([195,30])

        cup.append("g")
          .attr("transform", "translate(150,0)")
          .call(d3.axisLeft(y))

      })
      .on("mouseover", function(d){
        //console.log(d)
        div.html(`<p class="text" style="font-size: 12px">${d.name}</p>`)
         .style("width", "120px")
        .style("height", "40px")
        .style("left", (d.x + 30) + "px")
        .style("top", (d.y +550) + "px")
        .style("padding", "6px")
        .style("visibility", "visible");
      })
      .on("mouseout", function(d){
        div.style("visibility", "hidden");
      });
	
	//console.log(csv);
});