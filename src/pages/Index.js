'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import Uploader from '../components/Uploader';
import Editor from '../components/Editor';

const Index = () => {
    const [processedImage, setProcessedImage] = useState(null);

    const handleImageChange = (imageData) => {
        setProcessedImage(null);
        setProcessedImage(imageData);
    };

    return (
        <div>
            <Head>
                <title>Image Editor</title>
                <meta name="description" content="Next.js Image Editor" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Image Editor</h1>
                <Uploader onImageChange={handleImageChange} />
                {processedImage && <Editor image={processedImage} />}
            </main>
        </div>
    );
};

export default Index;