import React from 'react'

const Base = ({
    title = "My Title",
    description = "My Description",
    className="bg-dark text-white p-4",
    children
    }) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display4">{title}</h2>
                    <p className="lead">
                        {description}
                    </p>
                </div>
                <div className={className}>
                    {children}
                </div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center">
                    <h4>If you got any query</h4>
                    <button className="btn btn-warning btn-lg">
                        Contact Us
                    </button>
                </div>
                <div className="container-fluid">
                    <span className="text-muted">
                        An amazing mern bootcamp
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base
