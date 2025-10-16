import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

export default function Btn({
  label,
  disabled,
  handleClick,
}: {
  label: string;
  disabled: boolean;
  handleClick: () => void;
}) {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      sx={{
        fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
        ":hover": !disabled ? { color: grey[900] } : {},
      }}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
