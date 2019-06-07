import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import Radium from 'radium';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

const styles = {
  fileCell: {
    display: 'flex',
    boxSizing: 'border-box',
    height: '72px',
    fontSize: '14px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: '12px',
    color: '#444',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  container: {
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderBottom: '1px solid #e8e8e8',
  },
  noFiles: {
    color: '#999',
  },
  dropzoneContainer: {
    color: '#000',
    padding: '16px',
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.04)',
    },
  },
  dropzone: {
    display: 'flex',
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    border: '1px dashed #999',
    cursor: 'default',
    color: '#888888',
    fontSize: '14px',
  },
  filesList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  fileItem: {
    justifyContent: 'space-between',
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.04)',
    },
  },
  fileInfo: {
    display: 'flex',
    flexGrow: 1,
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  leftIcon: {
    marginRight: '16px',
  },
  infoContainer: {
    flexGrow: 1,
  },
  fileActions: {
    paddingRight: '16px',
  },
  captionTextField: {
    width: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
  },
  fa: {
    borderRadius: '60px',
    boxShadow: '0px 0px 2px #888',
    padding: '0.5em 0.6em',
    color: '#fff',
    backgroundColor: '#0086af',
    marginRight: '10px',
    marginTop: '10px',
  },
  link: {
    color: '#016584',
  },
};

var dataDeleteIndex = null;

class SLUpload extends Component {
  constructor (props) {
    super (props);

    this.state = {
      files: this.props.files != undefined ? this.props.files : [],
      openConfirm: false,
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState ({
      files: nextProps.files != undefined ? nextProps.files : [],
    });
  }

  onDrop (droppedFiles) {
    let newFiles = this.state.files;

    droppedFiles.forEach (file => {
      let newFileName =
        Math.floor (Math.random () * 90000) + 10000 + '_' + file.name;
      const f = {
        name: newFileName,
        comments: '',
        progress: 0,
      };

      //Upload to server
      var data = new FormData ();
      data.append ('file', file);

      console.log ('data', file);
      axios
        .post (process.env.REACT_APP_URL_FEATHERS + '/upload', data)
        .then (res => {
          console.log (res);
          newFiles.push ({
            ...f,
            name: res.data.id,
          });

          this.props.onChange (newFiles);

          this.setState ({files: newFiles});
        })
        .catch (function (err) {});

      //newFiles.push(f);
    });
  }

  handleCommentsChange = (event, index) => {
    let newFiles = JSON.parse (JSON.stringify (this.state.files));
    newFiles[index].comments = event.target.value;
    this.props.onChange (newFiles);
    this.setState ({files: newFiles});
  };

  onDelete = (confirm, index) => {
    if (index != undefined) dataDeleteIndex = index;

    let _this = this;
    let newFiles = [...this.state.files];

    if (confirm) {
      var nameToDelete = newFiles[dataDeleteIndex].name;

      axios
        .delete (process.env.REACT_APP_URL_FEATHERS + '/upload/' + nameToDelete)
        .then (function (res) {
          console.log (res);
        })
        .catch (function (err) {});

      //Todo: revisar si cada que se guarda se puede borrar también en el servidor o como hacerle.
      newFiles.splice (dataDeleteIndex, 1);
      _this.props.onChange (newFiles);
      _this.setState ({files: newFiles, openConfirm: false});
    } else {
      this.setState ({openConfirm: true});
    }
  };

  render () {
    const {label, accept, multiple} = this.props;
    const {files, openConfirm, openSuccess} = this.state;

    return (
      <div>
        {openConfirm &&
          <SweetAlert
            warning
            style={{display: 'block', marginTop: '-100px'}}
            title="¿Estás Seguro de borrar el archivo?"
            onConfirm={() => this.onDelete (true)}
            onCancel={() => this.setState ({openConfirm: false})}
            confirmBtnBsStyle="info"
            cancelBtnBsStyle="danger"
            confirmBtnText="Si, borrar!"
            cancelBtnText="Cancelar"
            showCancel
          >
            No podrás desaser está opción!
          </SweetAlert>}

        <h5 style={styles.label}>{label}</h5>
        <div style={styles.container}>
          {/* No files placeholder */}
          {/* {this.state.files.length === 0 ? (
           <div style={[styles.fileCell, styles.noFiles]}>
           Ningún archivo
           </div>
           ) : null} */}
          {/* No files placeholder */}

          {/* Files list */}
          <ul style={styles.filesList}>
            {files.map ((file, index) => {
              return (
                <li
                  key={index}
                  style={{...styles.fileCell, ...styles.fileItem}}
                >
                  <div style={styles.fileInfo}>
                    {/* <Avatar style={styles.leftIcon}>
                                            <FolderIcon />
                                        </Avatar> */}
                    <div>
                      <i className="fa fa-folder" style={styles.fa} />
                    </div>

                    <div style={styles.infoContainer}>
                      <div>
                        <a
                          href={
                            process.env.REACT_APP_URL_FEATHERS +
                              '/uploads/' +
                              file.name
                          }
                          target="_blank"
                          style={styles.link}
                        >
                          Ver el archivo {file.name}
                        </a>
                      </div>
                      <input
                        type="text"
                        style={styles.captionTextField}
                        placeholder="Escribe un comentarios..."
                        value={file.comments}
                        onChange={event =>
                          this.handleCommentsChange (event, index)}
                      />
                    </div>
                  </div>
                  <div style={styles.fileActions}>
                    <Button
                      color="delete"
                      onClick={event => this.onDelete (false, index)}
                    >
                      <i className="fa fa-trash" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* Files list */}

          {/* Dropzone */}
          {multiple
            ? <div style={{...styles.fileCell, ...styles.dropzoneContainer}}>
                <Dropzone
                  onDrop={this.onDrop.bind (this)}
                  multiple={multiple ? true : false}
                  maxSize={8000000}
                >
                  {({getRootProps, getInputProps}) => (
                    <div
                      {...getRootProps ()}
                      className={styles.uploadButton}
                      style={styles.dropzone}
                    >
                      <input {...getInputProps ()} />
                      <p>Arrastra tus archivos o haz click aquí</p>
                    </div>
                  )}
                </Dropzone>
                {/* <Dropzone
                accept={accept}
                onDrop={this.onDrop.bind(this)}
                style={styles.dropzone}
                multiple={multiple ? true : false}
              >
                <p>Arrastra tus archivos o haz click aquí</p>
              </Dropzone> */}
              </div>
            : files.length === 0
                ? <div
                    style={{...styles.fileCell, ...styles.dropzoneContainer}}
                  >
                    <Dropzone
                      onDrop={this.onDrop.bind (this)}
                      multiple={multiple ? true : false}
                      maxSize={8000000}
                    >
                      {({getRootProps, getInputProps}) => (
                        <div
                          {...getRootProps ()}
                          className={styles.uploadButton}
                          style={styles.dropzone}
                        >
                          <input {...getInputProps ()} />
                          <p>Arrastra tus archivos o haz click aquí</p>
                        </div>
                      )}
                    </Dropzone>
                    {/* <Dropzone
                accept={accept}
                onDrop={this.onDrop.bind(this)}
                style={styles.dropzone}
                multiple={multiple ? true : false}
              >
                <p>Arrastra el archivos o haz click aquí</p>
              </Dropzone> */}
                  </div>
                : null}
          {/* Dropzone */}
        </div>
      </div>
    );
  }
}

SLUpload.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Radium (SLUpload);
