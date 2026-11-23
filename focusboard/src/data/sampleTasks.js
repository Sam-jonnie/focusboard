// Initial data - used ONLY when nothing is saved in localStorage yet.
export const STATUSES = ["To do", "In progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High"];

// `description` doubles as the grey sub-line on each row (e.g. "Website redesign · Due soon").
const t = (id, title, description, category, status, priority, dueDate) => ({ id, title, description, category, status, priority, dueDate });
export const SAMPLE_TASKS = [
  t("t-101", "Design landing page", "Website redesign · Due soon", "Design", "To do", "High", "2026-11-22"),
  t("t-102", "Fix mobile navigation", "Frontend sprint · UI polish", "Development", "To do", "Medium", "2026-11-24"),
  t("t-103", "Review onboarding copy", "Content updates · Approved", "Content", "Completed", "Low", "2026-11-18"),
  t("t-104", "Update pricing page", "Marketing site · Add annual plan", "Content", "In progress", "Medium", "2026-11-27"),
  t("t-105", "Build task filters", "Frontend sprint · Search and tabs", "Development", "In progress", "High", "2026-11-25"),
  t("t-106", "Write release notes", "Product launch · Draft ready", "Content", "In progress", "Low", "2026-11-26"),
  t("t-107", "Audit colour contrast", "Accessibility · WCAG AA", "Design", "Completed", "Medium", "2026-11-20"),
  t("t-108", "Set up CI pipeline", "Engineering · GitHub Actions", "Development", "Completed", "Medium", "2026-11-15"),
  t("t-109", "Create icon set", "Brand refresh · 24 icons", "Design", "Completed", "Low", "2026-11-12"),
  t("t-110", "Test login flow", "QA · Edge cases", "Development", "Completed", "High", "2026-11-17"),
  t("t-111", "Plan Q4 roadmap", "Team planning · Approved", "Content", "Completed", "Medium", "2026-11-10"),
  t("t-112", "Prepare demo script", "Product launch · Reviewed", "Content", "Completed", "Low", "2026-11-19"),
];

// Focus Notes slides - copy taken from the three Figma frames.
export const FOCUS_SLIDES = [
  { title: "Make today count.", body: "A little focus goes a long way.", card: { label: "Next up", title: "Design landing page", percent: 62 } },
  { title: "Small steps, big progress.", body: "Keep your priorities in view.", card: { label: "In progress", title: "Fix navigation", percent: 67 } },
  { title: "Celebrate the wins.", body: "Every completed task moves you forward.", card: { label: "Completed", title: "Onboarding copy", percent: 100 } },
];
