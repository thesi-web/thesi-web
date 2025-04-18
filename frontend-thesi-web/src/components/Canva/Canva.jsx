import React, { useRef, useState, useEffect } from "react";

const Canva = ({ imagemURL, onNewMark, onImagemURLChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [activeRectangle, setActiveRectangle] = useState(null);
  const [marks, setMarks] = useState([]);
  const [isMarking, setIsMarking] = useState(false);
  const [loadedImage, setLoadedImage] = useState(null);

  // Carrega imagem quando imagemURL muda
  useEffect(() => {
    if (!imagemURL) return;
    const img = new Image();
    img.onload = () => setLoadedImage(img);
    img.src = imagemURL;
  }, [imagemURL]);

  // Redesenha o canvas quando a imagem ou os retângulos mudam
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImage) return;
    const ctx = canvas.getContext('2d');
    canvas.width = loadedImage.width;
    canvas.height = loadedImage.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(loadedImage, 0, 0);

    marks.forEach((rect) => {
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)';
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
  }, [loadedImage, marks]);

  const handleMouseDown = (e) => {
    if (isMarking) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !loadedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(loadedImage, 0, 0);

    marks.forEach((mark) => {
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)';
      ctx.lineWidth = 2;
      ctx.strokeRect(mark.x, mark.y, mark.width, mark.height);
    });

    // Retângulo atual em vermelho
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const width = endX - startX;
    const height = endY - startY;

    const newRectangle = { x: startX, y: startY, width, height };
    setMarks((prev) => [...prev, newRectangle]);
    setActiveRectangle(newRectangle);
    setIsDrawing(false);
    setIsMarking(true);

    if (onNewMark) onNewMark(newRectangle);
    handleImagemUrl();
  };

  const handleImagemUrl = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      if (onImagemURLChange) onImagemURLChange(dataURL);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "1px solid #ccc", cursor: isMarking ? "not-allowed" : "crosshair" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Canva;
