"use client";

import api from "@/app/lib/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

interface Patient {
  dateOfBirth: string;
  email: string;
  id: string;
  isActive: boolean;
  name: string;
}

async function fetchPatients() {
  try {
    const response = await api.get("/Interview/Patient");
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
}

function PatientManagementHeader() {
  return (
    <Typography variant="h4" sx={{ m: "30px" }}>
      لیست بیماران
    </Typography>
  );
}

function PatientsTable({
  loading,
  patients,
}: {
  loading: boolean;
  patients: Patient[];
}) {
  return (
    <>
      {loading ? (
        <Typography
          variant="h6"
          component="div"
          sx={{ mx: "40px", fontSize: "0.9rem" }}
        >
          در حال دریافت اطلاعات
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: "1.25rem",
                  }}
                >
                  نام بیمار
                </TableCell>
                <TableCell align="right">تاریخ تولد</TableCell>
                <TableCell align="right">ایمیل</TableCell>
                <TableCell align="right">وضعیت فعالیت</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients?.map((patient: Patient) => {
                return (
                  <TableRow key={patient.id}>
                    <TableCell align="right">{patient.name}</TableCell>
                    <TableCell align="right">{patient.dateOfBirth}</TableCell>
                    <TableCell align="right">{patient.email}</TableCell>
                    <TableCell align="right">
                      {patient.isActive ? "فعال" : "غیر فعال"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

function Page() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  return (
    <div className="p-8">
      <PatientManagementHeader />
      <PatientsTable loading={loading} patients={patients} />
    </div>
  );
}

export default Page;
