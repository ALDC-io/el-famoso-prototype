"use client";

import { Info, Network } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  description: string;
  group: string;
  groupLabel: string;
  tier: number;
  color: string;
}

interface NodeDetailPanelProps {
  selectedNode: NodeData | null;
}

export function NodeDetailPanel({ selectedNode }: NodeDetailPanelProps) {
  return (
    <div className="w-72 border-l flex flex-col bg-card">
      <div className="px-4 py-3 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Node Details</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {selectedNode ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: selectedNode.color }}
              >
                {selectedNode.groupLabel}
              </span>
              {selectedNode.tier > 0 && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full border">
                  Tier {selectedNode.tier}
                </span>
              )}
            </div>

            <h3 className="font-semibold mb-2">{selectedNode.name}</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {selectedNode.description}
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Network className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              Click on a node in the graph to view its details
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Or use &ldquo;Open Full View&rdquo; for full interactivity
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
