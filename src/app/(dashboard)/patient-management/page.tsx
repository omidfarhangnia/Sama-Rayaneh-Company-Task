"use client";

import AddPatientForm from "@/app/components/AddPatientForm";
import PatientManagementHeader from "@/app/components/PatientManagementHeader";
import PatientsTable from "@/app/components/PatientsTable";
import api from "@/app/lib/axios";
import { useEffect, useState } from "react";

export interface Patient {
  dateOfBirth: string;
  email: string;
  id: string;
  isActive: boolean;
  name: string;
}

export async function fetchPatients() {
  try {
    const response = await api.get("/Interview/Patient");
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
}

function Page() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const patients = await fetchPatients();
        setPatients(patients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  return (
    <div className="p-8 min-w-[80vw]">
      <AddPatientForm
        loading={loading}
        setLoading={setLoading}
        setPatients={setPatients}
      />
      <PatientManagementHeader />
      <PatientsTable
        loading={loading}
        patients={patients}
        setPatients={setPatients}
        setLoading={setLoading}
      />
    </div>
  );
}

export default Page;
