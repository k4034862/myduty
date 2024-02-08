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
import dayjs, { Dayjs } from "dayjs";
function UserGroup(props) {
  const gridRef = React.useRef();

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "userId", headerName: "", headerHeight: 0 },
    { field: "userId", headerName: "사용자" },
    { field: "groupName", headerName: "그룹명" },
    { field: "electric" },
  ]);

  const [editEvent, setEditEvent] = useState(null); // 편집 중인 이벤트

  return (
    <Grid container spacing={0} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <dlv
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: "30%",
                  "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                  "& .MuiOutlinedInput-root": {
                    "&:hover > fieldset": { borderColor: "#C7C8CD" },
                    height: "48px",
                    borderRadius: "6px",
                  },
                }}
                defaultValue={dayjs(props.dateInputs.startDate)}
                onChange={(e) =>
                  props.setDateInputs({
                    ...props.dateInputs,
                    startDate: e,
                  })
                }
              />
            </LocalizationProvider>
            ~
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: "30%",
                  "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                  "& .MuiOutlinedInput-root": {
                    "&:hover > fieldset": { borderColor: "#C7C8CD" },
                    height: "48px",
                    borderRadius: "6px",
                  },
                }}
                defaultValue={dayjs(props.dateInputs.endDate)}
                onChange={(e) =>
                  props.setDateInputs({
                    ...props.dateInputs,
                    endDate: e,
                  })
                }
              />
            </LocalizationProvider>
          </dlv>
          <div>
            {" "}
            {/* <IconButton
              onClick={() => {
                alert("clicked");
              }}
            >
              <AddIcon></AddIcon>
            </IconButton> */}
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
      <Grid item xs={12}>
        <Card>
          <div
            className="ag-theme-quartz"
            style={{ height: "100vh", width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={props.rowData}
              columnDefs={colDefs}
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
