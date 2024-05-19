import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { Context } from '../main';
function Entry(props) {
    const { isAuthenticated } = useContext(Context);

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

}

export default Entry;