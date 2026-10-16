import { PagePlaceholder } from "@/components/common/PagePlaceholder";

export default function NotFound() {
  return (
    <PagePlaceholder
      page={{ title: "Page not found", description: "Sorry — we couldn't find that page. Please use the menu to continue." }}
    />
  );
}
