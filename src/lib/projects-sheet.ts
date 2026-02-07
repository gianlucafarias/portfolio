import "server-only";

import { google } from "googleapis";
import { cache } from "react";

export interface CaseStudy {
  role?: string;
  year?: string;
  challenge?: string;
  solution?: string;
  process?: string[];
  results?: string;
  myRole?: string;
  technicalArchitecture?: string;
  impact?: string;
  majorChallenge?: string;
  currentUsage?: string;
  keyLearnings?: string[];
  migrationStrategy?: string[];
}

export interface Project {
  title: string;
  slug?: string;
  image?: string;
  description?: string;
  shortDescription?: string;
  tags?: string[];
  link?: string;
  github?: string;
  caseStudy?: CaseStudy;
}

interface ProjectRow {
  [key: string]: string | undefined;
}

const PROJECTS_SHEET_TAB = process.env.PROJECTS_SHEET_TAB || "projects";

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

const getSheetsClient = cache(async () => {
  const privateKey = getRequiredEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");

  const auth = await google.auth.getClient({
    projectId: getRequiredEnv("GOOGLE_PROJECT_ID"),
    credentials: {
      type: "service_account",
      private_key: privateKey,
      client_email: getRequiredEnv("GOOGLE_CLIENT_EMAIL"),
      client_id: process.env.GOOGLE_CLIENT_ID,
      token_url: process.env.GOOGLE_TOKEN_URI,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
});

const normalizeHeader = (value: string | undefined) =>
  (value || "").trim().toLowerCase();

const parseBoolean = (value?: string) => {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
};

const parseList = (value?: string) => {
  if (!value) return [] as string[];
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseTags = (value?: string) => {
  if (!value) return [] as string[];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getLocaleValue = (
  row: ProjectRow,
  base: string,
  locale: "es" | "en",
) => {
  const localized = row[`${base}_${locale}`];
  if (localized && localized.trim()) return localized.trim();
  if (locale === "en") {
    const fallback = row[`${base}_es`];
    if (fallback && fallback.trim()) return fallback.trim();
  }
  return undefined;
};

const buildProjectFromRow = (
  row: ProjectRow,
  locale: "es" | "en",
): Project | null => {
  const slug = row.slug?.trim();
  if (!slug) return null;

  const title = getLocaleValue(row, "title", locale);
  if (!title) return null;

  const description = getLocaleValue(row, "description", locale);
  const shortDescription = getLocaleValue(row, "short", locale);

  const project: Project = {
    slug,
    title,
    description,
    shortDescription,
    image: row.image?.trim() || undefined,
    link: row.link?.trim() || undefined,
    github: row.github?.trim() || undefined,
    tags: parseTags(row.tags),
  };

  const caseStudy: CaseStudy = {
    role: getLocaleValue(row, "case_role", locale),
    year: row.case_year?.trim() || undefined,
    challenge: getLocaleValue(row, "case_challenge", locale),
    solution: getLocaleValue(row, "case_solution", locale),
    process: parseList(getLocaleValue(row, "case_process", locale)),
    results: getLocaleValue(row, "case_results", locale),
    myRole: getLocaleValue(row, "case_my_role", locale),
    technicalArchitecture: getLocaleValue(
      row,
      "case_technical_architecture",
      locale,
    ),
    impact: getLocaleValue(row, "case_impact", locale),
    majorChallenge: getLocaleValue(row, "case_major_challenge", locale),
    currentUsage: getLocaleValue(row, "case_current_usage", locale),
    keyLearnings: parseList(getLocaleValue(row, "case_key_learnings", locale)),
    migrationStrategy: parseList(
      getLocaleValue(row, "case_migration_strategy", locale),
    ),
  };

  const hasCaseStudy = Object.values(caseStudy).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  });

  if (hasCaseStudy) {
    project.caseStudy = caseStudy;
  }

  return project;
};

const fetchProjectRows = cache(async (): Promise<ProjectRow[]> => {
  const sheets = await getSheetsClient();
  const spreadsheetId = getRequiredEnv("NEXT_PUBLIC_SHEET_ID");

  const escapedTab = PROJECTS_SHEET_TAB.replace(/'/g, "''");
  const range = `'${escapedTab}'!A:ZZ`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const values = response.data.values || [];
  if (values.length === 0) return [];

  const [headerRow, ...dataRows] = values;
  const headers = headerRow.map((header) => normalizeHeader(String(header)));

  return dataRows.map((row) => {
    const record: ProjectRow = {};
    headers.forEach((header, index) => {
      if (!header) return;
      record[header] = row[index] ? String(row[index]) : undefined;
    });
    return record;
  });
});

export const getProjectsByLocale = cache(async (locale: "es" | "en") => {
  const rows = await fetchProjectRows();

  const publishedRows = rows.filter((row) => {
    const published = row.published ? parseBoolean(row.published) : true;
    return published;
  });

  const projects = publishedRows
    .map((row) => buildProjectFromRow(row, locale))
    .filter((project): project is Project => Boolean(project));

  const withMeta = projects.map((project) => {
    const row = publishedRows.find((item) => item.slug === project.slug);
    const pinned = row?.pinned ? parseBoolean(row.pinned) : false;
    const orderValue = row?.order ? Number(row.order) : Number.NaN;
    return { project, pinned, order: orderValue };
  });

  const sortProjects = (list: typeof withMeta) =>
    [...list].sort((a, b) => {
      const aOrder = Number.isFinite(a.order) ? a.order : Number.POSITIVE_INFINITY;
      const bOrder = Number.isFinite(b.order) ? b.order : Number.POSITIVE_INFINITY;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.project.title.localeCompare(b.project.title, "es", {
        sensitivity: "base",
      });
    });

  const pinProjects = sortProjects(withMeta.filter((item) => item.pinned)).map(
    (item) => item.project,
  );

  const otherProjects = sortProjects(
    withMeta.filter((item) => !item.pinned),
  ).map((item) => item.project);

  return { pinProjects, otherProjects };
});

export const getAllProjectSlugs = cache(async () => {
  const rows = await fetchProjectRows();
  return rows
    .filter((row) => {
      const published = row.published ? parseBoolean(row.published) : true;
      return published && row.slug && row.slug.trim();
    })
    .map((row) => row.slug!.trim());
});

export const getProjectBySlug = cache(async (
  locale: "es" | "en",
  slug: string,
) => {
  const rows = await fetchProjectRows();
  const row = rows.find((item) => item.slug?.trim() === slug);
  if (!row) return null;

  const published = row.published ? parseBoolean(row.published) : true;
  if (!published) return null;

  return buildProjectFromRow(row, locale);
});
