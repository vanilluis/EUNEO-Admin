// React&NextJS
import React from 'react'
// Context&Auth
// Components

//HOC used to create private routes
//Wrap around pages to make them private
const withAuth = (Component) => {
    const Auth = (props) => {
        return <></>
    }

    //getInitialProps:
    //enables server-side rendering in a page and allows you to do initial
    //data population, it means sending the page with the data already populated
    //from the server. This is especially useful for SEO.
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps
    }

    return Auth
}

export default withAuth
