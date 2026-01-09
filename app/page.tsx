'use client';

import { useState, useRef } from 'react';
import DrawingCanvas from '@/components/DrawingCanvas';

export default function Home() {
  const [aiGuess, setAiGuess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const canvasRef = useRef<any>(null);

  const handleGuess = async () => {
    setIsLoading(true);
    setError('');
    setAiGuess('');

    try {
      // 从画布获取图片数据
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        throw new Error('未找到画布');
      }

      const imageData = canvas.toDataURL('image/png');

      // 调用API
      const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '请求失败');
      }

      setAiGuess(data.guess);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
      console.error('错误:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            🎨 AI你画我猜
          </h1>
          <p className="text-gray-600 text-lg">
            在画布上画出你想画的内容，让AI猜猜你画的是什么！
          </p>
        </div>

        {/* 画布 */}
        <div className="mb-6 flex justify-center">
          <DrawingCanvas canvasRef={canvasRef} />
        </div>

        {/* 猜测按钮 */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleGuess}
            disabled={isLoading}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg text-white
              transform transition-all duration-200
              ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-xl active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                AI正在思考中...
              </span>
            ) : (
              '🤖 让AI猜一猜'
            )}
          </button>
        </div>

        {/* AI的回答 */}
        {aiGuess && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-purple-200 animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🤖</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">AI的猜测：</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{aiGuess}</p>
              </div>
            </div>
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-800 mb-2">出错了：</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-8 bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-3">💡 使用说明：</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>使用鼠标在画布上自由绘画</li>
            <li>可以调整画笔大小和颜色</li>
            <li>画完后点击"让AI猜一猜"按钮</li>
            <li>AI会分析你的画作并给出猜测</li>
            <li>如果想重新开始，点击"清空画布"</li>
          </ol>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </main>
  );
}
