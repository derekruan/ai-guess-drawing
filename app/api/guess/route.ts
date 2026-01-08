import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();

    if (!imageData) {
      return NextResponse.json(
        { error: '没有提供图片数据' },
        { status: 400 }
      );
    }

    const apiKey = process.env.SILICONFLOW_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API密钥未配置' },
        { status: 500 }
      );
    }

    // 调用硅基流动API
    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'Qwen/QVQ-72B-Preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: '请仔细观察这张图片，描述你看到的内容。如果这是一幅画，请猜测画的是什么。请用简短的中文回答（不超过50字），直接说出你的判断，不要说"我看到"之类的开场白。'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API错误:', errorData);
      return NextResponse.json(
        { error: `API调用失败: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 提取AI的回答
    const aiGuess = data.choices?.[0]?.message?.content || '无法识别图片内容';

    return NextResponse.json({
      guess: aiGuess,
      fullResponse: data
    });

  } catch (error) {
    console.error('服务器错误:', error);
    return NextResponse.json(
      { error: '服务器处理错误', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
