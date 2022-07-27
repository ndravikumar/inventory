import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Piechart({ originalData }) {
  const [companyName, setCompanyName] = useState("");
  let nonExpiredProducts = 0;
  let expiredProducts = 0;

  const today = new Date();

  originalData.filter((item) => {
    const exp = new Date(item.exp);
    if (item.company === companyName) {
      if (exp >= today) {
        nonExpiredProducts = nonExpiredProducts + 1;
      } else {
        expiredProducts = expiredProducts + 1;
      }
    }
  });

  const data = {
    labels: ["Expired", "Not Expired"],
    datasets: [
      {
        label: "Expired to Not Expired products",
        data: [expiredProducts, nonExpiredProducts],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const getOptions = (data) => {
    let companyNames = [];
    for (let i = 0; i < data.length; i++) {
      const isDuplicate = companyNames.filter(
        (item) => data[i].company === item
      );
      if (isDuplicate?.length === 0) {
        companyNames.push(data[i].company);
      }
    }
    return companyNames;
  };
  return (
    <div className="pie-container">
      <Autocomplete
        getOptionLabel={(option) => option}
        id="companyNames"
        value={companyName}
        onChange={(event, value) => setCompanyName(value)}
        options={getOptions(originalData)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Company Name" />}
      />
      <Pie data={data} />
    </div>
  );
}
