import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SeparatePage = () => {

    const { id } = useParams()

    useEffect(() => {
        console.log('cjhck', id)
    })

    return (
        <div>
            Dick
        </div>
    );
};

export default SeparatePage;