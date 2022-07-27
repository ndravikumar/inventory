import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function BarChart({ originalData }) {
  const [companyName, setCompanyName] = useState("");
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(new Date(newValue));
  };
  let productNames = [];
  let companyNames = [];
  let sameProducts = [];
  if (companyName) {
    sameProducts = originalData.filter((item) => item.company === companyName && new Date(item.exp) < value);
    for (let i = 0; i < sameProducts.length; i++) {
      const isDuplicateProduct = productNames.filter(
        (item) => sameProducts[i].name === item
      );
      if (isDuplicateProduct?.length === 0) {
        productNames.push(originalData[i].name);
      }
    }
  }
  const getOptions = () => {
    for (let i = 0; i < originalData.length; i++) {
      const isDuplicateCompany = companyNames.filter(
        (item) => originalData[i].company === item
      );
      if (isDuplicateCompany?.length === 0) {
        companyNames.push(originalData[i].company);
      }
    }
    return companyNames;
  };
  const dataValues = sameProducts.map((item)=> item.stock)
  const data = {
    labels: productNames,
    datasets: [
      {
        label: "Product Names",
        data: dataValues,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="bar-container">
      <div className="d-flex">
        <div className="w-50">
          <Autocomplete
            getOptionLabel={(option) => option}
            id="companyNames"
            value={companyName}
            onChange={(event, value) => setCompanyName(value)}
            options={getOptions()}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Company Name" />
            )}
          />
        </div>
        <div className="w-50">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}
