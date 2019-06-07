import React, { Component } from 'react';

class EmptyWidget extends Component {
    render() {
        return (
            <div
                style={{
                    height: this.props.height || '250px',
                    paddingTop: this.props.paddingTop || '30%',
                    textAlign: 'center'
                }}
            >
                <i className="fa fa-file" style={{ fontSize: '17px' }} />
                <p style={{ fontSize: '17px' }}>
                    No existe información por cargar...
                </p>
            </div>
        );
    }
}

export default EmptyWidget;
