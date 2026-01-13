"use client";

import { useEffect } from 'react';
import { generateSvg } from '@/lib/svg';

export default function HeadlessGenerator() {
  useEffect(() => {
    // Listen for messages from React Native
    const handleMessage = async (event: any) => {
      try {
        // RN WebView sends data as string, but sometimes object depending on implementation
        // We'll assume parsed object or parse it
        let data = event.data;
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) {
            // Ignore non-JSON messages
            return;
          }
        }

                if (data?.type === 'GENERATE_SVG') {
                  const { text, moodId, variantId, width, height, backgroundImage, isNative } = data.payload;
                  
                  const svg = await generateSvg({
                    text,
                    moodId,
                    variantId,
                    width,
                    height,
                    backgroundImage,
                    isNative
                  });
          // Send result back
          // @ts-ignore
          if (window.ReactNativeWebView) {
            // @ts-ignore
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'SVG_GENERATED',
              payload: svg
            }));
          }
        }
      } catch (e) {
        console.error("Generation error", e);
      }
    };

    // For iOS/Android WebView
    window.addEventListener('message', handleMessage);
    // For some android versions
    document.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Headless Generator Active</h1>
      <p>Waiting for commands...</p>
    </div>
  );
}
