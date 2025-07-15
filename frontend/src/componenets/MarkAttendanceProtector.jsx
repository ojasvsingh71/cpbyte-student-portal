import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  colors,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { checkStatus } from "../redux/slices/checkStatus";
import toast from "react-hot-toast";

function MarkAttendanceProtector({ setIsMarked }) {
  const { data } = useSelector((state) => state.checkStatus);
  const [domain, setDomain] = useState("");
  const [rawDate, setRawDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.dashboard.data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain || !rawDate) {
      toast.error("Please fill all the fields!", {
        style: {
          background: "#1c1c1c",
          color: "#fff",
          border: "1px solid #0ec1e7",
          padding: "12px 16px",
        },
      });
      return;
    }

    const DSA = domain === user?.domain_dsa;
    const date = new Date(rawDate + "T00:00:00.000Z");
    dispatch(checkStatus({ domain, date, DSA }));
  };

  useEffect(() => {
    if (data === null) {
      setIsMarked(0);
    } else if (data.marked) {
      setIsMarked(2);
    } else if (!data.marked) {
      setIsMarked(1);
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {/* 🔹 Glassmorphic Card */}
      <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-white border border-white/20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Mark Attendance
          </h2>

          <p className="text-sm text-center text-white/80">
            Today's Date:{" "}
            <span className="font-medium">{new Date().toDateString()}</span>
          </p>

          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                color: "white",
              },
            }}
          >
            <InputLabel
              id="domain_label"
              sx={{
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                },
              }}
            >
              Select Domain
            </InputLabel>
            <Select
              labelId="domain_label"
              id="domain"
              label="Domain"
              value={domain}
              required
              onChange={(e) => setDomain(e.target.value)}
              className="bg-white/20"
              sx={{
                color: "white",
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "28px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#060606ff",
                    color: "white",
                  },
                },
              }}
            >
              <MenuItem value={user?.domain_dsa}>{user?.domain_dsa}</MenuItem>
              <MenuItem value={user?.domain_dev}>{user?.domain_dev}</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            type="text"
            label="Date"
            variant="outlined"
            value={rawDate}
            InputProps={{
              readOnly: true,
              style: { color: "white" },
            }}
            fullWidth
            className="bg-white/20 rounded-lg"
            InputLabelProps={{
              style: { color: "white" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            className="font-semibold"
            sx={{
              backgroundColor: "#0ec1e7",
              boxShadow: "none",
              borderRadius: "28px",
              paddingY: "10px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0daed1",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default MarkAttendanceProtector;
