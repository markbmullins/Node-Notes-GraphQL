import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Notes from '../Notes/Notes';

const Router = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Notes} />
            <Route path="/notes/" component={Notes} />
        </BrowserRouter>
    );
};

export default Router;