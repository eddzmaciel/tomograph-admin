import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import feathers from "../../feathers";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0
    };
  }

  async componentWillMount() {
    var _this = this;

    let categoriesData = await feathers.service("categories").find({
      query: {}
    });
    console.log("categoriesData", categoriesData);
    this.setState({
      data: categoriesData.data,
      total: categoriesData.total
    });
  }

  render() {
    const { data } = this.state;
    const columns = [
      {
        dataField: "name",
        text: "Nombre",
        sort: true
      },

      {
        dataField: "description",
        text: "Descripción",
        sort: true
      },

      {
        dataField: "actions",
        text: "Acciones",
        formatter: (cell, row) => {
          return (
            <Row>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button
                  color="link"
                  onClick={() =>
                    this.props.history.push("/categories/" + row._id)
                  }
                >
                  Editar
                </Button>
              </Col>
            </Row>
          );
        }
      }
    ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <Row
                className="pull-right"
                style={{
                  marginTop: "5px",
                  paddingRight: "5px"
                }}
              >
                <Col col="12" sm="12" md="12">
                  <Button
                    color="success"
                    onClick={() => this.props.history.push("/categories/form")}
                    className="pull-right"
                  >
                    Agregar
                  </Button>
                </Col>
              </Row>
              <Row>
                <CardBody>
                  <BootstrapTable
                    keyField="_id"
                    data={this.state.data}
                    columns={columns}
                    bootstrap4
                    striped
                    hover
                  />
                </CardBody>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Categories;
