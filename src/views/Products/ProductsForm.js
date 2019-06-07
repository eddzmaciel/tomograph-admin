import immutable from 'object-path-immutable';
import React, { Component } from 'react';
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
} from 'reactstrap';
import swal from 'sweetalert';
import feathers from '../../feathers';
import Select from 'react-select';
import Upload from '../../libCustom/upload';
class ProductsForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         id: props.match.params.id,
         loading: true,
         invalidInput: false,
         data: [],
         total: 0,
         formData: {
            title: '',
            subtitle: '',
            description: '',
            price: 0,
            image: [],
            category: '',
            subcategory: ''
         },
         categoriesList: [],
         subcategoriesList: []
      };
   }

   async componentWillMount() {
      let _this = this;
      this.getCategories();
      this.getSubCategories();
      if (this.state.id != 'form') {
         let find = await feathers.service('products').get(_this.state.id);
         this.setState({
            formData: {
               title: find.title,
               subtitle: find.subtitle,
               description: find.description,
               price: find.price,
               image: find.image,
               category: find.category,
               subcategory: find.subcategory
            },
            loading: false
         });
      } else {
         this.setState({
            loading: false
         });
      }
   }

   onChange = (path, value) => {
      let newFormData;
      newFormData = immutable.set(this.state.formData, path, value);
      this.setState({
         formData: newFormData
      });
   };

   onAdd = async () => {
      let _this = this;
      let products;
      let { formData } = this.state;
      if (
         formData.name !== '' &&
         formData.category !== '' &&
         formData.subcategory !== ''
      ) {
         try {
            if (this.state.id == 'form') {
               products = await feathers
                  .service('products')
                  .create(_this.state.formData);
               swal('Exito', 'Agregado correctamente', 'success', {
                  timer: 900,
                  buttons: false
               });
               this.props.history.push('/products');
            } else {
               products = await feathers
                  .service('products')
                  .patch(_this.state.id, _this.state.formData);
               swal('Exito', 'Actualizado correctamente', 'success', {
                  timer: 900,
                  buttons: false
               });
               this.props.history.push('/products');
            }
            this.setState({ invalidInput: false });
         } catch (error) {
            console.log('seems exist an issue there!-->', error);
         }
      } else {
         this.setState({ invalidInput: true });
         swal(
            'Alerta',
            '¡Es necesario  llenar los campos obligatorios, seleccionar categoría y subcategoría !',
            'warning',
            {
               timer: 1500,
               buttons: false
            }
         );
      }
   };

   getCategories = async () => {
      let categories = await feathers.service('categories').find({});
      let empty = [
         {
            value: 0,
            label: 'Sin Información'
         }
      ];
      categories = categories.data.map(category => {
         return {
            value: category._id,
            label: category.name
         };
      });
      if (categories.length > 0) {
         this.setState({ categoriesList: categories });
      } else {
         this.setState({ categoriesList: empty });
      }
   };

   getSubCategories = async () => {
      let subcategories = await feathers.service('subcategories').find({});
      let empty = [
         {
            value: 0,
            label: 'Sin Información'
         }
      ];
      subcategories = subcategories.data.map(subcategory => {
         return {
            value: subcategory._id,
            label: subcategory.name
         };
      });
      if (subcategories.length > 0) {
         this.setState({ subcategoriesList: subcategories });
      } else {
         this.setState({ subcategoriesList: empty });
      }
   };
   render() {
      var {
         formData,
         invalidInput,
         categoriesList,
         subcategoriesList
      } = this.state;

      let findInCategoryArray = id => categoriesList.find(o => o.value === id);
      let findInSubcategoryArray = id =>
         subcategoriesList.find(o => o.value === id);

      return (
         <div>
            {this.state.loading ? (
               'Cargando...'
            ) : (
               <div className="animated fadeIn">
                  <Row>
                     <Col xs="12" lg="12">
                        <Card>
                           <CardBody>
                              <Row>
                                 <Col md={12}>
                                    <h4>Información del producto</h4>
                                 </Col>
                              </Row>

                              <Row>
                                 <Col md={3}>
                                    <div className="form-group">
                                       <label htmlFor="title">Título:</label>
                                       <Input
                                          invalid={
                                             formData.title !== ''
                                                ? false
                                                : invalidInput
                                          }
                                          type="text"
                                          className="form-control"
                                          id="title"
                                          value={formData.title}
                                          onChange={event =>
                                             this.onChange(
                                                'title',
                                                event.target.value
                                             )
                                          }
                                       />
                                    </div>
                                 </Col>
                                 <Col md={3}>
                                    <div className="form-group">
                                       <label htmlFor="subtitle">
                                          Subtitulo:
                                       </label>
                                       <Input
                                          invalid={
                                             formData.subtitle !== ''
                                                ? false
                                                : invalidInput
                                          }
                                          type="text"
                                          className="form-control"
                                          id="description"
                                          value={formData.subtitle}
                                          onChange={event =>
                                             this.onChange(
                                                'subtitle',
                                                event.target.value
                                             )
                                          }
                                       />
                                    </div>
                                 </Col>
                                 <Col md={6}>
                                    <div className="form-group">
                                       <label htmlFor="description">
                                          Descripción:
                                       </label>
                                       <Input
                                          invalid={
                                             formData.description !== ''
                                                ? false
                                                : invalidInput
                                          }
                                          type="text"
                                          className="form-control"
                                          id="description"
                                          value={formData.description}
                                          onChange={event =>
                                             this.onChange(
                                                'description',
                                                event.target.value
                                             )
                                          }
                                       />
                                    </div>
                                 </Col>
                              </Row>

                              <Row>
                                 <Col md={4}>
                                    <div className="form-group">
                                       <label htmlFor="price">Precio:</label>
                                       <Input
                                          invalid={
                                             formData.price !== ''
                                                ? false
                                                : invalidInput
                                          }
                                          type="number"
                                          className="form-control"
                                          id="price"
                                          value={formData.price}
                                          onChange={event =>
                                             this.onChange(
                                                'price',
                                                event.target.value
                                             )
                                          }
                                       />
                                    </div>
                                 </Col>

                                 <Col md={4}>
                                    <div className="form-group">
                                       <label htmlFor="category">
                                          Categoría:
                                       </label>
                                       <Select
                                          placeholder="-- Seleccionar -- "
                                          name="category"
                                          value={findInCategoryArray(
                                             formData.category
                                          )}
                                          options={categoriesList}
                                          onChange={event =>
                                             this.onChange(
                                                'category',
                                                event.value
                                             )
                                          }
                                       />
                                    </div>
                                 </Col>
                                 <Col md={4}>
                                    <div className="form-group">
                                       <label htmlFor="subcategory">
                                          Sub Categoría:
                                       </label>
                                       <Select
                                          placeholder="-- Seleccionar -- "
                                          name="subcategory"
                                          value={findInSubcategoryArray(
                                             formData.subcategory
                                          )}
                                          options={subcategoriesList}
                                          onChange={event =>
                                             this.onChange(
                                                'subcategory',
                                                event.value
                                             )
                                          }
                                       />
                                    </div>
                                 </Col>
                              </Row>
                              {/* <Row>
                                 <Col md={12}>
                                    <div className="form-group">
                                       <label htmlFor="image">Imagen:</label>
                                       <Input
                                          invalid={
                                             formData.image !== ''
                                                ? false
                                                : invalidInput
                                          }
                                          type="text"
                                          className="form-control"
                                          id="image"
                                          value={formData.image}
                                          onChange={event =>
                                             this.onChange(
                                                'image',
                                                event.target.value
                                             )
                                          }
                                       />
                                    </div>
                                 </Col>
                              </Row> */}

                              <Row>
                                 <Col md={12}>
                                    <div className="form-group">
                                       <label htmlFor="image">Imagen:</label>

                                       <Upload
                                          label={'ARCHIVOS'}
                                          files={formData.image}
                                          directory={'productos'}
                                          multiple={false}
                                          onChange={file => {
                                             this.onChange('image', file);
                                          }}
                                       />
                                    </div>
                                 </Col>
                              </Row>

                              <Row
                                 className="pull-right"
                                 style={{
                                    marginTop: '5px',
                                    paddingRight: '5px'
                                 }}
                              >
                                 <Col col="6" sm="6" md="6">
                                    <Button
                                       color="secondary"
                                       outline
                                       onClick={() =>
                                          this.props.history.push('/products')
                                       }
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

export default ProductsForm;
