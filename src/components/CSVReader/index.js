import React from "react";

import { useCSVReader } from "react-papaparse";

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  browseFile: {
    width: "20%",
  },
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%",
  },
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  },
  progressBarBackgroundColor: {
    backgroundColor: "red",
  },
};

export default function CSVReader({ setSampleInventory, setOriginalData }) {
  const { CSVReader } = useCSVReader();

  const getCSVData = (items) => {
    let modifiedArray = [];
    let allData = [];

    for (let i = 1; i < items.length; i++) {
      allData.push({
        name: items[i][0],
        batch: items[i][2],
        stock: items[i][3],
        deal: items[i][4],
        free: items[i][5],
        mrp: items[i][6],
        rate: items[i][7],
        exp: items[i][8],
        company: items[i][9],
      });
    }

    setOriginalData(allData);
    for (let i = 1; i < items.length; i++) {
      const isDuplicate = modifiedArray.filter(
        (item) => items[i][0] === item.name
      );
      if (isDuplicate.length > 0) {
        const index = modifiedArray.findIndex(
          (item) => item.name === isDuplicate[0].name
        );
        modifiedArray[index].batch = "All";
        modifiedArray[index].stock =
          Number(modifiedArray[index].stock) + Number(items[i][3]);
        modifiedArray[index].deal =
          Number(modifiedArray[index].deal) + Number(items[i][4]);
        modifiedArray[index].free =
          Number(modifiedArray[index].free) + Number(items[i][5]);
        modifiedArray[index].mrp = (
          (Number(items[i][6]) + Number(modifiedArray[index].mrp)) /
          2
        ).toFixed(2);
        modifiedArray[index].rate = (
          (Number(items[i][7]) + Number(modifiedArray[index].rate)) /
          2
        ).toFixed(2);
      } else {
        modifiedArray.push({
          name: items[i][0],
          batch: items[i][2],
          stock: items[i][3],
          deal: items[i][4],
          free: items[i][5],
          mrp: items[i][6],
          rate: items[i][7],
          exp: items[i][8],
          company: items[i][9],
        });
      }
    }
    setSampleInventory(modifiedArray);
  };

  return (
    <CSVReader onUploadAccepted={(results) => getCSVData(results.data)}>
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <div style={styles.csvReader}>
            <button type="button" {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
  );
}
