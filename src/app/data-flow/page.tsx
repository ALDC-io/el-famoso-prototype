import { AthenaEmbed } from "@/components/data-flow/AthenaEmbed";

export default function DataFlowPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Data Flow</h1>
        <p className="text-sm text-muted-foreground">
          Interactive visualization of how data flows between your platforms, Eclipse, and Zeus
        </p>
      </div>
      <AthenaEmbed />
    </div>
  );
}
