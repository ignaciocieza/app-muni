import React from 'react';
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './errorBoundary.styles';

//(*performance)
class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        };
    }

    //metodo estatico de React.Component, que detecta el error
    static getDerivedStateFromError(error) {
        return { hasErrored: true };
    }

    //metodo de ciclo de vida que agarra el error
    componentDidCatch(error, info) {
        console.error(error);
    }

    /**
     *  children : es el rendeo de los componentes hijos.
     *      Por esto, se debe poner en el orden superior    
     * */
    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/qIufhof.png' />
                    <ErrorImageText>Página Fuera de Servicio </ErrorImageText>
                </ErrorImageOverlay>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
