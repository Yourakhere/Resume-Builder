import React, { useEffect, useRef, useState } from 'react';
import {
  LuMapPinHouse, LuMail, LuPhone, LuRss, LuGithub, LuUser,
} from 'react-icons/lu';
import { RiLinkedinLine } from 'react-icons/ri';

import ContactInfo from '../ResumeSections/ContactInfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import { formatYearMonth } from '../../utils/helper';
import LanguageSection from '../ResumeSections/LanguageSection';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';

const DEFAULT_THEME = ['#FFF5E5', '#FFE3B3', '#FFC66D', '#FFAA33', '#CC5500'];

const Title = ({ text, color }) => (
  <div className="mb-3 border-b-2 pb-1" style={{ borderColor: color }}>
    <h2 className="text-base font-semibold uppercase">{text}</h2>
  </div>
);

const TemplateTwo = ({ resumeData, colorPlatte, containerWidth }) => {
  const themeColors = colorPlatte?.length > 0 ? colorPlatte : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-6 bg-white text-gray-900"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : 'none',
        transformOrigin: 'top left',
        width: containerWidth > 0 ? `${baseWidth}px` : 'auto',
        height: 'auto',
      }}
    > 
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{resumeData.profileInfo.fullName}</h1>
        <p className="text-sm italic">{resumeData.profileInfo.designation}</p>
      </div>
 
      <div className="flex justify-center gap-5 mb-6 flex-wrap">
        <ContactInfo icon={<LuPhone />} iconBG={themeColors[2]} value={resumeData.contactInfo.phone} />
        <ContactInfo icon={<LuMail />} iconBG={themeColors[2]} value={resumeData.contactInfo.email} />
        <ContactInfo icon={<LuMapPinHouse />} iconBG={themeColors[2]} value={resumeData.contactInfo.location} />
        {resumeData.contactInfo.linkedin && (
          <ContactInfo icon={<RiLinkedinLine />} iconBG={themeColors[2]} value={resumeData.contactInfo.linkedin} />
        )}
        {resumeData.contactInfo.github && (
          <ContactInfo icon={<LuGithub />} iconBG={themeColors[2]} value={resumeData.contactInfo.github} />
        )}
      </div>
 
      <div className="mb-5">
        <Title text="Summary" color={themeColors[3]} />
        <p className="text-sm">{resumeData.profileInfo.summary}</p>
      </div>
 
      <div className="mb-5">
        <Title text="Work Experience" color={themeColors[3]} />
        {resumeData.workExperience.map((exp, idx) => (
          <WorkExperience
            key={`work_${idx}`}
            company={exp.company}
            role={exp.role}
            duration={`${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
            durationColor={themeColors[4]}
            description={exp.description}
          />
        ))}
      </div>
 
      <div className="mb-5">
        <Title text="Education" color={themeColors[3]} />
        {resumeData.education.map((edu, idx) => (
          <EducationInfo
            key={`edu_${idx}`}
            degree={edu.degree}
            institution={edu.institution}
            duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(edu.endDate)}`}
          />
        ))}
      </div>
 
      <div className="mb-5">
        <Title text="Projects" color={themeColors[3]} />
        {resumeData.projects.map((proj, idx) => (
          <ProjectInfo
            key={`project_${idx}`}
            title={proj.title}
            description={proj.description}
            githubLink={proj.github}
            liveDemoUrl={proj.liveDemo}
            bgColor={themeColors[2]}
          />
        ))}
      </div>
 
      <div className="mb-5">
        <Title text="Skills" color={themeColors[3]} />
        <SkillSection
          skills={resumeData.skills}
          accentColor={themeColors[4]}
          bgColor={themeColors[1]}
        />
      </div>
 
      <div className="mb-5">
        <Title text="Certifications" color={themeColors[3]} />
        <div className="grid grid-cols-2 gap-2">
          {resumeData.certifications.map((cert, idx) => (
            <CertificationInfo
              key={`cert_${idx}`}
              title={cert.title}
              issuer={cert.issuer}
              year={cert.year}
              bgColor={themeColors[1]}
            />
          ))}
        </div>
      </div>
 
      {resumeData.interests?.length > 0 && resumeData.interests[0] !== "" && (
        <div className="mb-2">
          <Title text="Interests" color={themeColors[3]} />
          <div className="flex flex-wrap gap-2 mt-2">
            {resumeData.interests.map((item, idx) =>
              item ? (
                <span
                  key={`interest_${idx}`}
                  className="px-3 py-1 text-xs rounded-full"
                  style={{ backgroundColor: themeColors[1] }}
                >
                  {item}
                </span>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateTwo;
