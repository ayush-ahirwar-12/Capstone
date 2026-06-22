import { useState } from 'react';
import ChatPanel from './ChatPanel';
import PreviewPanel from './PreviewPanel';
import TerminalPanel from './TerminalPanel';
import FileExplorer from './FileExplorer';
import CodeEditor from './CodeEditor';
import { useChat } from '../hooks/useChat';

export default function IDEWorkspace({ sandbox }) {
  const { messages, isStreaming, sendMessage, stopStreaming } = useChat(sandbox.sandboxId);
  const [sidebarTab, setSidebarTab] = useState('chat');   // 'chat' | 'files'
  const [bottomPanel, setBottomPanel] = useState('terminal'); // 'terminal' | 'preview'
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (path) => setSelectedFile(path);

  /* ── Shared icon helper ── */
  const TabBtn = ({ id, active, onClick, icon, label }) => (
    <button id={id} onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-150 ${
        active ? 'bg-violet-700 text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]' : 'text-[#9090bb] hover:text-[#e8e8ff] hover:bg-[#1e1e35]'
      }`}>
      {icon}
      {label}
    </button>
  );

  const PanelBtn = ({ id, active, onClick, icon, label }) => (
    <button id={id} onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] font-medium border transition-all duration-150 ${
        active ? 'bg-[#13131f] text-[#e8e8ff] border-[#252540]' : 'text-[#9090bb] border-transparent hover:text-[#e8e8ff] hover:bg-[#1e1e35]'
      }`}>
      {icon}
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0f]">

      {/* ── Top bar ── */}
      <header className="flex items-center justify-between gap-3 px-4 h-12 bg-[#0f0f1a] border-b border-[#1e1e35] flex-shrink-0 z-50">

        {/* Left: logo + sandbox status */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
              </svg>
            </div>
            <span className="text-[14px] font-bold text-[#e8e8ff] tracking-tight">AI Sandbox</span>
          </div>

          <div className="w-px h-5 bg-[#252540]" />

          <div className="flex items-center gap-2 min-w-0">
            <span className="w-[7px] h-[7px] rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-badge flex-shrink-0" />
            <span className="font-mono text-[12px] text-[#555580] truncate">{sandbox.sandboxId.slice(0, 8)}...</span>
            <span className="text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-700/30 px-1.5 py-0.5 rounded flex-shrink-0">LIVE</span>
          </div>
        </div>

        {/* Center: sidebar tabs */}
        <div className="flex items-center gap-1 bg-[#1a1a2e] border border-[#252540] rounded-lg p-1 flex-shrink-0">
          <TabBtn id="tab-chat" active={sidebarTab === 'chat'} onClick={() => setSidebarTab('chat')}
            label="Chat"
            icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
          />
          <TabBtn id="tab-files" active={sidebarTab === 'files'} onClick={() => setSidebarTab('files')}
            label="Explorer"
            icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>}
          />
        </div>

        {/* Right: bottom panel switcher + open link */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="flex items-center gap-1 bg-[#1a1a2e] border border-[#252540] rounded-lg p-1">
            <PanelBtn id="btn-terminal" active={bottomPanel === 'terminal'} onClick={() => setBottomPanel('terminal')}
              label="Terminal"
              icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>}
            />
            <PanelBtn id="btn-preview" active={bottomPanel === 'preview'} onClick={() => setBottomPanel('preview')}
              label="Preview"
              icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>}
            />
          </div>

          <a id="topbar-preview-link" href={sandbox.previewUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a2e] border border-[#252540] rounded-lg text-[12px] font-medium text-[#9090bb] hover:text-[#e8e8ff] hover:border-[#30305a] transition-all duration-150 no-underline flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open App
          </a>
        </div>
      </header>

      {/* ── Main body ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left sidebar */}
        <aside className="w-80 flex-shrink-0 border-r border-[#1e1e35] bg-[#0f0f1a] overflow-hidden flex flex-col">
          {sidebarTab === 'chat'
            ? <ChatPanel sandboxId={sandbox.sandboxId} messages={messages} isStreaming={isStreaming} onSend={sendMessage} onStop={stopStreaming} />
            : <FileExplorer sandbox={sandbox} onFileSelect={handleFileSelect} selectedFile={selectedFile} />
          }
        </aside>

        {/* Right main area */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {/* Editor */}
          <div className="flex-1 overflow-hidden min-h-0">
            <CodeEditor sandbox={sandbox} filePath={selectedFile} />
          </div>

          {/* Bottom panel */}
          <div className="h-[280px] flex-shrink-0 border-t border-[#1e1e35] overflow-hidden">
            {bottomPanel === 'terminal'
              ? <TerminalPanel sandboxId={sandbox.sandboxId} />
              : <PreviewPanel previewUrl={sandbox.previewUrl} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
