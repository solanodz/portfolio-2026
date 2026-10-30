import { slugifyHeading } from "@/lib/article-headings";

export function getExperienceCompanyId(jobId: string) {
  return `exp-${jobId.toLowerCase()}`;
}

export function getExperienceProjectId(
  jobId: string,
  scopeId: string,
  title: string,
) {
  return `exp-${jobId.toLowerCase()}-${scopeId.toLowerCase()}-${slugifyHeading(title)}`;
}
