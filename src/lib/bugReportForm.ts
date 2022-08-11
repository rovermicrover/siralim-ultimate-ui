export function buildBugReportUrl({
  dataType,
  target,
}: {
  dataType: string;
  target: string;
}): string {
  const url = new URL(
    "https://docs.google.com/forms/d/e/1FAIpQLScxlEAJEhjC-R7MNLRKnJbHxNafW2JmpJFNDZmoSSxQumIJeQ/viewform"
  );
  url.searchParams.append("entry.1487200738", dataType);
  url.searchParams.append("entry.1009744106", target);
  return url.toString();
}
