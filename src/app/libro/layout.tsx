import { NavigationProvider } from "@/modules/libro_financiero/components/NavigationProvider";

export default function LibroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      {children}
    </NavigationProvider>
  );
}
