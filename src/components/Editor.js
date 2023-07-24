import React, { useRef, useEffect, useState } from 'react';

const Editor = ({ image }) => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [canvasImage, setCanvasImage] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [endPos, setEndPos] = useState({ x: 0, y: 0 });
    const [shape, setShape] = useState(null);

    useEffect(() => {
        const im = imageRef.current;
        const ctx = im.getContext('2d');

        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, im.width, im.height);
        };

        img.src = image;
    }, [image]);

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        setEndPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        setEndPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        drawShape();
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const drawShape = () => {
        const im = imageRef.current;
        const ctx = im.getContext('2d');
        const canvas = canvasRef.current;
        const ctxn = canvas.getContext('2d');

        const imag = document.getElementById("upload");

        ctxn.clearRect(0, 0, im.width, im.height);

        if (shape === 'rectangle') {
            ctx.strokeStyle = 'red';
            ctx.clearRect(startPos.x, startPos.y, endPos.x, endPos.y);
            ctx.strokeRect(startPos.x, startPos.y, endPos.x, endPos.y);
            ctxn.drawImage(imag, startPos.x, startPos.y, endPos.x, endPos.y, 0, 0, canvas.width, canvas.height);
            ctxn.filter = 'grayscale(1)';
        } else if (shape === 'square') {
            const size = Math.max(Math.abs(endPos.x - startPos.x), Math.abs(endPos.y - startPos.y));
            ctx.strokeStyle = 'blue';
            ctxn.clearRect(startPos.x, startPos.y, endPos.x, endPos.y);
            ctx.strokeRect(startPos.x, startPos.y, endPos.x, endPos.y);
            ctxn.drawImage(imag, startPos.x, startPos.y, size, size, 0, 0, canvas.width, canvas.height);
            ctxn.filter = 'grayscale(1)';
        }
    };

    const handleSaveImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'output.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div>
            <canvas
                ref={imageRef}
                width={400}
                height={400}
                style={{ border: '1px solid black' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{ border: '1px solid black' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            <div>
                <button onClick={() => setShape('rectangle')}>Draw Rectangle</button>
                <button onClick={() => setShape('square')}>Draw Square</button>
                <button onClick={handleSaveImage}>Save Image</button>
            </div>
        </div>
    );
};

export default Editor;
