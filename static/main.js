// const svg = d3.select('#graph');
// let data;

fetch('/json')
  .then(function (data) {
    return data.json(); // 読み込むデータをJSONに設定
  })
  .then(function (json) {
    render_graph(json);
  });

// create an array with nodes
function render_graph(data) {
    const node_list = [];
    const name_to_id = new Map();
    let idx = 0;
    for (let i = 0; i < data.categories.length; ++i, ++idx) {
        node_list.push({ id: idx, label: data.categories[i], color: "orange" });
        name_to_id[data.categories[i]] = idx;
    }
    for (let i = 0; i < data.materials.length; ++i, ++idx) {
        node_list.push({ id: idx, label: data.materials[i] });
        name_to_id[data.materials[i]] = idx;
    }
    const nodes = new vis.DataSet(node_list);

    const edge_list = [];
    for (let i = 0; i < data.material_category.length; ++i) {
        edge_list.push({
            from: name_to_id[data.material_category[i][0]],
            to: name_to_id[data.material_category[i][1]],
        });
    }

    // create an array with edges
    const edges = new vis.DataSet(edge_list);

    // create a network
    var container = document.getElementById("graph");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {};
    var network = new vis.Network(container, data, options);
}


// const circles = [
//     { type: 'small', r: 50, x: 100, y: 150 },
//     { type: 'medium', r: 100, x: 200, y: 150 },
//     { type: 'large', r: 150, x: 300, y: 150 }  
// ]
// const svg = d3.select('#graph')
//     .append('svg')
//     .attr('width', 500)
//     .attr('height', 500)
// svg.selectAll('circles')
//     .data(circles)
//     .enter()
//     .append('circle')
//     .attr('r', d => d.r)
//     .attr('cx', d => d.x)
//     .attr('cy', d => d.y)
//     .attr('class', d => d.type)
