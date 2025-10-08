import React from "react";
import { Button } from "@/components/ui/button";
import { Code, Download, Upload, RotateCcw, Palette } from "lucide-react";

export default function EditorHeader({ onReset, onDownload, onUpload }) {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Code className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">HTML Editor</h1>
                        <p className="text-sm text-gray-500">Live preview editor</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="file"
                        accept=".html"
                        onChange={onUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('file-upload').click()}
                        className="gap-2 text-gray-700 hover:text-gray-900"
                    >
                        <Upload className="w-4 h-4" />
                        <span className="hidden sm:inline">Upload</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onDownload}
                        className="gap-2 text-gray-700 hover:text-gray-900"
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onReset}
                        className="gap-2 text-gray-700 hover:text-gray-900"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="hidden sm:inline">Reset</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}