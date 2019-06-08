import immutable from "object-path-immutable";
import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  Input,
  Row,
  FormGroup,
  Label
} from "reactstrap";
import swal from "sweetalert";
import feathers from "../../feathers";
import Select from "react-select";

class ViewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      loading: true,
      data: [],
      total: 0,
      formData: {
        name: "",
        description: ""
      },
      transportsList: [],
      invalidInput: false
    };
  }

  async componentWillMount() {}

  onChange = (path, value) => {
    let newFormData;
    newFormData = immutable.set(this.state.formData, path, value);
    this.setState({
      formData: newFormData
    });
  };

  render() {
    var { formData, invalidInput, transportsList } = this.state;
    const valueFromIdTransports = id =>
      transportsList.find(o => o.value === id);
    return (
      <div>
        {this.state.loading ? (
          "Cargando..."
        ) : (
          <div className="animated fadeIn">
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <h4>Información</h4>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="form-group">
                          <label htmlFor="name">Nombre:</label>
                          <Input
                            invalid={
                              formData.name !== "" ? false : invalidInput
                            }
                            type="text"
                            className="form-control"
                            id="name"
                            value={formData.name}
                            onChange={event =>
                              this.onChange("name", event.target.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col md={8}>
                        <div className="form-group">
                          <label htmlFor="description">Descripción:</label>
                          <Input
                            invalid={
                              formData.description !== "" ? false : invalidInput
                            }
                            type="text"
                            className="form-control"
                            id="description"
                            value={formData.description}
                            onChange={event =>
                              this.onChange("description", event.target.value)
                            }
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row
                      className="pull-right"
                      style={{
                        marginTop: "5px",
                        paddingRight: "5px"
                      }}
                    >
                      <Col col="6" sm="6" md="6">
                        <Button
                          color="secondary"
                          outline
                          onClick={() => this.props.history.push("/categories")}
                          className="pull-right"
                        >
                          Cancelar
                        </Button>
                      </Col>
                      <Col col="6" sm="6" md="6">
                        <Button
                          color="success"
                          onClick={this.onAdd}
                          className="pull-right"
                        >
                          Guardar
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default ViewForm;
