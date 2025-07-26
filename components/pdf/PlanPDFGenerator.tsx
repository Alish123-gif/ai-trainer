"use client";
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PlanPDFDocument from "./PlanPDFDocument";
import { Button } from "@/components/ui/button";
import { Plan } from "@/lib/types";

const PlanPDFGenerator = ({
  plan,
  onPreviewClick,
}: {
  plan: Plan;
  onPreviewClick: () => void;
}) => {
  return (
    <div className="flex space-x-3">
      <PDFDownloadLink
        document={<PlanPDFDocument plan={plan} />}
        fileName={`${plan.name.replace(/\s+/g, "_")}.pdf`}
      >
        {({ loading }) => (
          <Button disabled={loading}>
            {loading ? "Preparing document..." : "Download PDF"}
          </Button>
        )}
      </PDFDownloadLink>

      <Button variant="outline" onClick={onPreviewClick}>
        Preview PDF
      </Button>
    </div>
  );
};

export default PlanPDFGenerator;
