import React from "react";
import { Button } from "@/components/ui/button";
import { Code, Eye } from "lucide-react";

export default function MobileToggle({ activeView, setActiveView }) {
    return (
        <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex gap-2">
                <Button
                    variant={activeView === 'code' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveView('code')}
                    className="flex-1 gap-2"
                >
                    <Code className="w-4 h-4" />
                    Code
                </Button>
                <Button
                    variant={activeView === 'preview' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveView('preview')}
                    className="flex-1 gap-2"
                >
                    <Eye className="w-4 h-4" />
                    Preview
                </Button>
            </div>
        </div>
    );
}