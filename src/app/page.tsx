import { UIProvider } from "@/lib/ui-context";
import { Portfolio } from "@/components/Portfolio";
import { ClientHero } from "@/components/layers/ClientHero";
import { EdgeAbout } from "@/components/layers/EdgeAbout";
import { FrontendLayer } from "@/components/layers/FrontendLayer";
import { ApiProjects } from "@/components/layers/ApiProjects";
import { ServicesGraph } from "@/components/layers/ServicesGraph";
import { DatabaseExperience } from "@/components/layers/DatabaseExperience";
import { BackgroundJobs } from "@/components/layers/BackgroundJobs";
import { ResponseContact } from "@/components/layers/ResponseContact";

/** Evaluated at build time (and on revalidation) so prerendering stays static. */
async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Home() {
  const year = await getYear();
  return (
    <UIProvider year={year}>
      <Portfolio>
        <ClientHero />
        <EdgeAbout />
        <FrontendLayer />
        <ApiProjects />
        <ServicesGraph />
        <DatabaseExperience />
        <BackgroundJobs />
        <ResponseContact />
      </Portfolio>
    </UIProvider>
  );
}
