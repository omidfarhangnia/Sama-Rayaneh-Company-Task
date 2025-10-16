"use client";

import api from "@/app/lib/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

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
      <AddPatientForm setLoading={setLoading} setPatients={setPatients} />
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
  setPatients,
  setLoading,
}: {
  loading: boolean;
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
  setLoading: (loading: boolean) => void;
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
                <TableCell align="center" className="bg-blue-200">
                  آپدیت
                </TableCell>
                <TableCell align="center" className="bg-red-200">
                  حذف
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients?.map((patient: Patient) => {
                return (
                  <PatientRow
                    key={patient.id}
                    patient={patient}
                    setPatients={setPatients}
                    setLoading={setLoading}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

function PatientRow({
  patient,
  setPatients,
  setLoading,
}: {
  patient: Patient;
  setPatients: (patients: Patient[]) => void;
  setLoading: (loading: boolean) => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedName, setUpdatedName] = useState(patient.name);
  const [updatedBirthDate, setUpdatedBirthDate] = useState(
    patient.dateOfBirth.slice(0, 10)
  );
  const [updatedEmail, setUpdatedEmail] = useState(patient.email);
  const [updatedIsActive, setUpdatedIsActive] = useState(patient.isActive);

  async function handleDelete() {
    try {
      const response = await api.delete(`/Interview/Patient/${patient.id}`);

      if (response.status === 200) {
        setLoading(true);
        const updatedPatients = await fetchPatients();
        setPatients(updatedPatients);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    if (!updatedName || !updatedEmail || !updatedBirthDate) {
      alert("لطفا همه فیلد هارا پر کنید");
    }

    try {
      const response = await api.put(`/Interview/Patient/${patient.id}`, {
        name: updatedName,
        dateOfBirth: updatedBirthDate,
        email: updatedEmail,
        // this part does not work because of api structure but this project support
        // changing active value in update mode
        isActive: updatedIsActive,
      });

      if (response.status === 200) {
        setLoading(true);
        const updatedPatients = await fetchPatients();
        setPatients(updatedPatients);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelUpdate() {
    setIsUpdating(false);
    // all contain last saved data
    setUpdatedName(patient.name);
    setUpdatedBirthDate(patient.dateOfBirth);
    setUpdatedEmail(patient.email);
    setUpdatedIsActive(patient.isActive);
  }

  return (
    <>
      <TableRow>
        <TableCell align="right">
          {isUpdating ? (
            <>
              <input
                type="text"
                className="w-[70px]"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </>
          ) : (
            <>{patient.name}</>
          )}
        </TableCell>
        <TableCell align="right">
          {isUpdating ? (
            <>
              <input
                type="date"
                className="w-[100px]"
                value={updatedBirthDate}
                onChange={(e) => setUpdatedBirthDate(e.target.value)}
              />
            </>
          ) : (
            <>{patient.dateOfBirth}</>
          )}
        </TableCell>
        <TableCell align="right">
          {isUpdating ? (
            <>
              <input
                type="email"
                className="w-[120px]"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </>
          ) : (
            <>{patient.email}</>
          )}
        </TableCell>
        <TableCell align="right">
          {isUpdating ? (
            <>
              <input
                type="checkbox"
                className="w-[120px]"
                checked={updatedIsActive}
                onChange={(e) => setUpdatedIsActive(e.target.checked)}
              />
            </>
          ) : (
            <> {patient.isActive ? "فعال" : "غیر فعال"}</>
          )}
        </TableCell>
        <TableCell align="center" className="bg-blue-200 cursor-pointer">
          {isUpdating ? (
            <div className="flex gap-2">
              <span className="border-2 p-2" onClick={handleUpdate}>
                ثبت
              </span>
              <span className="border-2 p-2" onClick={handleCancelUpdate}>
                لغو
              </span>
            </div>
          ) : (
            <span
              className="border-2 px-4 py-2"
              onClick={() => setIsUpdating(true)}
            >
              اصلاح
            </span>
          )}
        </TableCell>
        <TableCell
          align="center"
          className="bg-red-200 cursor-pointer"
          onClick={handleDelete}
        >
          X
        </TableCell>
      </TableRow>
    </>
  );
}

function AddPatientForm({
  setLoading,
  setPatients,
}: {
  setLoading: (loading: boolean) => void;
  setPatients: (patients: Patient[]) => void;
}) {
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email@gmail.com");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs("2000-01-01"));

  async function handleCreatePatient() {
    if (!name || !email || !birthDate) {
      alert("لطفا همه فیلد هارا پر کنید");
    }

    try {
      const response = await api.post("/Interview/Patient", {
        name: name,
        dateOfBirth: birthDate?.toISOString(),
        email: email,
      });

      if (response.status === 200) {
        setLoading(true);
        const updatedPatients = await fetchPatients();
        setPatients(updatedPatients);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-300 p-8">
      <Typography variant="h6" component="div">
        یک بیمار جدید ثبت کنید
      </Typography>
      <form className="flex flex-col gap-4 items-start">
        <TextField
          required
          label="نام بیمار"
          size="small"
          sx={{ width: "250px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          label="ایمیل"
          size="small"
          sx={{ width: "250px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div dir="ltr">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl required>
              <InputLabel className="text-right mb-2">تاریخ تولد</InputLabel>
              <DatePicker
                sx={{ width: "250px" }}
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
              />
            </FormControl>
          </LocalizationProvider>
        </div>
        <Button
          variant="contained"
          sx={{
            width: "250px",
            fontSize: "1.25rem",
            background: "lightblue",
            color: "black",
          }}
          onClick={handleCreatePatient}
        >
          ثبت اطلاعات
        </Button>
      </form>
    </div>
  );
}

export default Page;
