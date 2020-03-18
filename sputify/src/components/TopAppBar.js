import React from 'react';
import '@material/top-app-bar/dist/mdc.top-app-bar.min.css'

function TopAppBar(props) {
    return (
        <header className="mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                <span className="mdc-top-app-bar__title">{props.title}</span>
                </section>
            </div>
        </header>
    )
}

export default TopAppBar