/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const Uploader = ({ onImageChange }) => {
    const [image, setImage] = useState(null);

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
            onImageChange(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <Dropzone onDrop={handleDrop} accept='image/*'>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} style={{ border: '1px dashed black', padding: '20px', textAlign: 'center' }}>
                        <input {...getInputProps()} />
                        <p>Drag &amp; drop an image here or click to select an image.</p>
                    </div>
                )}
            </Dropzone>
            {image && <img src={image} id='upload' alt="Uploaded" style={{ maxWidth: '100%' }} />}
        </div>
    );
};

export default Uploader;
