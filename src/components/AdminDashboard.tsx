import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Trash2,
  Edit3,
  SlidersHorizontal,
  FolderPlus,
  Image as ImageIcon,
  Check,
  Search,
  RotateCcw,
  Upload,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Sparkles,
  LayoutGrid,
  FileText,
  Copy,
} from "lucide-react";
import { useProjects, type NewProjectInput } from "../context/ProjectsContext";
import { ApertureMark } from "./ui";
import { type Project } from "../data";

export function AdminDashboard() {
  const {
    projects,
    categories,
    isDashboardOpen,
    setIsDashboardOpen,
    editingProject,
    setEditingProject,
    addProject,
    updateProject,
    deleteProject,
    addCategory,
    resetToDefaults,
    getCategoryLabel,
    presetImages,
  } = useProjects();

  const [activeTab, setActiveTab] = useState<"list" | "form" | "categories">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("all");

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("web");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [role, setRole] = useState("");
  const [toolsInput, setToolsInput] = useState("");
  const [toolsList, setToolsList] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(presetImages[0].url);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [imageSourceMode, setImageSourceMode] = useState<"preset" | "url" | "upload">("preset");
  const [note, setNote] = useState("");
  const [span, setSpan] = useState("lg:col-span-7");

  // Custom category addition
  const [newCatKey, setNewCatKey] = useState("");
  const [newCatLabel, setNewCatLabel] = useState("");
  const [showCatAdder, setShowCatAdder] = useState(false);

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync editing project into form
  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setSubtitle(editingProject.subtitle);
      setCategory(editingProject.category);
      setYear(editingProject.year);
      setRole(editingProject.role);
      setToolsList(editingProject.tools);
      setSelectedImage(editingProject.image);
      setNote(editingProject.note);
      setSpan(editingProject.span);
      setActiveTab("form");
    }
  }, [editingProject]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDashboardOpen) {
        setIsDashboardOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDashboardOpen, setIsDashboardOpen]);

  // Prevent background scroll when dashboard is open
  useEffect(() => {
    if (isDashboardOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDashboardOpen]);

  const handleToolAdd = () => {
    if (!toolsInput.trim()) return;
    const split = toolsInput
      .split(/[,;\n]/)
      .map((t) => t.trim())
      .filter((t) => t && !toolsList.includes(t));
    if (split.length > 0) {
      setToolsList((prev) => [...prev, ...split]);
      setToolsInput("");
    }
  };

  const handleToolRemove = (tool: string) => {
    setToolsList((prev) => prev.filter((t) => t !== tool));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (result) {
          setSelectedImage(result);
          setImageSourceMode("upload");
          showToast("Image loaded from device!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setCategory(categories[0]?.key || "web");
    setYear(String(new Date().getFullYear()));
    setRole("");
    setToolsInput("");
    setToolsList([]);
    setSelectedImage(presetImages[0].url);
    setCustomImageUrl("");
    setImageSourceMode("preset");
    setNote("");
    setSpan("lg:col-span-7");
    setEditingProject(null);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please provide a project title");
      return;
    }

    const finalImage =
      imageSourceMode === "url" && customImageUrl.trim()
        ? customImageUrl.trim()
        : selectedImage;

    const payload: NewProjectInput = {
      title: title.trim(),
      subtitle: subtitle.trim() || "Project Showcase",
      category,
      year: year.trim() || String(new Date().getFullYear()),
      role: role.trim() || "Design & Development",
      tools: toolsList.length > 0 ? toolsList : ["React", "TypeScript", "Tailwind"],
      image: finalImage,
      note: note.trim() || "Case study and development documentation for this project.",
      span,
    };

    if (editingProject) {
      updateProject(editingProject.id, payload);
      showToast(`Updated "${title}" successfully!`);
    } else {
      addProject(payload);
      showToast(`Added "${title}" to portfolio!`);
    }

    resetForm();
    setActiveTab("list");
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatLabel.trim()) return;
    const key = newCatKey.trim() || newCatLabel.trim().toLowerCase().replace(/\s+/g, "-");
    addCategory(key, newCatLabel.trim());
    setCategory(key);
    setNewCatKey("");
    setNewCatLabel("");
    setShowCatAdder(false);
    showToast(`New category "${newCatLabel}" created!`);
  };

  const handleDuplicate = (project: Project) => {
    addProject({
      title: `${project.title} (Copy)`,
      subtitle: project.subtitle,
      category: project.category,
      year: project.year,
      role: project.role,
      tools: project.tools,
      image: project.image,
      note: project.note,
      span: project.span,
    });
    showToast(`Duplicated "${project.title}"!`);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedFilterCategory === "all" ||
      p.category.toLowerCase() === selectedFilterCategory.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (!isDashboardOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Admin Dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex flex-col bg-ink text-bone"
      >
        {/* Background Subtle Ambience */}
        <div className="grain pointer-events-none fixed inset-0 opacity-25" />
        <div className="pointer-events-none fixed -top-40 right-10 h-96 w-96 rounded-full bg-safelight/10 blur-[130px]" />

        {/* Top App Bar */}
        <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-bone/12 bg-graphite/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <ApertureMark className="h-7 w-7 text-safelight" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="label text-sm tracking-widest text-paper">Admin Dashboard</h1>
                <span className="inline-flex items-center gap-1.5 border border-safelight/30 bg-safelight/10 px-2 py-0.5 text-[0.625rem] font-mono uppercase text-safelight">
                  <span className="h-1.5 w-1.5 rounded-full bg-safelight animate-pulse" />
                  Live Store
                </span>
              </div>
              <p className="text-xs text-ash">Sneha Nethsara Portfolio Content Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setActiveTab("form");
              }}
              className="label inline-flex items-center gap-2 border border-safelight bg-safelight px-3.5 py-2 text-ink font-semibold transition-all hover:bg-safelight/90"
            >
              <Plus className="h-4 w-4" />
              New Project
            </button>

            <button
              type="button"
              onClick={() => setIsDashboardOpen(false)}
              className="label inline-flex items-center gap-2 border border-bone/20 bg-ink px-3.5 py-2 text-bone transition-colors hover:border-safelight hover:text-safelight"
            >
              <span>Exit</span>
              <kbd className="hidden text-[0.625rem] opacity-60 sm:inline-block border border-bone/20 px-1 py-0.5">ESC</kbd>
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-8 z-[110] flex items-center gap-2.5 border border-safelight/80 bg-graphite px-4 py-3 text-sm text-paper shadow-2xl backdrop-blur-lg"
            >
              <Check className="h-4 w-4 text-safelight" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav Tabs Bar */}
        <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-bone/10 bg-ink px-6 py-2.5">
          <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("list");
                setEditingProject(null);
              }}
              className={`label flex items-center gap-2 border-b-2 px-3 py-2 transition-colors ${
                activeTab === "list"
                  ? "border-safelight text-safelight"
                  : "border-transparent text-bone/60 hover:text-paper"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!editingProject) resetForm();
                setActiveTab("form");
              }}
              className={`label flex items-center gap-2 border-b-2 px-3 py-2 transition-colors ${
                activeTab === "form"
                  ? "border-safelight text-safelight"
                  : "border-transparent text-bone/60 hover:text-paper"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{editingProject ? `Edit: ${editingProject.title}` : "Add Project"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("categories")}
              className={`label flex items-center gap-2 border-b-2 px-3 py-2 transition-colors ${
                activeTab === "categories"
                  ? "border-safelight text-safelight"
                  : "border-transparent text-bone/60 hover:text-paper"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Categories ({categories.length})</span>
            </button>
          </nav>

          <div className="hidden items-center gap-3 text-xs text-ash md:flex">
            <span>Storage: localStorage (Persistent)</span>
            <span className="h-3 w-px bg-bone/20" />
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset all projects and categories to factory defaults?")) {
                  resetToDefaults();
                  showToast("Portfolio reset to default showcase data.");
                }
              }}
              className="rule-hover inline-flex items-center gap-1.5 text-ash hover:text-safelight"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8 sm:px-10 lg:px-12">
          {/* TAB 1: MANAGE / ALL PROJECTS */}
          {activeTab === "list" && (
            <div className="space-y-8">
              {/* Category stats badges */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                <button
                  type="button"
                  onClick={() => setSelectedFilterCategory("all")}
                  className={`border p-4 text-left transition-all ${
                    selectedFilterCategory === "all"
                      ? "border-safelight bg-safelight/10"
                      : "border-bone/10 bg-graphite/40 hover:border-bone/25"
                  }`}
                >
                  <p className="label text-[0.625rem] text-ash">All Categories</p>
                  <p className="display mt-2 text-2xl text-paper">{projects.length}</p>
                  <p className="mt-1 text-xs text-bone/50">Total Live Items</p>
                </button>

                {categories.map((c) => {
                  const count = projects.filter(
                    (p) => p.category.toLowerCase() === c.key.toLowerCase()
                  ).length;
                  const active = selectedFilterCategory === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setSelectedFilterCategory(c.key)}
                      className={`border p-4 text-left transition-all ${
                        active
                          ? "border-safelight bg-safelight/10"
                          : "border-bone/10 bg-graphite/40 hover:border-bone/25"
                      }`}
                    >
                      <p className="label text-[0.625rem] text-safelight">{c.label}</p>
                      <p className="display mt-2 text-2xl text-paper">{count}</p>
                      <p className="mt-1 text-xs text-bone/50">{c.key} frames</p>
                    </button>
                  );
                })}
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-col gap-4 border-y border-bone/12 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, subtitle, or tools..."
                    className="w-full border border-bone/15 bg-graphite/60 py-2.5 pl-10 pr-4 text-sm text-paper placeholder-bone/40 focus:border-safelight focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-paper"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="label text-xs text-ash">
                    Showing {filteredProjects.length} of {projects.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab("form");
                    }}
                    className="label inline-flex items-center gap-1.5 border border-bone/20 px-3 py-2 text-bone transition-colors hover:border-safelight hover:text-safelight"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Project
                  </button>
                </div>
              </div>

              {/* Projects Grid */}
              {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-bone/20 py-16 text-center">
                  <FileText className="h-10 w-10 text-ash/40" />
                  <p className="mt-4 text-lg text-paper">No projects found</p>
                  <p className="mt-1 text-sm text-bone/60">
                    Try adjusting your search query or category filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFilterCategory("all");
                    }}
                    className="label mt-6 border border-safelight px-4 py-2 text-safelight hover:bg-safelight hover:text-ink"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      className="group flex flex-col justify-between border border-bone/12 bg-graphite/40 transition-all hover:border-bone/30"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="label border border-safelight/40 bg-ink/80 px-2 py-1 text-[0.625rem] text-safelight backdrop-blur-sm">
                              {getCategoryLabel(p.category)}
                            </span>
                            <span className="label border border-bone/20 bg-ink/80 px-2 py-1 text-[0.625rem] text-ash backdrop-blur-sm">
                              {p.year}
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <p className="label text-[0.625rem] text-ash">
                            Frame {p.index} · {p.role}
                          </p>
                          <h3 className="display mt-1 text-2xl text-paper">{p.title}</h3>
                          <p className="mt-1 text-sm text-bone/70 line-clamp-1">{p.subtitle}</p>
                          <p className="mt-3 text-xs leading-relaxed text-bone/60 line-clamp-2">{p.note}</p>

                          {/* Tools */}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tools.slice(0, 4).map((tool) => (
                              <span
                                key={tool}
                                className="label border border-bone/10 bg-ink/50 px-1.5 py-0.5 text-[0.5625rem] text-ash"
                              >
                                {tool}
                              </span>
                            ))}
                            {p.tools.length > 4 && (
                              <span className="label px-1 py-0.5 text-[0.5625rem] text-ash">
                                +{p.tools.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-between border-t border-bone/10 bg-ink/60 px-5 py-3">
                        <button
                          type="button"
                          onClick={() => handleDuplicate(p)}
                          title="Duplicate this project"
                          className="rule-hover inline-flex items-center gap-1 text-xs text-ash hover:text-paper"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(p);
                              setActiveTab("form");
                            }}
                            className="label inline-flex items-center gap-1.5 border border-bone/20 px-3 py-1.5 text-xs text-bone transition-colors hover:border-safelight hover:text-safelight"
                          >
                            <Edit3 className="h-3 w-3" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete "${p.title}" from portfolio?`)) {
                                deleteProject(p.id);
                                showToast(`Deleted "${p.title}"`);
                              }
                            }}
                            className="label inline-flex items-center gap-1 border border-red-500/30 px-2.5 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADD / EDIT PROJECT FORM */}
          {activeTab === "form" && (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Form Column */}
              <div className="lg:col-span-7">
                <div className="border-b border-bone/12 pb-5">
                  <h2 className="display text-3xl text-paper">
                    {editingProject ? "Update Project Details" : "Add Project with Category"}
                  </h2>
                  <p className="mt-1 text-sm text-bone/70">
                    Fill in the details below. Projects appear live in the portfolio immediately.
                  </p>
                </div>

                <form onSubmit={handleSaveProject} className="mt-8 space-y-7">
                  {/* Category Selection */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="label block text-safelight">1. Select Category *</label>
                      <button
                        type="button"
                        onClick={() => setShowCatAdder(!showCatAdder)}
                        className="rule-hover inline-flex items-center gap-1 text-xs text-ash hover:text-safelight"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add New Category</span>
                      </button>
                    </div>

                    {showCatAdder && (
                      <div className="mt-3 border border-safelight/40 bg-graphite/90 p-4">
                        <p className="label text-[0.625rem] text-safelight">Define New Category</p>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <input
                              type="text"
                              value={newCatLabel}
                              onChange={(e) => setNewCatLabel(e.target.value)}
                              placeholder="Label (e.g. 3D Animation, AI Systems)"
                              className="w-full border border-bone/20 bg-ink px-3 py-2 text-xs text-paper focus:border-safelight focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={newCatKey}
                              onChange={(e) => setNewCatKey(e.target.value)}
                              placeholder="Key ID (e.g. 3d, ai)"
                              className="w-full border border-bone/20 bg-ink px-3 py-2 text-xs text-paper focus:border-safelight focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowCatAdder(false)}
                            className="label border border-bone/20 px-3 py-1 text-xs text-ash"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleCreateCategory}
                            className="label bg-safelight px-3 py-1 text-xs text-ink font-semibold"
                          >
                            Save Category
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {categories.map((c) => {
                        const isSelected = category.toLowerCase() === c.key.toLowerCase();
                        return (
                          <button
                            key={c.key}
                            type="button"
                            onClick={() => setCategory(c.key)}
                            className={`label border px-4 py-2.5 transition-all ${
                              isSelected
                                ? "border-safelight bg-safelight text-ink font-semibold"
                                : "border-bone/20 bg-graphite/40 text-bone/80 hover:border-bone/40 hover:text-paper"
                            }`}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="label block text-ash">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Ceylon Artisan Collective"
                        className="mt-2 w-full border border-bone/20 bg-graphite/60 px-4 py-2.5 text-sm text-paper focus:border-safelight focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="label block text-ash">Subtitle / Scope</label>
                      <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="e.g. Brand identity & headless commerce"
                        className="mt-2 w-full border border-bone/20 bg-graphite/60 px-4 py-2.5 text-sm text-paper focus:border-safelight focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Role, Year & Span */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <label className="label block text-ash">Role / Responsibility</label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Full-stack Developer"
                        className="mt-2 w-full border border-bone/20 bg-graphite/60 px-4 py-2.5 text-sm text-paper focus:border-safelight focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="label block text-ash">Year</label>
                      <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2026"
                        className="mt-2 w-full border border-bone/20 bg-graphite/60 px-4 py-2.5 text-sm text-paper focus:border-safelight focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="label block text-ash">Grid Column Width</label>
                      <select
                        value={span}
                        onChange={(e) => setSpan(e.target.value)}
                        className="mt-2 w-full border border-bone/20 bg-graphite/90 px-3 py-2.5 text-sm text-paper focus:border-safelight focus:outline-none"
                      >
                        <option value="lg:col-span-7">Wide (7 columns)</option>
                        <option value="lg:col-span-5">Medium (5 columns)</option>
                        <option value="lg:col-span-4">Standard (4 columns)</option>
                        <option value="lg:col-span-12">Full Width (12 columns)</option>
                      </select>
                    </div>
                  </div>

                  {/* Tools / Tech Stack */}
                  <div>
                    <label className="label block text-ash">Tools &amp; Technologies</label>
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={toolsInput}
                        onChange={(e) => setToolsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleToolAdd();
                          }
                        }}
                        placeholder="Type tools separated by commas (e.g. React, Next.js, Blender)..."
                        className="flex-1 border border-bone/20 bg-graphite/60 px-4 py-2 text-sm text-paper focus:border-safelight focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleToolAdd}
                        className="label border border-bone/20 px-4 py-2 text-bone hover:border-safelight hover:text-safelight"
                      >
                        Add
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {toolsList.map((tool) => (
                        <span
                          key={tool}
                          className="label inline-flex items-center gap-1.5 border border-bone/20 bg-graphite px-2.5 py-1 text-xs text-bone"
                        >
                          {tool}
                          <button
                            type="button"
                            onClick={() => handleToolRemove(tool)}
                            className="text-ash hover:text-safelight"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Image Selection */}
                  <div className="space-y-4 rounded border border-bone/12 bg-graphite/30 p-5">
                    <label className="label block text-safelight">Project Visual Image</label>

                    <div className="flex flex-wrap gap-3 border-b border-bone/10 pb-3">
                      <button
                        type="button"
                        onClick={() => setImageSourceMode("preset")}
                        className={`label px-3 py-1.5 transition-colors ${
                          imageSourceMode === "preset"
                            ? "bg-safelight text-ink"
                            : "border border-bone/20 text-bone hover:text-paper"
                        }`}
                      >
                        Library Presets
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageSourceMode("url")}
                        className={`label px-3 py-1.5 transition-colors ${
                          imageSourceMode === "url"
                            ? "bg-safelight text-ink"
                            : "border border-bone/20 text-bone hover:text-paper"
                        }`}
                      >
                        Custom URL
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageSourceMode("upload")}
                        className={`label px-3 py-1.5 transition-colors ${
                          imageSourceMode === "upload"
                            ? "bg-safelight text-ink"
                            : "border border-bone/20 text-bone hover:text-paper"
                        }`}
                      >
                        Upload Local File
                      </button>
                    </div>

                    {imageSourceMode === "preset" && (
                      <div>
                        <p className="text-xs text-ash">
                          Choose from carefully graded high-resolution showcase assets:
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
                          {presetImages.map((img) => {
                            const isPicked = selectedImage === img.url;
                            return (
                              <button
                                key={img.key}
                                type="button"
                                onClick={() => setSelectedImage(img.url)}
                                className={`relative aspect-video overflow-hidden border text-left transition-all ${
                                  isPicked
                                    ? "border-safelight ring-2 ring-safelight"
                                    : "border-bone/20 opacity-70 hover:opacity-100"
                                }`}
                              >
                                <img
                                  src={img.url}
                                  alt={img.name}
                                  className="h-full w-full object-cover"
                                />
                                {isPicked && (
                                  <div className="absolute top-1 right-1 rounded-full bg-safelight p-0.5 text-ink">
                                    <Check className="h-3 w-3" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {imageSourceMode === "url" && (
                      <div className="space-y-3">
                        <input
                          type="url"
                          value={customImageUrl}
                          onChange={(e) => {
                            setCustomImageUrl(e.target.value);
                            if (e.target.value.trim()) {
                              setSelectedImage(e.target.value.trim());
                            }
                          }}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full border border-bone/20 bg-ink px-4 py-2.5 text-sm text-paper focus:border-safelight focus:outline-none"
                        />
                        <p className="text-xs text-ash">
                          Paste any direct image URL (Unsplash, Cloudinary, AWS S3, etc.)
                        </p>
                      </div>
                    )}

                    {imageSourceMode === "upload" && (
                      <div className="space-y-3">
                        <label className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-bone/20 bg-ink/60 p-6 transition-colors hover:border-safelight">
                          <Upload className="h-6 w-6 text-safelight" />
                          <span className="mt-2 text-sm text-paper">Click to upload photo</span>
                          <span className="text-xs text-ash">PNG, JPG, WebP supported</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Case Study Note */}
                  <div>
                    <label className="label block text-ash">Case Study Note &amp; Outcomes</label>
                    <textarea
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Describe what was built, problem solved, metrics achieved, or camera / grading notes..."
                      className="mt-2 w-full border border-bone/20 bg-graphite/60 p-4 text-sm text-paper focus:border-safelight focus:outline-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 border-t border-bone/12 pt-6">
                    <button
                      type="submit"
                      className="label flex items-center gap-2 border border-safelight bg-safelight px-6 py-3 text-sm text-ink font-semibold transition-all hover:bg-safelight/90"
                    >
                      <Check className="h-4 w-4" />
                      {editingProject ? "Save Changes" : "Publish to Portfolio"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setActiveTab("list");
                      }}
                      className="label border border-bone/20 px-5 py-3 text-sm text-ash hover:text-paper"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              {/* Live Preview Column */}
              <div className="lg:col-span-5">
                <div className="sticky top-6 border border-bone/15 bg-graphite/50 p-6">
                  <div className="flex items-center justify-between border-b border-bone/10 pb-3">
                    <p className="label text-safelight flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Live Portfolio Card Preview
                    </p>
                    <span className="label text-[0.625rem] text-ash">{span.replace("lg:col-", "")}</span>
                  </div>

                  {/* Card mockup */}
                  <div className="mt-6 border border-bone/12 bg-ink">
                    <div className="relative aspect-[16/10] overflow-hidden bg-graphite">
                      <img
                        src={
                          imageSourceMode === "url" && customImageUrl.trim()
                            ? customImageUrl
                            : selectedImage
                        }
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = presetImages[0].url;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="label text-safelight text-xs">
                          99 — {getCategoryLabel(category)}
                        </p>
                        <h4 className="display mt-1 text-2xl text-paper">
                          {title || "Untitled Project"}
                        </h4>
                        <p className="text-xs text-bone/70">{subtitle || "Subtitle or scope"}</p>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs leading-relaxed text-bone/70">
                        {note || "Case study notes, technical challenges, and results will appear here."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {(toolsList.length > 0 ? toolsList : ["Vite", "React"]).map((t) => (
                          <span
                            key={t}
                            className="label border border-bone/12 px-2 py-0.5 text-[0.5625rem] text-ash"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-bone/10 pt-3 text-[0.625rem] text-ash">
                        <span>Role: {role || "Creator"}</span>
                        <span>Year: {year}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-bone/50 text-center">
                    This card will render with smooth hover zoom &amp; interactive lightbox on the live portfolio.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES & SETTINGS */}
          {activeTab === "categories" && (
            <div className="max-w-4xl space-y-10">
              {/* Category Management */}
              <div>
                <div className="border-b border-bone/12 pb-4">
                  <h2 className="display text-3xl text-paper">Project Categories</h2>
                  <p className="mt-1 text-sm text-bone/70">
                    Organize your creative portfolio across disciplines. Each category has its own filter tab on the website.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {categories.map((c) => {
                    const count = projects.filter(
                      (p) => p.category.toLowerCase() === c.key.toLowerCase()
                    ).length;
                    return (
                      <div
                        key={c.key}
                        className="flex items-center justify-between border border-bone/15 bg-graphite/40 p-4"
                      >
                        <div>
                          <p className="text-paper font-medium">{c.label}</p>
                          <p className="label mt-1 text-[0.625rem] text-safelight">key: {c.key}</p>
                        </div>
                        <span className="label border border-bone/20 bg-ink px-3 py-1 text-xs text-paper">
                          {count} {count === 1 ? "project" : "projects"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Add new category form */}
                <form
                  onSubmit={handleCreateCategory}
                  className="mt-6 border border-safelight/30 bg-graphite/50 p-6"
                >
                  <p className="label text-safelight">Add New Category</p>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label block text-xs text-ash">Category Title</label>
                      <input
                        type="text"
                        required
                        value={newCatLabel}
                        onChange={(e) => setNewCatLabel(e.target.value)}
                        placeholder="e.g. Visual Effects, 3D Art, Creative Direction"
                        className="mt-2 w-full border border-bone/20 bg-ink px-4 py-2.5 text-sm text-paper focus:border-safelight focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="label block text-xs text-ash">URL / Filter Key</label>
                      <input
                        type="text"
                        value={newCatKey}
                        onChange={(e) => setNewCatKey(e.target.value)}
                        placeholder="e.g. vfx, 3d, art"
                        className="mt-2 w-full border border-bone/20 bg-ink px-4 py-2.5 text-sm text-paper focus:border-safelight focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="label mt-4 inline-flex items-center gap-2 border border-safelight bg-safelight px-5 py-2.5 text-xs text-ink font-semibold hover:bg-safelight/90"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Create Category
                  </button>
                </form>
              </div>

              {/* Data Export / Reset */}
              <div className="border-t border-bone/12 pt-8">
                <h3 className="display text-2xl text-paper">Data Backup &amp; Reset</h3>
                <p className="mt-1 text-sm text-bone/70">
                  Export all your projects as JSON or restore original starter showcase data.
                </p>

                <div className="mt-5 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      const dataStr =
                        "data:text/json;charset=utf-8," +
                        encodeURIComponent(JSON.stringify({ projects, categories }, null, 2));
                      const downloadAnchor = document.createElement("a");
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", `sneha_portfolio_data_${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      showToast("Portfolio data exported!");
                    }}
                    className="label inline-flex items-center gap-2 border border-bone/20 bg-graphite px-4 py-2.5 text-xs text-paper hover:border-safelight hover:text-safelight"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Export Portfolio JSON
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to reset all projects back to the original portfolio defaults? Any custom added projects will be erased."
                        )
                      ) {
                        resetToDefaults();
                        showToast("Reset to factory showcase projects.");
                      }
                    }}
                    className="label inline-flex items-center gap-2 border border-red-500/40 bg-graphite px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/20"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset to Default Projects
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
