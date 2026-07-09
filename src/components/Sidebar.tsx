import React, { useState, useEffect } from "react";
import { MenuItem, MenuSection } from "../types";
import { 
  X, LayoutDashboard, Database, Briefcase, Landmark, Users, 
  ChevronRight, CircleDot, Sparkles, MapPin, ListCollapse, List, ScrollText, HardHat,
  FolderOpen
} from "lucide-react";

interface SidebarProps {
  currentViewId: string;
  onSelectView: (viewId: string, title: string, isSub: boolean) => void;
  isOpenOnMobile: boolean;
  onCloseMobile: () => void;
  isCollapsed?: boolean;
}

const menuSections: MenuSection[] = [
  {
    title: "Dashboard",
    icon: "LayoutDashboard",
    id: "dashboard-sect",
    items: [
      { id: "overview", title: "Overview", type: "overview", path: "semua-proyek" },
      { id: "semua-proyek", title: "Semua Proyek", type: "table", path: "semua-proyek" }
    ]
  },
  {
    title: "Proyek",
    icon: "Briefcase",
    id: "proyek-sect",
    subsections: [
      {
        title: "JRP JOBJ",
        id: "jrp-jobj",
        items: [
          { id: "jrp-jobj-spk", title: "JRP JOBJ - SPK", type: "table", path: "jrp-jobj-spk" },
          { id: "jrp-jobj-boq", title: "JRP JOBJ - BoQ", type: "table", path: "jrp-jobj-boq" },
          { id: "jrp-jobj-rekon", title: "JRP JOBJ - Rekon", type: "table", path: "jrp-jobj-rekon" },
          { id: "jrp-jobj-material", title: "JRP JOBJ - Material", type: "table", path: "jrp-jobj-material" },
          { id: "jrp-jobj-bon-material", title: "JRP JOBJ - Bon Material", type: "table", path: "jrp-jobj-bon-material" },
          { id: "jrp-jobj-maps", title: "JRP JOBJ - Maps", type: "map", path: "jrp-jobj-maps" }
        ]
      },
      {
        title: "IJE CAO Ring 2",
        id: "ije-cao-2",
        items: [
          { id: "ije-cao-ring-2-spk", title: "IJE CAO Ring 2 - SPK", type: "table", path: "ije-cao-ring-2-spk" },
          { id: "ije-cao-ring-2-boq", title: "IJE CAO Ring 2 - BoQ", type: "table", path: "ije-cao-ring-2-boq" },
          { id: "ije-cao-ring-2-rekon", title: "IJE CAO Ring 2 - Rekon", type: "table", path: "ije-cao-ring-2-rekon" },
          { id: "ije-cao-ring-2-material", title: "IJE CAO Ring 2 - Material", type: "table", path: "ije-cao-ring-2-material" },
          { id: "ije-cao-ring-2-maps", title: "IJE CAO Ring 2 - Maps", type: "map", path: "ije-cao-ring-2-maps" }
        ]
      },
      {
        title: "IJE CAO Ring 4",
        id: "ije-cao-4",
        items: [
          { id: "ije-cao-ring-4-spk", title: "IJE CAO Ring 4 - SPK", type: "table", path: "ije-cao-ring-4-spk" },
          { id: "ije-cao-ring-4-boq", title: "IJE CAO Ring 4 - BoQ", type: "table", path: "ije-cao-ring-4-boq" },
          { id: "ije-cao-ring-4-rekon", title: "IJE CAO Ring 4 - Rekon", type: "table", path: "ije-cao-ring-4-rekon" },
          { id: "ije-cao-ring-4-material", title: "IJE CAO Ring 4 - Material", type: "table", path: "ije-cao-ring-4-material" },
          { id: "ije-cao-ring-4-maps", title: "IJE CAO Ring 4 - Maps", type: "map", path: "ije-cao-ring-4-maps" }
        ]
      },
      {
        title: "IJE CAO Ring 3a",
        id: "ije-cao-3a",
        items: [
          { id: "ije-cao-ring-3a-spk", title: "IJE CAO Ring 3a - SPK", type: "table", path: "ije-cao-ring-3a-spk" },
          { id: "ije-cao-ring-3a-boq", title: "IJE CAO Ring 3a - BoQ", type: "table", path: "ije-cao-ring-3a-boq" },
          { id: "ije-cao-ring-3a-rekon", title: "IJE CAO Ring 3a - Rekon", type: "table", path: "ije-cao-ring-3a-rekon" },
          { id: "ije-cao-ring-3a-material", title: "IJE CAO Ring 3a - Material", type: "table", path: "ije-cao-ring-3a-material" },
          { id: "ije-cao-ring-3a-maps", title: "IJE CAO Ring 3a - Maps", type: "map", path: "ije-cao-ring-3a-maps" }
        ]
      },
      {
        title: "IJE CAO Ring 3b",
        id: "ije-cao-3b",
        items: [
          { id: "ije-cao-ring-3b-spk", title: "IJE CAO Ring 3b - SPK", type: "table", path: "ije-cao-ring-3b-spk" },
          { id: "ije-cao-ring-3b-boq", title: "IJE CAO Ring 3b - BoQ", type: "table", path: "ije-cao-ring-3b-boq" },
          { id: "ije-cao-ring-3b-rekon", title: "IJE CAO Ring 3b - Rekon", type: "table", path: "ije-cao-ring-3b-rekon" },
          { id: "ije-cao-ring-3b-material", title: "IJE CAO Ring 3b - Material", type: "table", path: "ije-cao-ring-3b-material" },
          { id: "ije-cao-ring-3b-maps", title: "IJE CAO Ring 3b - Maps", type: "map", path: "ije-cao-ring-3b-maps" }
        ]
      },
      {
        title: "IJE FM Ring 1",
        id: "ije-fm-1",
        items: [
          { id: "ije-fm-ring-1-spk", title: "IJE FM Ring 1 - SPK", type: "table", path: "ije-fm-ring-1-spk" },
          { id: "ije-fm-ring-1-boq", title: "IJE FM Ring 1 - BoQ", type: "table", path: "ije-fm-ring-1-boq" },
          { id: "ije-fm-ring-1-rekon", title: "IJE FM Ring 1 - Rekon", type: "table", path: "ije-fm-ring-1-rekon" },
          { id: "ije-fm-ring-1-material", title: "IJE FM Ring 1 - Material", type: "table", path: "ije-fm-ring-1-material" },
          { id: "ije-fm-ring-1-maps", title: "IJE FM Ring 1 - Maps", type: "map", path: "ije-fm-ring-1-maps" }
        ]
      },
      {
        title: "Surge FM Ex Pole",
        id: "surge-ex",
        items: [
          { id: "surge-fm-expole-spk", title: "Surge FM Ex Pole - SPK", type: "table", path: "surge-fm-expole-spk" },
          { id: "surge-fm-expole-boq", title: "Surge FM Ex Pole - BoQ", type: "table", path: "surge-fm-expole-boq" },
          { id: "surge-fm-expole-rekon", title: "Surge FM Ex Pole - Rekon", type: "table", path: "surge-fm-expole-rekon" },
          { id: "surge-fm-expole-material", title: "Surge FM Ex Pole - Material", type: "table", path: "surge-fm-expole-material" },
          { id: "surge-fm-expole-maps", title: "Surge FM Ex Pole - Maps", type: "map", path: "surge-fm-expole-maps" }
        ]
      },
      {
        title: "Surge FM New Pole",
        id: "surge-new",
        items: [
          { id: "surge-fm-newpole-spk", title: "Surge FM New Pole - SPK", type: "table", path: "surge-fm-newpole-spk" },
          { id: "surge-fm-newpole-boq", title: "Surge FM New Pole - BoQ", type: "table", path: "surge-fm-newpole-boq" },
          { id: "surge-fm-newpole-rekon", title: "Surge FM New Pole - Rekon", type: "table", path: "surge-fm-newpole-rekon" },
          { id: "surge-fm-newpole-material", title: "Surge FM New Pole - Material", type: "table", path: "surge-fm-newpole-material" },
          { id: "surge-fm-newpole-maps", title: "Surge FM New Pole - Maps", type: "map", path: "surge-fm-newpole-maps" }
        ]
      }
    ]
  },
  {
    title: "Keuangan",
    icon: "Landmark",
    id: "finance-sect",
    subsections: [
      {
        title: "Pembayaran",
        id: "pembayaran-sub",
        items: [
          { id: "daftar-pembayaran", title: "Daftar Pembayaran", type: "table", path: "daftar-pembayaran" },
          { id: "daftar-tagihan", title: "Daftar Tagihan", type: "table", path: "daftar-tagihan" }
        ]
      }
    ]
  },
  {
    title: "Manajemen",
    icon: "Users",
    id: "manajemen-sect",
    subsections: [
      {
        title: "Tim",
        id: "tim-sub",
        items: [
          { id: "daftar-karyawan", title: "Daftar Karyawan", type: "table", path: "daftar-karyawan" },
          { id: "daftar-pelaksana", title: "Daftar Pelaksana", type: "table", path: "daftar-pelaksana" },
          { id: "daftar-absensi", title: "Daftar Absensi", type: "table", path: "daftar-absensi" }
        ]
      },
      {
        title: "Dokumen",
        id: "dokumen-sub",
        items: [
          { id: "galeri-dokumen", title: "Dokumen", type: "document", path: "galeri-dokumen" }
        ]
      }
    ]
  }
];

export default function Sidebar({ currentViewId, onSelectView, isOpenOnMobile, onCloseMobile, isCollapsed = false }: SidebarProps) {
  // Store open status of accordions
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(true);
  const [openSubsections, setOpenSubsections] = useState<Record<string, boolean>>(() => {
    // Determine initially open sections based on current selective ID
    const initial: Record<string, boolean> = {};
    menuSections.forEach(section => {
      if (section.subsections) {
        section.subsections.forEach(sub => {
          const match = sub.items.some(it => it.id === currentViewId);
          if (match) {
            initial[sub.id] = true;
          }
        });
      }
    });
    return initial;
  });

  // Auto-collapse other sections when the current view (navigation) changes
  useEffect(() => {
    let foundSubId: string | null = null;
    let isDashboardActive = false;

    menuSections.forEach(section => {
      if (section.items) {
        const hasItem = section.items.some(it => it.id === currentViewId);
        if (hasItem) {
          if (section.title === "Dashboard") {
            isDashboardActive = true;
          }
        }
      }
      if (section.subsections) {
        section.subsections.forEach(sub => {
          const hasItem = sub.items.some(it => it.id === currentViewId);
          if (hasItem) {
            foundSubId = sub.id;
          }
        });
      }
    });

    if (isDashboardActive) {
      setIsDashboardOpen(true);
      setOpenSubsections({});
    } else if (foundSubId) {
      setIsDashboardOpen(false);
      setOpenSubsections({ [foundSubId]: true });
    } else {
      // Direct category or none
      setOpenSubsections({});
    }
  }, [currentViewId]);

  const toggleSubsection = (id: string) => {
    setOpenSubsections(prev => {
      const next: Record<string, boolean> = {};
      next[id] = !prev[id];
      return next;
    });
    setIsDashboardOpen(false);
  };

  const selectSectionIcon = (iconName: string) => {
    switch(iconName) {
      case "LayoutDashboard": return <LayoutDashboard className="w-5 h-5 text-blue-500" />;
      case "Briefcase": return <Briefcase className="w-5 h-5 text-sky-500" />;
      case "Landmark": return <Landmark className="w-5 h-5 text-emerald-500" />;
      case "Users": return <Users className="w-5 h-5 text-amber-500" />;
      default: return <Database className="w-5 h-5 text-slate-500" />;
    }
  };

  const getSubitemIcon = (id: string) => {
    if (id.includes("-maps")) return <MapPin className="w-3.5 h-3.5" />;
    if (id.includes("-material") || id.includes("-bon-")) return <HardHat className="w-3.5 h-3.5" />;
    if (id.includes("-spk")) return <ScrollText className="w-3.5 h-3.5" />;
    if (id.includes("-boq")) return <ListCollapse className="w-3.5 h-3.5" />;
    if (id === "galeri-dokumen") return <FolderOpen className="w-3.5 h-3.5" />;
    return <CircleDot className="w-3 h-3" />;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenOnMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 bg-slate-900 text-slate-300 z-50 border-r border-slate-800
        transition-all duration-300
        ${isCollapsed ? "w-16 overflow-y-visible translate-x-0" : "w-72 overflow-y-auto"}
        ${isCollapsed ? "" : (isOpenOnMobile ? "translate-x-0 w-72 overflow-y-auto" : "-translate-x-full lg:translate-x-0")}
      `}>
        {/* Header */}
        <div className={`sticky top-0 bg-slate-950 border-b border-slate-800 flex items-center justify-between z-20 transition-all ${isCollapsed ? "px-4 py-4 justify-center" : "px-5 py-4"}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center shadow flex-shrink-0 animate-pulse-subtle">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div className={isCollapsed ? "lg:hidden" : "block"}>
              <h1 className="font-bold text-white tracking-normal text-sm leading-tight uppercase whitespace-nowrap">Pantau Proyek</h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase whitespace-nowrap">Project Update Realtime</p>
            </div>
          </div>
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Map */}
        <div className={`py-4 space-y-4 transition-all ${isCollapsed ? "px-1 space-y-5" : "px-2.5 space-y-4"}`}>
          {menuSections.map(section => {
            if (isCollapsed) {
              const isAnyChildSelected = section.items 
                ? section.items.some(it => it.id === currentViewId)
                : section.subsections?.some(sub => sub.items.some(it => it.id === currentViewId));

              return (
                <div 
                  key={section.id} 
                  className="relative group flex justify-center py-1 select-none"
                >
                  {/* Icon Trigger */}
                  <button
                    className={`
                      p-2 border border-transparent rounded-lg text-slate-400 group-hover:text-white transition-all cursor-pointer relative flex items-center justify-center
                      ${isAnyChildSelected 
                        ? "bg-blue-600 text-white shadow-md font-bold border-blue-500" 
                        : "hover:bg-slate-800 text-slate-400"
                      }
                    `}
                    title={section.title}
                  >
                    {selectSectionIcon(section.icon)}
                  </button>

                  {/* Absolute Floating Popup Submenu */}
                  <div className="absolute left-full top-0 ml-2 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-2 invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-250 z-50">
                    <div className="px-3.5 py-2 border-b border-slate-800/80 mb-2">
                      <h4 className="text-[10.5px] font-bold text-slate-350 tracking-wider uppercase flex items-center gap-2">
                        {selectSectionIcon(section.icon)}
                        <span>{section.title}</span>
                      </h4>
                    </div>

                    {section.items && (
                      <div className="px-1.5 space-y-0.5">
                        {section.items.map(item => {
                          const isSelected = currentViewId === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                onSelectView(item.id, item.title, false);
                                onCloseMobile();
                              }}
                              className={`
                                w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold rounded text-left cursor-pointer transition-all
                                ${isSelected 
                                  ? "bg-blue-600 text-white font-bold" 
                                  : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                                }
                              `}
                            >
                              <List className="w-3.5 h-3.5" />
                              <span className="truncate">{item.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {section.subsections && (
                      <div className="max-h-[75vh] overflow-y-auto space-y-3 px-1.5 custom-scrollbar">
                        {section.subsections.map(sub => {
                          return (
                            <div key={sub.id} className="space-y-1">
                              <div className="px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest border-l-2 border-slate-700">
                                {sub.title}
                              </div>
                              <div className="space-y-0.5">
                                {sub.items.map(item => {
                                  const isSelected = currentViewId === item.id;
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => {
                                        onSelectView(item.id, item.title, true);
                                        onCloseMobile();
                                      }}
                                      className={`
                                        w-full flex items-center gap-2 px-3 py-1 text-xs rounded text-left cursor-pointer transition-all
                                        ${isSelected 
                                          ? "bg-blue-600/15 text-blue-450 font-bold border border-blue-500/10" 
                                          : "hover:bg-slate-800/40 text-slate-400 hover:text-slate-300"
                                        }
                                      `}
                                    >
                                      <span className={isSelected ? "text-blue-400" : "text-slate-500"}>
                                        {getSubitemIcon(item.id)}
                                      </span>
                                      <span className="truncate">{item.title.split(" - ").pop()}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={section.id} className="space-y-1">
                {/* Category Title Header - Bootstrap Style */}
                <div 
                  onClick={section.title === "Dashboard" ? () => {
                    setIsDashboardOpen(!isDashboardOpen);
                    setOpenSubsections({});
                  } : undefined}
                  className={`px-3 py-1 flex items-center justify-between bg-slate-800/20 rounded ${section.title === "Dashboard" ? "cursor-pointer hover:bg-slate-800/45 select-none" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    {selectSectionIcon(section.icon)}
                    <span className="text-[10.5px] font-bold text-slate-450 tracking-wider uppercase text-slate-400">
                      {section.title}
                    </span>
                  </div>
                  {section.title === "Dashboard" && (
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-500 ${isDashboardOpen ? "rotate-90 text-blue-400" : ""}`} />
                  )}
                </div>

                {/* Directly mapped items if there are no subaccordions */}
                {section.items && (
                  <div className={`
                    overflow-hidden transition-all duration-200 pl-1 space-y-1 mt-1
                    ${isDashboardOpen ? "max-h-[500px] opacity-100 py-1" : "max-h-0 opacity-0 pointer-events-none"}
                  `}>
                    {section.items.map(item => {
                      const isSelected = currentViewId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectView(item.id, item.title, false);
                            onCloseMobile();
                          }}
                          className={`
                            w-full flex items-center gap-3 px-3 py-1.5 text-xs font-semibold rounded tracking-normal cursor-pointer text-left transition-all
                            ${isSelected 
                              ? "bg-blue-600 text-white shadow-sm font-bold" 
                              : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                            }
                          `}
                        >
                          <List className="w-4 h-4 ml-0.5" />
                          <span>{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Accordion List for subsections */}
                {section.subsections && (
                  <div className="space-y-1 mt-1 pl-1">
                    {section.subsections.map(sub => {
                      const isAnySelected = sub.items.some(it => it.id === currentViewId);
                      const isOpen = !!openSubsections[sub.id];

                      return (
                        <div key={sub.id} className="space-y-0.5">
                          {/* Subheader dispatch trigger */}
                          <button
                            onClick={() => toggleSubsection(sub.id)}
                            className={`
                              w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold rounded text-left cursor-pointer transition-all
                              ${isAnySelected 
                                ? "bg-slate-800 text-blue-400 font-bold border border-slate-700" 
                                : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
                              }
                            `}
                          >
                            <span className="truncate">{sub.title}</span>
                            <ChevronRight className={`
                              w-3.5 h-3.5 transition-transform duration-200
                              ${isOpen ? "rotate-90 text-blue-400" : "text-slate-500"}
                            `} />
                          </button>

                          {/* Collapsed items */}
                          <div className={`
                            overflow-hidden transition-all duration-200 pl-3 space-y-0.5
                            ${isOpen ? "max-h-[1000px] opacity-100 py-1" : "max-h-0 opacity-0"}
                          `}>
                            {sub.items.map(item => {
                              const isSelected = currentViewId === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    onSelectView(item.id, item.title, true);
                                    onCloseMobile();
                                  }}
                                  className={`
                                    w-full flex items-center gap-2.5 px-3 py-1.5 text-xs rounded text-left cursor-pointer transition-all
                                    ${isSelected 
                                      ? "bg-blue-600/15 text-blue-450 font-bold border border-blue-500/10" 
                                      : "hover:bg-slate-800/40 text-slate-500 hover:text-slate-300"
                                    }
                                  `}
                                >
                                  <span className={isSelected ? "text-blue-400" : "text-slate-500"}>
                                    {getSubitemIcon(item.id)}
                                  </span>
                                  <span className="truncate">{item.title.split(" - ").pop()}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
