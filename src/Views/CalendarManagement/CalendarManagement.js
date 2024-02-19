import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar React 컴포넌트
import dayGridPlugin from "@fullcalendar/daygrid"; // 달 그리드 플러그인
import { Unstable_Grid2 as Grid, Card } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
// import "ag-grid-enterprise";
function CalendarManagement(props) {
  const gridRef = React.useRef();
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  const [editEvent, setEditEvent] = useState(null); // 편집 중인 이벤트
  React.useEffect(() => {
    Init();
  }, []);
  const Init = async () => {
    // Dialog.ProgressBar(true);

    try {
    } catch (e) {
      //   setSnacks({
      //     toggle: true,
      //     type: "error",
      //     message: e.message,
      //   });
    } finally {
      //   Dialog.ProgressBar(false);
    }
  };

  return (
    <Grid container spacing={0} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid xs={12}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            onClick={() => {
              alert("clicked");
            }}
          >
            <AddIcon></AddIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              alert("clicked");
            }}
          >
            <SearchIcon></SearchIcon>
          </IconButton>
        </Card>
      </Grid>
      <Grid xs={12}>
        <Card>
          <div
            className="ag-theme-quartz"
            style={{ height: "100vh", width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
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

export default CalendarManagement;
