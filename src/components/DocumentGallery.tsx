import React, { useState } from "react";
import { FolderOpen, ExternalLink, Loader2, Folder } from "lucide-react";

export default function DocumentGallery() {
  const [loading, setLoading] = useState(true);
  const driveUrl = "https://drive.google.com/drive/folders/1QpJapgnjtR0D4U6mvSJycL3t0SebapBB";
  
  // Embedded URL formatted to display Google Drive grid folderview
  const embedUrl = "https://drive.google.com/embeddedfolderview?id=1QpJapgnjtR0D4U6mvSJycL3t0SebapBB#grid";

  // Pre-defined Categories for aesthetic group representation with professional colored icon backgrounds
  const folders = [
    { 
      name: "Surat Perjanjian Kerja (SPK)", 
      count: "12 File", 
      borderColor: "border-l-indigo-500", 
      textColor: "text-indigo-500 dark:text-indigo-400", 
      iconBg: "bg-indigo-50 dark:bg-indigo-950/30" 
    },
    { 
      name: "Bill of Quantity (BoQ)", 
      count: "8 File", 
      borderColor: "border-l-sky-500", 
      textColor: "text-sky-500 dark:text-sky-400", 
      iconBg: "bg-sky-50 dark:bg-sky-950/30" 
    },
    { 
      name: "Rekonsiliasi & Berita Acara", 
      count: "15 File", 
      borderColor: "border-l-emerald-500", 
      textColor: "text-emerald-500 dark:text-emerald-400", 
      iconBg: "bg-emerald-50 dark:bg-emerald-950/30" 
    },
    { 
      name: "Data Absensi & Ketenagakerjaan", 
      count: "24 File", 
      borderColor: "border-l-amber-500", 
      textColor: "text-amber-500 dark:text-amber-400", 
      iconBg: "bg-amber-50 dark:bg-amber-950/30" 
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded border border-blue-100 dark:border-blue-900/30 flex-shrink-0">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span>Arsip &amp; Galeri Dokumen Proyek</span>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase rounded-full">Google Drive</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-2xl">
              Akses cepat berkas-berkas penting proyek, foto pelaksanaan lapangan, laporan kemajuan fisik, 
              dokumen penagihan, serta kelengkapan administrasi yang tersimpan aman di cloud storage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded cursor-pointer transition-all flex items-center justify-center gap-2 shadow hover:shadow-md"
          >
            <span>Buka di Google Drive</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Grid of Virtual Directories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {folders.map((f, i) => (
          <div 
            key={i} 
            className={`bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 border-l-[4px] ${f.borderColor} rounded shadow-sm hover:shadow transition-all flex justify-between items-start gap-3`}
          >
            <div className="space-y-1.5 flex-grow">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">KATEGORI</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/50 rounded text-slate-500 dark:text-slate-400">{f.count}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
                {f.name}
              </h4>
            </div>
            <div className={`p-2 rounded ${f.iconBg} ${f.textColor} flex-shrink-0`}>
              <Folder className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Iframe Container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded overflow-hidden shadow-sm h-[calc(100vh-21rem)] min-h-[500px] flex flex-col relative">
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-350 tracking-wide">Live File Explorer</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">Interactive Panel</span>
        </div>

        {loading && (
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/95 flex flex-col items-center justify-center p-8 z-10">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wide uppercase">Menghubungkan ke Google Drive...</p>
          </div>
        )}

        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          className="flex-grow w-full border-0"
          onLoad={() => setLoading(false)}
          allowFullScreen
        />
      </div>
    </div>
  );
}
