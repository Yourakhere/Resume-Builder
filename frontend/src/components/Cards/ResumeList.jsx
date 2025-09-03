import React from "react";
import ResumeSummaryCard from "./ResumeSummaryCard";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ResumeList = ({ resumes }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
      {resumes.map((resume) => (
        <ResumeSummaryCard
          key={resume._id}
          imgUrl={resume.thumbnailLink || ""}
          title={resume.title || ""}
          lastUpdated={
            resume.updatedAt ? moment(resume.updatedAt).format("DD MM YYYY") : ""
          }
          onSelect={() => navigate(`/resume/${resume._id}`)}
        />
      ))}
    </div>
  );
};

export default ResumeList;
