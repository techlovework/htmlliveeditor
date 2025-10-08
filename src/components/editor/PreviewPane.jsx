import React, { useRef, useEffect } from "react";
import { Eye, ExternalLink } from "lucide-react";

export default function PreviewPane({ htmlCode }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(htmlCode);
            doc.close();
        }
    }, [htmlCode]);

    const openInNewTab = () => {
        const newWindow = window.open();
        newWindow.document.open();
        newWindow.document.write(htmlCode);
        newWindow.document.close();
    };

    return (
        <div className="h-full bg-white flex flex-col">
            {/* Preview Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">Live Preview</span>
                    </div>
                    <button
                        onClick={openInNewTab}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <ExternalLink className="w-3 h-3" />
                        Open in new tab
                    </button>
                </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-white">
                <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                    title="HTML Preview"
                />
            </div>
        </div>
    );
}