import React, { useState, useEffect } from "react";
import { Palette, Code, Eye, Download, Upload, RotateCcw } from "lucide-react";
import EditorPane from "../components/editor/EditorPane";
import PreviewPane from "../components/editor/PreviewPane";
import EditorHeader from "../components/editor/EditorHeader";
import MobileToggle from "../components/editor/MobileToggle";

const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Webpage</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 700;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        p {
            font-size: 1.2rem;
            opacity: 0.9;
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .button {
            background: rgba(255,255,255,0.2);
            border: 2px solid rgba(255,255,255,0.3);
            color: white;
            padding: 12px 30px;
            border-radius: 50px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .button:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Editor</h1>
        <p>Start editing the code on the left to see your changes appear here instantly. Create beautiful websites with HTML, CSS, and JavaScript!</p>
        <button class="button" onclick="alert('Hello from your webpage!')">Click me!</button>
    </div>
    
    <script>
        console.log('Your webpage is ready!');
    </script>
</body>
</html>`;

export default function CodeEditor() {
    const [htmlCode, setHtmlCode] = useState(defaultHTML);
    const [activeView, setActiveView] = useState('split'); // split, code, preview
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleReset = () => {
        setHtmlCode(defaultHTML);
    };

    const handleDownload = () => {
        const blob = new Blob([htmlCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = (e) => {
                setHtmlCode(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <EditorHeader 
                onReset={handleReset}
                onDownload={handleDownload}
                onUpload={handleUpload}
            />
            
            {isMobile && (
                <MobileToggle 
                    activeView={activeView}
                    setActiveView={setActiveView}
                />
            )}

            <div className="flex-1 flex overflow-hidden">
                {/* Code Editor */}
                <div className={`${
                    isMobile 
                        ? activeView === 'code' ? 'w-full' : 'hidden'
                        : 'w-1/2'
                } transition-all duration-300 ease-in-out`}>
                    <EditorPane 
                        htmlCode={htmlCode}
                        setHtmlCode={setHtmlCode}
                    />
                </div>

                {/* Divider */}
                {!isMobile && (
                    <div className="w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200"></div>
                )}

                {/* Preview */}
                <div className={`${
                    isMobile 
                        ? activeView === 'preview' ? 'w-full' : 'hidden'
                        : 'w-1/2'
                } transition-all duration-300 ease-in-out`}>
                    <PreviewPane htmlCode={htmlCode} />
                </div>
            </div>
        </div>
    );
}