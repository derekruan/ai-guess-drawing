'use client';

import { useEffect, useState, type RefObject } from 'react';

interface DrawingCanvasProps {
  onImageReady?: (imageData: string) => void;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function DrawingCanvas({ onImageReady, canvasRef }: DrawingCanvasProps) {
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [brushColor, setBrushColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布背景为白色
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.closePath();

    // 通知父组件图片已准备好
    if (onImageReady) {
      const imageData = canvas.toDataURL('image/png');
      onImageReady(imageData);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const getImageData = () => {
    const canvas = canvasRef.current;
    if (!canvas) return '';

    return canvas.toDataURL('image/png');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="border-4 border-gray-800 rounded-lg shadow-2xl bg-white">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      <div className="flex gap-4 items-center bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">画笔大小：</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-600 w-8">{brushSize}px</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">颜色：</label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-12 h-8 rounded cursor-pointer"
          />
        </div>

        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          清空画布
        </button>
      </div>
    </div>
  );
}
