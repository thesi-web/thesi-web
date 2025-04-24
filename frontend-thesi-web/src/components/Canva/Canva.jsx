import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef, } from 'react';

const Canvas = forwardRef(({ imagem, setActiveRectangle, setImagemURL }, ref) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [loadedImage, setLoadedImage] = useState(null);
  const [marks, setMarks] = useState([]);
  const [isMarking, setIsMarking] = useState(false);

  useImperativeHandle(ref, () => ({
    limparRetangulos,
  }));

  useEffect(() => {
    if (!imagem) return;
  
    // Converter imagem para blob
    fetch(imagem)
      .then((response) => response.blob())
      .then((blob) => {
        const img = new Image();
        const blobUrl = URL.createObjectURL(blob);
        img.src = blobUrl;
  
        img.onload = () => {
          const canvas = canvasRef.current;
          const container = canvas.parentElement;
  
          if (canvas && container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
          }
  
          setLoadedImage(img);
  
          // libera a URL do blob quando não precisar mais
          URL.revokeObjectURL(blobUrl);
        };
      })
      .catch((err) => {
        console.error("Erro ao carregar imagem como blob:", err);
      });
  }, [imagem]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImage) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);

    marks.forEach((rect) => {
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)';
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
  }, [imagem, marks, loadedImage]);

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e) => {
    if (isMarking) return;
    const { x, y } = getMousePos(e);
    setIsDrawing(true);
    setStartX(x);
    setStartY(y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { x: currentX, y: currentY } = getMousePos(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (loadedImage) {
      ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);
    }

    marks.forEach((rect) => {
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)';
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });

    ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;

    const { x: endX, y: endY } = getMousePos(e);
    const width = endX - startX;
    const height = endY - startY;

    const newRectangle = { x: startX, y: startY, width, height };
    setIsDrawing(false);
    handleNewMark(newRectangle);

    handleImagemUrl();
  };

  const handleImagemUrl = () => {
    const canvas = canvasRef.current;
    if (canvas && loadedImage) {
      const dataURL = canvas.toDataURL();
      atualizarImagemURL(dataURL);
    } else {
      console.error("Canvas ou imagem não estão carregados corretamente");
    }
  };

  const atualizarImagemURL = (url) => {
    setImagemURL(url); // agora vem do Modal
  };

  const handleNewMark = (rectangle) => {
    setMarks((prevMarks) => [...prevMarks, rectangle]);
    setActiveRectangle(rectangle); // agora vem do Modal
    setIsMarking(true);
  };

  const handleSaveForm = (data) => {
    setMarks((prevMarks) =>
      prevMarks.map((mark) =>
        mark === activeRectangle ? { ...mark, ...data } : mark
      )
    );
    setActiveRectangle(null);
    setMarks([]);
    setIsMarking(false);
  };

  const limparRetangulos = () => {
    setMarks((prevMarks) => prevMarks.slice(0, -1));
    setActiveRectangle(null);
    setIsMarking(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
});

export default Canvas;
