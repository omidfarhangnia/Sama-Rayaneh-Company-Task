import api from "@/app/lib/axios";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { fetchPatients, Patient } from "../(dashboard)/patient-management/page";

function AddPatientForm({
  loading,
  setLoading,
  setPatients,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setPatients: (patients: Patient[]) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs(""));

  async function handleCreatePatient() {
    if (!name || !email || !birthDate) {
      alert("لطفا همه فیلد هارا پر کنید");
    }

    try {
      setLoading(true);
      const response = await api.post("/Interview/Patient", {
        name: name,
        dateOfBirth: birthDate?.toISOString(),
        email: email,
      });

      if (response.status === 200) {
        const updatedPatients = await fetchPatients();
        setPatients(updatedPatients);
        // reset form inputs
        setName("");
        setEmail("");
        setBirthDate(dayjs(""));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          disabled={loading}
          sx={{
            width: "250px",
            fontSize: "1.25rem",
            background: "lightblue",
            color: "black",
          }}
          onClick={handleCreatePatient}
        >
          {loading ? "در حال ثبت" : "ثبت اطلاعات"}
        </Button>
      </form>
    </div>
  );
}

export default AddPatientForm;
