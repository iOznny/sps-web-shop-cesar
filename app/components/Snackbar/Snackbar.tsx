import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackbarProps {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose: () => void;
}

const SnackbarAlert: React.FC<SnackbarProps> = ({ open, message, severity = "success", duration, onClose }) => {
  return (
    <Snackbar open={ open } autoHideDuration={ duration } onClose={ onClose }  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert onClose={ onClose } severity={ severity } variant="filled" sx={{ width: "100%" }}>
        { message }
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
