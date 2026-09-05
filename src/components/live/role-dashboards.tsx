import { facultyApi } from "@/lib/faculty-api";
import { industryApi } from "@/lib/industry-api";
import { institutionApi } from "@/lib/institution-api";
import { studentApi } from "@/lib/student-api";

import FacultyDashboard, { hydrateFacultyDashboard } from "@/pages/FacultyDashboard";
import IndustryDashboard, { hydrateIndustryDashboard } from "@/pages/IndustryDashboard";
import InstitutionDashboard, { hydrateInstitutionDashboard } from "@/pages/InstitutionDashboard";
import StudentDashboard, { hydrateStudentDashboard } from "@/pages/StudentDashboard";

import { LiveDashboard } from "./live-dashboard";

export function LiveStudentDashboard() {
  return (
    <LiveDashboard
      load={() => studentApi.getDashboard()}
      hydrate={hydrateStudentDashboard}
      label="Loading student workspace…"
    >
      <StudentDashboard />
    </LiveDashboard>
  );
}

export function LiveFacultyDashboard() {
  return (
    <LiveDashboard
      load={() => facultyApi.getDashboard()}
      hydrate={hydrateFacultyDashboard}
      label="Loading academician workspace…"
    >
      <FacultyDashboard />
    </LiveDashboard>
  );
}

export function LiveIndustryDashboard() {
  return (
    <LiveDashboard
      load={() => industryApi.getDashboard()}
      hydrate={hydrateIndustryDashboard}
      label="Loading industry workspace…"
    >
      <IndustryDashboard />
    </LiveDashboard>
  );
}

export function LiveInstitutionDashboard() {
  return (
    <LiveDashboard
      load={() => institutionApi.getDashboard()}
      hydrate={hydrateInstitutionDashboard}
      label="Loading institution workspace…"
    >
      <InstitutionDashboard />
    </LiveDashboard>
  );
}
