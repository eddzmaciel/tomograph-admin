import React, { Component } from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush,
    AreaChart,
    Area
} from 'recharts';
import { Col, Row } from 'reactstrap';
import ContainerDimensions from 'react-container-dimensions';

class AreaChartCustom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CharEnergy: {},
            load: false
        };
    }

    async componentWillMount() {
        this.setState({ load: false });
    }

    async componentDidMount() {
        let _this = this;
        setInterval(function() {
            if (_this.props.data !== _this.state.CharEnergy) {
                _this.setState({ CharEnergy: _this.props.data, load: true });
            }
        }, 5000);
    }

    render() {
        let { CharEnergy, load } = this.state;

        if (load) {
            return (
                <Row>
                    <Col md={12}>
                        <ContainerDimensions>
                            {({ width, height }) => (
                                <div>
                                    <AreaChart
                                        width={width}
                                        height={300}
                                        data={CharEnergy}
                                        syncId="anyId"
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="labels" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="energy"
                                            stroke="#deab0ffa"
                                            fill="#ffd24afa"
                                        />
                                        <Brush
                                            startIndex={0}
                                            endIndex={1000}
                                            style={{ display: 'none' }}
                                        />
                                    </AreaChart>
                                    <AreaChart
                                        width={width}
                                        height={300}
                                        data={CharEnergy}
                                        syncId="anyId"
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="labels" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="energyReactive"
                                            stroke="#808080"
                                            fill="#b5b5b5"
                                        />
                                    </AreaChart>
                                </div>
                            )}
                        </ContainerDimensions>
                    </Col>
                </Row>
            );
        } else {
            return (
                <div
                    style={{
                        height: '350px',
                        paddingTop: '155px',
                        textAlign: 'center'
                    }}
                >
                    <i className="fa fa-refresh" style={{ fontSize: '17px' }} />
                    <p style={{ fontSize: '17px' }}>Cargando...</p>
                </div>
            );
        }
    }
}

export default AreaChartCustom;
