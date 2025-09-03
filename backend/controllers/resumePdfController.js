const PDFDocument = require("pdfkit");
const Resume = require("../models/Resume");

// Generate Resume PDF
const generateResumePDF = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${resume.title || "resume"}.pdf`);
    doc.pipe(res);

    // ---------- Header ----------
    doc.fontSize(20).text(resume.profileInfo.fullName || "Your Name", { align: "center" });
    doc.fontSize(12).text(resume.profileInfo.designation || "", { align: "center" });
    doc.moveDown();

    // ---------- Contact Info ----------
    doc.fontSize(10).text(`Email: ${resume.contactInfo?.email || ""}`);
    doc.text(`Phone: ${resume.contactInfo?.phone || ""}`);
    doc.text(`Location: ${resume.contactInfo?.location || ""}`);
    if (resume.contactInfo?.linkedin) doc.text(`LinkedIn: ${resume.contactInfo.linkedin}`);
    if (resume.contactInfo?.github) doc.text(`GitHub: ${resume.contactInfo.github}`);
    doc.moveDown();

    // ---------- Summary ----------
    doc.fontSize(12).text("Summary", { underline: true });
    doc.fontSize(10).text(resume.profileInfo?.summary || "No summary provided");
    doc.moveDown();

    // ---------- Work Experience ----------
    doc.fontSize(12).text("Work Experience", { underline: true });
    resume.workExperience?.forEach((exp) => {
      doc.fontSize(10).text(`${exp.role} @ ${exp.company} (${exp.startDate} - ${exp.endDate})`);
      doc.text(exp.description || "");
      doc.moveDown();
    });

    // ---------- Education ----------
    doc.fontSize(12).text("Education", { underline: true });
    resume.education?.forEach((edu) => {
      doc.fontSize(10).text(`${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.endDate})`);
      doc.text(edu.description || "");
      doc.moveDown();
    });

    // ---------- Skills ----------
    doc.fontSize(12).text("Skills", { underline: true });
    resume.skills?.forEach((s) => {
      doc.fontSize(10).text(`${s.name} (${s.progress}%)`);
    });
    doc.moveDown();

    // ---------- Projects ----------
    doc.fontSize(12).text("Projects", { underline: true });
    resume.projects?.forEach((p) => {
      doc.fontSize(10).text(p.title);
      doc.text(p.description || "");
      if (p.github) doc.text(`GitHub: ${p.github}`);
      if (p.liveDemo) doc.text(`Live: ${p.liveDemo}`);
      doc.moveDown();
    });

    // ---------- Certifications ----------
    doc.fontSize(12).text("Certifications", { underline: true });
    resume.certifications?.forEach((c) => {
      doc.fontSize(10).text(`${c.title} - ${c.issuer} (${c.year})`);
    });
    doc.moveDown();

    // ---------- Languages ----------
    doc.fontSize(12).text("Languages", { underline: true });
    resume.languages?.forEach((l) => {
      doc.fontSize(10).text(`${l.name} (${l.progress}%)`);
    });
    doc.moveDown();

    // ---------- Interests ----------
    doc.fontSize(12).text("Interests", { underline: true });
    doc.fontSize(10).text(resume.interests?.join(", ") || "");

    // End
    doc.end();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ message: "Failed to generate PDF", error: error.message });
  }
};

module.exports = { generateResumePDF };
