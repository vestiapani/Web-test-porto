
export interface Project {
  id: string;
  title: string;
  description: string | null;
  tech_stack: string[] | null;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  created_at: string;
}
