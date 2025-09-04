import React, { useEffect, useRef, useState } from "react";
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  colorPalette,
} from "../../utils/data";
import { LuCircleCheckBig } from "react-icons/lu";
import Tabs from "../../components/Tabs";
import TemplateCard from "../../components/Cards/TemplateCard";
import RenderResume from "../../components/ResumeTemplates/RenderResume";

const TAB_DATA = [{ label: "Templates" }, { label: "Color Palette" }];

const ThemeSelector = ({ selectedTheme, setSelectedTheme, resumeData, onClose }) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("Templates");

  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette || [],
    index: -1,
  });

  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });
 
  const handleThemeSelection = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette?.colors,
      theme: selectedTemplate?.theme,
    });
    onClose();
  };
 
  const handlePaletteSelect = (palette, index) => {
    setSelectedColorPalette({ colors: palette, index });
    setSelectedTheme((prev) => ({
      ...prev,
      colorPalette: palette,
    }));
  };
 
  const handleTemplateSelect = (templateId, index) => {
    setSelectedTemplate({ theme: templateId, index });
    setSelectedTheme((prev) => ({
      ...prev,
      theme: templateId,
    }));
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <div className="container mx-auto px-2 md:px-8"> 
      <div className="flex items-center justify-between mb-4 mt-4">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
        <button
          className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-all"
          onClick={handleThemeSelection}
        >
          <LuCircleCheckBig className="text-[16px]" />
          Done
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5"> 
        <div className="col-span-12 md:col-span-5 bg-white rounded-lg shadow-sm p-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            {tabValue === "Templates" &&
              resumeTemplates.map((template, index) => (
                <TemplateCard
                  key={`templates_${index}`}
                  thumbnailImg={template.thumbnailImg}
                  isSelected={selectedTemplate?.index === index}
                  onSelect={() => handleTemplateSelect(template.id, index)}
                />
              ))}

            {tabValue === "Color Palette" &&
              colorPalette.themeOne?.map((palette, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={palette}
                  isSelected={selectedColorPalette?.index === index}
                  onSelect={() => handlePaletteSelect(palette, index)}
                />
              ))}
          </div>
        </div>
 
        <div
          className="col-span-12 md:col-span-7 bg-white rounded-lg shadow-sm p-4 overflow-auto max-h-[80vh]"
          ref={resumeRef}
        >
          <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={resumeData || DUMMY_RESUME_DATA}
            containWidth={baseWidth}
            colorPalette={selectedColorPalette?.colors || []}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;

const ColorPalette = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 cursor-pointer ${
        isSelected ? "border-purple-500" : "border-transparent"
      }`}
      onClick={onSelect}
    >
      {colors.map((color, index) => (
        <div
          key={`color_${index}`}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
