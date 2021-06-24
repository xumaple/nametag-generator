import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export default function PdfDisplay(props) {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = (numPages) => {
    setNumPages(numPages);
  };console.log(props);

  return (
    <Document
      {...props}
      options={{ workerSrc: "pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
