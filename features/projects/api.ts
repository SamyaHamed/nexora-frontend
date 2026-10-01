import "server-only";
import { USE_MOCK_API } from "@/lib/api";
import { backendFetch } from "@/lib/api-server";
import { mockDb, uniqueSlug } from "@/lib/mock/db";
import type { Project, ProjectInput } from "./types";

const newestFirst = (a: Project, b: Project) => b.createdAt.localeCompare(a.createdAt);

export async function listProjects({ publishedOnly = false } = {}): Promise<Project[]> {
  const all = USE_MOCK_API
    ? structuredClone(mockDb().projects)
    : await backendFetch<Project[]>("/projects", { auth: !publishedOnly });
  return all.filter((project) => !publishedOnly || project.published).sort(newestFirst);
}

export async function getProject(id: string): Promise<Project | null> {
  if (USE_MOCK_API) {
    const project = mockDb().projects.find((item) => item.id === id);
    return project ? structuredClone(project) : null;
  }
  return backendFetch<Project>(`/projects/${encodeURIComponent(id)}`, { auth: true }).catch(() => null);
}

export async function createProject(input: ProjectInput): Promise<Project> {
  if (!USE_MOCK_API) return backendFetch<Project>("/projects", { method: "POST", body: input, auth: true });

  const { projects } = mockDb();
  const project: Project = {
    ...input,
    id: uniqueSlug(input.title.en, projects.map((item) => item.id)),
    createdAt: new Date().toISOString(),
  };
  projects.push(project);
  return structuredClone(project);
}

export async function updateProject(id: string, input: ProjectInput): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/projects/${encodeURIComponent(id)}`, { method: "PUT", body: input, auth: true });
    return;
  }
  const project = mockDb().projects.find((item) => item.id === id);
  if (project) Object.assign(project, input);
}

export async function deleteProject(id: string): Promise<void> {
  if (!USE_MOCK_API) {
    await backendFetch(`/projects/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
    return;
  }
  const db = mockDb();
  db.projects = db.projects.filter((item) => item.id !== id);
}
