import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { fetchPatients, Patient } from "../(dashboard)/patient-management/page";
import { useState } from "react";
import api from "../lib/axios";

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
  async function handleDelete(patientId: string) {
    try {
      setLoading(true);
      const response = await api.delete(`/Interview/Patient/${patientId}`);

      if (response.status === 200) {
        // using optimistic update for better performance
        setPatients(patients.filter((patient) => patient.id !== patientId));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(
    patientId: string,
    newName: string,
    newEmail: string,
    newBirthDate: string,
    newActiveState: boolean
  ) {
    if (!newName || !newEmail || !newBirthDate) {
      alert("لطفا همه فیلد هارا پر کنید");
      return;
    }

    try {
      setLoading(true);
      const response = await api.put(`/Interview/Patient/${patientId}`, {
        name: newName,
        dateOfBirth: newBirthDate,
        email: newEmail,
        // this part does not work because of api structure but this project support
        // changing active value in update mode
        isActive: newActiveState,
      });
      if (response.status === 200) {
        const updatedPatients = await fetchPatients();
        setPatients(updatedPatients);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
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
  handleDelete,
  handleUpdate,
}: {
  patient: Patient;
  handleDelete: (patientId: string) => void;
  handleUpdate: (
    patientId: string,
    newName: string,
    newEmail: string,
    newBirthDate: string,
    newActiveState: boolean
  ) => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState(patient.name);
  const [newBirthDate, setNewBirthDate] = useState(
    patient.dateOfBirth.slice(0, 10)
  );
  const [newEmail, setNewEmail] = useState(patient.email);
  const [newActiveState, setNewActiveState] = useState(patient.isActive);

  function handleCancelUpdate() {
    setIsUpdating(false);
    // all contain last saved data
    setNewName(patient.name);
    setNewBirthDate(patient.dateOfBirth);
    setNewEmail(patient.email);
    setNewActiveState(patient.isActive);
  }

  function handleSubmitUpdate() {
    handleUpdate(patient.id, newName, newEmail, newBirthDate, newActiveState);
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
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
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
                value={newBirthDate}
                onChange={(e) => setNewBirthDate(e.target.value)}
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
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
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
                checked={newActiveState}
                onChange={(e) => setNewActiveState(e.target.checked)}
              />
            </>
          ) : (
            <> {patient.isActive ? "فعال" : "غیر فعال"}</>
          )}
        </TableCell>
        <TableCell align="center" className="bg-blue-200 cursor-pointer">
          {isUpdating ? (
            <div className="flex gap-2">
              <span className="border-2 p-2" onClick={handleSubmitUpdate}>
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
          onClick={() => handleDelete(patient.id)}
        >
          X
        </TableCell>
      </TableRow>
    </>
  );
}

export default PatientsTable;
