class ChartRenderer {
  constructor(container) {
    this.container = container;

    const data = {
      labels: [],
      datasets: [
        {
          label: 'Temperature',
          data: [],
          display: false,
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(255, 255, 255)',
          fill: false,
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        },
      ]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            type: 'time',
            time: {
              // Luxon format string
              tooltipFormat: 'DD T'
            },
            title: {
              display: false,
              text: '',
            }
          },
          y: {
            display: true,
            title: {
              display: false,
              text: '',
            }
          }
        }
      }
    };

    this.chart = new Chart(
      this.container,
      config
    );
  }

  setPoints(points) {
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
      for (let i = 0; i < points.length; i += 1) {
        dataset.data.push({
          x: new Date(points[i].time),
          y: points[i].value,
        });
      }
    });
    this.chart.update('none');
  }
}

export default ChartRenderer;
