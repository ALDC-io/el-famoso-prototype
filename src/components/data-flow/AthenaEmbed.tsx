"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { config } from "@/config/prospect";
import { NodeDetailPanel } from "./NodeDetailPanel";
import { ExternalLink, Network, Loader2 } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  description: string;
  group: string;
  groupLabel: string;
  tier: number;
  color: string;
  logo?: string;
}

export function AthenaEmbed() {
  const { athenaUrl, graphName } = config.dataFlow;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const isValidOrigin =
      event.origin.includes("athena") ||
      event.origin.includes("azurecontainerapps.io") ||
      event.origin.includes("aldc.io");

    if (!isValidOrigin) return;

    if (event.data?.type === "nodeSelected") {
      setSelectedNode(event.data.node);
    } else if (event.data?.type === "nodeDeselected") {
      setSelectedNode(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  if (!athenaUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center rounded-lg border bg-card">
        <Network className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h2 className="text-lg font-semibold">Data Flow Visualization</h2>
        <p className="text-sm text-muted-foreground max-w-md mt-2">
          Athena data flow visualization will be configured here once your marketing
          technology stack is mapped. This shows how data flows between your platforms,
          Eclipse, and Zeus.
        </p>
      </div>
    );
  }

  const embedUrl = `${athenaUrl}${athenaUrl.includes("?") ? "&" : "?"}embed=true`;

  return (
    <div className="flex h-[calc(100vh-10rem)] rounded-lg border bg-card overflow-hidden">
      {/* Main graph area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{graphName}</span>
          </div>
          <button
            onClick={() => window.open(athenaUrl, "_blank")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open Full View
          </button>
        </div>

        {/* iframe */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
              <div className="text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Loading {graphName}...</p>
              </div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            title={graphName}
            allow="fullscreen"
            key={athenaUrl}
          />
        </div>
      </div>

      {/* Node Details Sidebar */}
      <NodeDetailPanel selectedNode={selectedNode} />
    </div>
  );
}
