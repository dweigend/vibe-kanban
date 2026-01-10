interface LogEntry {
  command?: string;
  output: string[];
}

const MOCK_LOGS: LogEntry[] = [
  {
    command: 'system check --status',
    output: ['All systems operational.', 'Memory Usage: 34%'],
  },
  {
    command: 'agent --assign task_id=DEV-22',
    output: ['Task assigned to <span class="text-coding">Coder_01</span>'],
  },
  {
    command: 'commit --msg "sidebar update"',
    output: ['Waiting for changes...'],
  },
  {
    command: 'tail -f /var/log/syslog',
    output: [
      '[10:42:01] <span class="text-yellow-500">WARN</span> Connection latency > 200ms',
      '[10:42:05] <span class="text-blue-500">INFO</span> Sync complete.',
    ],
  },
];

export function SystemLog() {
  return (
    <div className="rounded border border-border bg-card p-3 font-mono text-xs max-h-64 overflow-y-auto">
      <div className="space-y-3">
        {MOCK_LOGS.map((entry, i) => (
          <div key={i} className="space-y-1">
            {entry.command && (
              <div className="flex items-center gap-1">
                <span className="text-green-500">$</span>
                <span className="text-muted-foreground">~</span>
                <span>{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, j) => (
              <div
                key={j}
                className="pl-4 border-l-2 border-muted text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-1 text-muted-foreground animate-pulse">
          <span className="text-green-500">$</span>
          <span>_</span>
        </div>
      </div>
    </div>
  );
}
