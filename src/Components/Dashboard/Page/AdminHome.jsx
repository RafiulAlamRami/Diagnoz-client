import React from 'react';
import useAuth from '../../Hooks/useAuth';

const AdminHome = () => {

    const {user}=useAuth()
    return (
        <div>
            <div>
                <h2>
                    <span>Hi ,Welcome </span>
                    {
                        user?.displayName ? user?.displayName : 'Back'
                    }
                </h2>
            </div>
        </div>
    );
};

export default AdminHome;