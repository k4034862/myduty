import React, { useState } from "react";
import { Unstable_Grid2 as Grid, Card } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
function UserGroup(props) {
  const gridRef = React.useRef();

  // Column Definitions: Defines & controls grid columns.

  return (
    <Grid container spacing={0} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid xs={12}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          > */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                width: "120px",
                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" },
                "& .MuiOutlinedInput-root": {
                  "&:hover > fieldset": { borderColor: "#C7C8CD" },
                  height: "48px",
                  borderRadius: "6px",
                },
              }}
              defaultValue={dayjs(props.dateInputs.startDate)}
              onChange={(e) => {
                props.setDateInputs({
                  ...props.dateInputs,
                  startDate: e,
                });
                props.UserGroupSelect();
              }}
            />
          </LocalizationProvider>
          ~ */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Uncontrolled picker"
              defaultValue={dayjs("2022-04-17")}
            />
            <DatePicker label="Controlled picker" />
          </LocalizationProvider>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                width: "120px",
                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" },
                "& .MuiOutlinedInput-root": {
                  "&:hover > fieldset": { borderColor: "#C7C8CD" },
                  height: "48px",
                  borderRadius: "6px",
                },
              }}
              value={dayjs(new Date(props.dateInputs.startDate)).add(7, "day")}
              readOnly
            />
          </LocalizationProvider> */}
          {/* </div> */}
          <div>
            <IconButton
              onClick={() => {
                props.ScheduleSelect();
              }}
            >
              <SearchIcon></SearchIcon>
            </IconButton>
          </div>
        </Card>
      </Grid>
      <Grid xs={12}>
        <Card>
          <div
            className="ag-theme-quartz"
            style={{
              height: "calc(100vh - 150px)",
              width: "100%",
              overflow: "auto",
            }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={props.rowData}
              columnDefs={props.columnDefs}
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                editable: true,
                resizable: true,
                sortable: true,
                filter: true,
                floatingFilter: true,
              }}
            />
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserGroup;
