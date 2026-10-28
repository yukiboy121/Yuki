import React, { createContext, useContext, useEffect, useState } from "react";
import { projects as defaultProjects, images, type Project } from "../data";

export interface CategoryItem {
  key: string;
  label: string;
}

export const defaultCategories: CategoryItem[] = [
  { key: "web", label: "Web Development" },
  { key: "design", label: "Graphic Design" },
  { key: "photo", label: "Photography" },
  { key: "vfx", label: "VFX Study" },
];

export interface NewProjectInput {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  tools: string[];
  image: string;
  note: string;
  span?: string;
}

interface ProjectsContextType {
  projects: Project[];
  categories: CategoryItem[];
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  editingProject: Project | null;
  setEditingProject: (proj: Project | null) => void;
  addProject: (input: NewProjectInput) => Project;
  updateProject: (id: string, input: Partial<NewProjectInput>) => void;
  deleteProject: (id: string) => void;
  addCategory: (key: string, label: string) => void;
  resetToDefaults: () => void;
  getCategoryLabel: (key: string) => string;
  presetImages: { key: string; name: string; url: string }[];
}

const STORAGE_KEY_PROJECTS = "sneha_portfolio_projects_v1";
const STORAGE_KEY_CATEGORIES = "sneha_portfolio_categories_v1";

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load projects from localStorage", e);
    }
    return defaultProjects;
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load categories from localStorage", e);
    }
    return defaultCategories;
  });

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error("Failed to persist projects to localStorage", e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error("Failed to persist categories to localStorage", e);
    }
  }, [categories]);

  const presetImages = [
    { key: "hero", name: "Cinematic Suite (Hero)", url: images.hero },
    { key: "webA", name: "Serendib Mountain Trail", url: images.webA },
    { key: "webB", name: "Ceylon Roast Coffee", url: images.webB },
    { key: "designA", name: "Ruhunu Risograph Poster", url: images.designA },
    { key: "designB", name: "Sanka Architectural Identity", url: images.designB },
    { key: "photo1", name: "Monsoon Galle Ramparts", url: images.photo1 },
    { key: "photo2", name: "Nuwara Eliya Mist Valley", url: images.photo2 },
    { key: "photo3", name: "Pettah Night Market Street", url: images.photo3 },
    { key: "vfx", name: "Smoke & Ember VFX Plate", url: images.vfx },
  ];

  const getCategoryLabel = (key: string): string => {
    const found = categories.find((c) => c.key.toLowerCase() === key.toLowerCase());
    return found ? found.label : key.toUpperCase();
  };

  const addProject = (input: NewProjectInput): Project => {
    const nextIndex = String(projects.length + 1).padStart(2, "0");
    const idSlug =
      input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `proj-${Date.now()}`;
    const uniqueId = `${idSlug}-${Math.random().toString(36).substring(2, 6)}`;

    const newProj: Project = {
      id: uniqueId,
      index: nextIndex,
      title: input.title,
      subtitle: input.subtitle,
      category: input.category as any,
      year: input.year || String(new Date().getFullYear()),
      role: input.role || "Creator",
      tools: input.tools.length > 0 ? input.tools : ["Vite", "React"],
      image: input.image || images.webA,
      note: input.note,
      span: input.span || (projects.length % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5"),
    };

    setProjects((prev) => [newProj, ...prev]);
    return newProj;
  };

  const updateProject = (id: string, input: Partial<NewProjectInput>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          ...input,
          category: (input.category ?? p.category) as any,
          tools: input.tools ?? p.tools,
          span: input.span ?? p.span,
        };
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = (key: string, label: string) => {
    const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    if (!cleanKey) return;
    if (categories.some((c) => c.key === cleanKey)) return;
    setCategories((prev) => [...prev, { key: cleanKey, label: label.trim() || cleanKey }]);
  };

  const resetToDefaults = () => {
    setProjects(defaultProjects);
    setCategories(defaultCategories);
    localStorage.removeItem(STORAGE_KEY_PROJECTS);
    localStorage.removeItem(STORAGE_KEY_CATEGORIES);
  };

  return (
    <ProjectsContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
