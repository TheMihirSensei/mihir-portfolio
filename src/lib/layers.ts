export type Layer = {
  id: string;
  index: number;
  name: string;
  label: string; // what the section is about, in human words
  latency: number; // cumulative fake ms when the request reaches this layer
  color: string; // css var
};

export const layers: Layer[] = [
  { id: "client", index: 0, name: "Client", label: "Hello", latency: 0, color: "var(--l0)" },
  { id: "edge", index: 1, name: "Edge / CDN", label: "About", latency: 12, color: "var(--l1)" },
  { id: "frontend", index: 2, name: "Frontend", label: "UI Skills", latency: 38, color: "var(--l2)" },
  { id: "gateway", index: 3, name: "API Gateway", label: "Projects", latency: 64, color: "var(--l3)" },
  { id: "services", index: 4, name: "Services", label: "Backend", latency: 97, color: "var(--l4)" },
  { id: "database", index: 5, name: "Database", label: "Experience", latency: 142, color: "var(--l5)" },
  { id: "jobs", index: 6, name: "Background Jobs", label: "Off the clock", latency: 155, color: "var(--l7)" },
  { id: "response", index: 7, name: "Response", label: "Contact", latency: 168, color: "var(--l6)" },
];

export const pad = (n: number, len = 2) => String(n).padStart(len, "0");
