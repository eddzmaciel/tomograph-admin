import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import feathers from '../../feathers';

const barEnergyConsumption = {
  labels: ['', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'Consumo horario en KVARh',
      backgroundColor: 'rgba(128, 204, 255, 0.4)',
      borderColor: 'rgba(0, 138, 230, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0, 138, 230, 0.4)',
      hoverBorderColor: 'rgba(0, 138, 230, 1)',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return {
          backgroundColor: chart.data.datasets[tooltipItem.datasetIndex]
            .borderColor,
        };
      },
    },
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: Math.ceil (280 / 10),
          max: 280,
        },
      },
    ],
  },
};

class ChartCustomAnimation extends Component {
  constructor (props) {
    super (props);

    this.state = {
      CharEnergy: {},
      load: false,
    };
  }

  async componentWillMount () {
    this.setState ({CharEnergy: barEnergyConsumption, load: false});
  }

  async componentDidMount () {
    let limit = 0;
    let count = 0;
    let arrayLabels = [];
    let arrayEnergy = [];
    let _this = this;

    let labelsChart = this.props.labelsData;
    let valuesChart = this.props.valuesData;
    let maximum = this.props.limit ? this.props.limit : 10;

    if (labelsChart) {
      let intervalID = setInterval (function () {
        let oldCharEnergy = _this.state.CharEnergy;
        if (limit >= labelsChart.length) {
          limit = 0;
          count = 0;
          arrayEnergy = [];
          arrayLabels = [];
        }

        if (count === Number (maximum)) {
          arrayLabels.push (labelsChart[limit]);
          arrayEnergy.push (valuesChart[limit]);
          let newChartEnergySet = {
            ...oldCharEnergy,
          };

          newChartEnergySet.labels = arrayLabels;
          newChartEnergySet.datasets[0].data = arrayEnergy;

          let newStateEnergy = {
            ..._this.state,
            CharEnergy: newChartEnergySet,
          };

          _this.setState (newStateEnergy);
          _this.setState ({load: true});
          arrayEnergy = [];
          arrayLabels = [];
          count = 0;
        } else {
          arrayLabels.push (labelsChart[limit]);
          arrayEnergy.push (valuesChart[limit]);
          count++;
          limit++;
        }
      }, this.props.time || 400);
    }
  }

  render () {
    let {CharEnergy, load} = this.state;

    if (load) {
      return (
        <Line data={CharEnergy} options={this.props.options || mainChartOpts} />
      );
    } else {
      return (
        <div
          style={{
            height: '350px',
            paddingTop: '155px',
            textAlign: 'center',
          }}
        >
          <i className="fa fa-refresh" style={{fontSize: '17px'}} />
          <p style={{fontSize: '17px'}}>Cargando...</p>
        </div>
      );
    }
  }
}

export default ChartCustomAnimation;
