const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');
const path = require('path');
const {create} = require("axios");
const width = 800; // Width of the chart
const height = 600; // Height of the chart


const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height,  });

const  createChart = async(labels, d1, d2, name)=>{
    const d1M= d1.data.map((value, index)=>({x: labels[index], y: value}));
    const d2M = d2.data.map((value, index)=>({x: labels[index], y: value}));
    const configuration = {

        type: 'line',
        data: {
            datasets: [
                {
                    label: d1.label,
                    data: d1M,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: d2.label,
                    data: d2M,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of tokens generated',
                        color: "#FFFFFF"
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Time in seconds',
                        color: "#FFFFFF"
                    }

                }
            }
        }
    };
    await(async () => {
        const image = await chartJSNodeCanvas.renderToBuffer(configuration);
        const directory = path.join(__dirname, 'Charts');
        const filename = path.join(directory, `${name}-${Date.now()}.png`);
        fs.writeFileSync(filename, image);
        console.log('Chart saved!');
    })();
}

module.exports = createChart;
