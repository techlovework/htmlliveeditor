
import React, { useRef, useEffect } from "react";
import { Code } from "lucide-react";

// A more robust syntax highlighting function
const highlightSyntax = (code) => {
  if (!code) return '';

  const sanitizedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Split by comments and tags to process them separately
  const parts = sanitizedCode.split(/(<!--[\s\S]*?-->|<[^>]+>)/g);

  return parts
    .map((part) => {
      if (!part) return "";
      // It's a comment
      if (part.startsWith("&lt;!--")) {
        return `<span style="color: #6b7280;">${part}</span>`;
      }
      // It's a tag
      if (part.startsWith("&lt;")) {
        return part
          .replace(/([a-zA-Z-]+)=/g, '<span style="color: #fbbf24;">$1</span>=') // Attribute names
          .replace(/"([^"]*)"/g, '"<span style="color: #34d399;">$1</span>"') // Attribute values
          .replace(/&lt;\/?([\w\d-]+)/g, (match, tagName) => {
            const isClosing = match.startsWith('&lt;/');
            return `${isClosing ? '&lt;/' : '&lt;'}<span style="color: #f87171;">${tagName}</span>`;
          }); // Tag names
      }
      // It's plain text content
      return part;
    })
    .join("");
};


export default function EditorPane({ htmlCode, setHtmlCode }) {
    const textareaRef = useRef(null);
    const highlightRef = useRef(null);

    useEffect(() => {
        // Sync scroll between textarea and highlight overlay
        const syncScroll = (e) => {
            if (highlightRef.current) {
                highlightRef.current.scrollTop = e.target.scrollTop;
                highlightRef.current.scrollLeft = e.target.scrollLeft;
            }
        };

        const textarea = textareaRef.current;
        if (textarea) {
            textarea.addEventListener('scroll', syncScroll);
            return () => textarea.removeEventListener('scroll', syncScroll);
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newValue = htmlCode.substring(0, start) + '    ' + htmlCode.substring(end);
            setHtmlCode(newValue);
            
            // Set cursor position after the inserted spaces
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0);
        }
    };

    return (
        <div className="h-full bg-gray-900 flex flex-col">
            {/* Editor Header */}
            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-2 text-gray-300">
                    <Code className="w-4 h-4" />
                    <span className="text-sm font-medium">index.html</span>
                    <div className="ml-auto flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Line Numbers & Code Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Line Numbers */}
                <div className="bg-gray-800 px-3 py-4 border-r border-gray-700 select-none flex-shrink-0">
                    <div className="text-gray-500 text-sm font-mono leading-6">
                        {htmlCode.split('\n').map((_, index) => (
                            <div key={index} className="text-right">
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code Input */}
                <div className="flex-1 relative overflow-auto">
                    <textarea
                        ref={textareaRef}
                        value={htmlCode}
                        onChange={(e) => setHtmlCode(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="absolute inset-0 w-full h-full bg-transparent p-4 font-mono text-sm leading-6 resize-none focus:outline-none overflow-auto"
                        style={{
                            color: 'white', /* Sets text color for selection, but is overridden for display */
                            WebkitTextFillColor: 'transparent', /* Makes the text itself transparent */
                            caretColor: '#60a5fa',
                            whiteSpace: 'pre', // Prevent text wrapping
                        }}
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                    />
                    
                    {/* Syntax Highlighting Overlay */}
                    <div
                        ref={highlightRef}
                        className="absolute inset-0 pointer-events-none p-4 font-mono text-sm leading-6 overflow-auto text-gray-100"
                        style={{
                            whiteSpace: 'pre', // Prevent text wrapping
                        }}
                    >
                        <div
                            className="syntax-highlight"
                            dangerouslySetInnerHTML={{ __html: highlightSyntax(htmlCode) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
