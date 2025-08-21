package com.studyNest.controller;

import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.studyNest.model.Student;
import com.studyNest.model.StudentResult;
import com.studyNest.repository.StudentRepository;
import com.studyNest.repository.StudentResultRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Controller
public class ProgressController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentResultRepository studentResultRepository;

    @GetMapping("/chatbot")
    public String showChatbotPage() {
        return "chatbot";  // Sirf page load ke liye
    }

    @GetMapping("/progress")
    public String showProgress(Model model) {
        // Make sure to set this attribute with a boolean value
        model.addAttribute("certificateAvailable", false); // or true based on your logic
        return "progress";
    }

    @PostMapping("/check-progress")
    public String checkProgress(@RequestParam("name") String name, @RequestParam("rollNumber") String rollNumber, Model model) {
        // Fetch result by name and roll number
        StudentResult result = studentResultRepository.findByStudentNameAndRollNumber(name, rollNumber);

        if (result == null) {
            model.addAttribute("error", "No results found for this student.");
            model.addAttribute("certificateAvailable", false);
            return "progress";
        }

        boolean isPassed = false;
        if (result.getStatus() != null && result.getAverageMarks() != null) {
            isPassed = "Pass".equalsIgnoreCase(result.getStatus()) && result.getAverageMarks().compareTo(BigDecimal.valueOf(6)) >= 0;
        }

        if (!isPassed) {
            model.addAttribute("passStatusMessage", "Complete all the modules and get an average above 6 to download the certificate.");
            model.addAttribute("certificateAvailable", false);
        } else {
            model.addAttribute("passStatusMessage", "Congratulations! You passed.");
            model.addAttribute("certificateAvailable", true);
        }

        model.addAttribute("studentName", name);
        model.addAttribute("rollNumber", rollNumber);

        return "progress";
    }


    @GetMapping("/download-certificate")
    @ResponseBody
    public void downloadCertificate(@RequestParam("name") String name, @RequestParam("rollNumber") String rollNumber, HttpServletResponse response) throws IOException, DocumentException {
        // Fetch result by name and roll number
        StudentResult result = studentResultRepository.findByStudentNameAndRollNumber(name, rollNumber);

        if (result == null) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "No results found for this student.");
            return;
        }

        if (!isCompleted(result) || !"Pass".equalsIgnoreCase(result.getStatus())) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Modules not completed or student has not passed.");
            return;
        }

        ByteArrayOutputStream byteArrayOutputStream = generatePdfCertificate(result);

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=certificate_" + rollNumber + "_sem" + result.getModuleSemester() + ".pdf");
        response.getOutputStream().write(byteArrayOutputStream.toByteArray());
        response.getOutputStream().flush();
    }

    private boolean isCompleted(StudentResult result) {
        // Check if all modules have marks
        return result.getModule1Marks() != null &&
                result.getModule2Marks() != null &&
                result.getModule3Marks() != null &&
                result.getModule4Marks() != null &&
                result.getModule5Marks() != null;
    }

    private ByteArrayOutputStream generatePdfCertificate(StudentResult result) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4.rotate());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, out);
        document.open();

        // Load background template
        Image bgImage = Image.getInstance("src/main/resources/static/images/CERTIFICATE_TEMPLATE.png");
        bgImage.setAbsolutePosition(0, 0);
        bgImage.scaleAbsolute(PageSize.A4.getHeight(), PageSize.A4.getWidth());
        PdfContentByte canvas = writer.getDirectContentUnder();
        canvas.addImage(bgImage);

        PdfContentByte cb = writer.getDirectContent();

        // ✍️ Start writing text
        cb.beginText();

        // 🔹 Name Font Setup (Bigger & Bold)
        BaseFont nameFont = BaseFont.createFont(BaseFont.TIMES_BOLD, BaseFont.WINANSI, BaseFont.EMBEDDED);
        cb.setFontAndSize(nameFont, 24);
        cb.showTextAligned(Element.ALIGN_CENTER, result.getStudentName(), 420, 419, 0);  // Adjusted for better positioning

        // 🔸 Other Text Font Setup (Smaller)
        BaseFont baseFont = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.WINANSI, BaseFont.EMBEDDED);
        cb.setFontAndSize(baseFont, 14);

        // Roll No. & PRN
        cb.showTextAligned(Element.ALIGN_LEFT, result.getRollNumber(), 215, 393, 0);
        cb.showTextAligned(Element.ALIGN_LEFT, result.getPrn(), 535, 393, 0);

        // Module Marks
        cb.showTextAligned(Element.ALIGN_LEFT, result.getModule1Marks() + "", 620, 330, 0);
        cb.showTextAligned(Element.ALIGN_LEFT, result.getModule2Marks() + "", 620, 298, 0);
        cb.showTextAligned(Element.ALIGN_LEFT, result.getModule3Marks() + "", 620, 263, 0);
        cb.showTextAligned(Element.ALIGN_LEFT, result.getModule4Marks() + "", 620, 226, 0);
        cb.showTextAligned(Element.ALIGN_LEFT, result.getModule5Marks() + "", 620, 190, 0);

        // Average and Status
        cb.showTextAligned(Element.ALIGN_LEFT, result.getAverageMarks() + "", 620, 150, 0);
        cb.showTextAligned(Element.ALIGN_LEFT, result.getStatus(), 620, 119, 0);

        // 🔹 Download Date (bottom-left or any suitable position)
        String date = java.time.LocalDate.now().toString(); // YYYY-MM-DD
        cb.setFontAndSize(baseFont, 12);
        cb.showTextAligned(Element.ALIGN_LEFT, "Date: " + date, 675, 450, 0); // 🔁 Adjust coordinates as needed


        // ✅ Step 1: PRN se semester fetch karo
        Student student = studentRepository.findByPrn(result.getPrn());
        int semester = student.getSemester(); // Make sure getSemester() exists

        // ✅ Step 2: Semester ke hisaab se subjects lao
        String[] subjects = getSubjectsForSemester(semester);

        // ✅ Step 3: Sirf subjects print karo
        int y = 337;
        for (int i = 0; i < subjects.length; i++) {
            cb.showTextAligned(Element.ALIGN_LEFT, subjects[i], 280, y - (i * 38), 0);
        }

        cb.endText();
        document.close();
        return out;
    }
    // ✅ Function: Semester ke hisaab se subject list
    private String[] getSubjectsForSemester(int semester) {
        Map<Integer, String[]> subjectMap = new HashMap<>();

        // Updated based on your table
        subjectMap.put(3, new String[]{
                "Engineering Mathematics",
                "Discrete Mathematics",
                "Data Structure",
                "Computer Architecture and Organization",
                "OPP in Java"
        });

        subjectMap.put(4, new String[]{
                "Design & Analysis of Algorithm",
                "Operating System",
                "Basic Human Rights",
                "Probability and Statistics",
                "Digital Logic Design & Microprocessor"
        });

        subjectMap.put(5, new String[]{
                "Database System",
                "Theory of Computation",
                "Software Engineering",
                "Human Computer Interaction",
                "Business Communication"
        });

        subjectMap.put(6, new String[]{
                "Computer Network",
                "Compiler Design",
                "IOT",
                "Machine Learning",
                "Consumer Behaviour"
        });

        subjectMap.put(7, new String[]{
                "Cloud Computing",
                "Artificial Intelligence",
                "Deep Learning",
                "Big Data Analytics",
                "Cryptography"
        });

        // Default fallback
        return subjectMap.getOrDefault(semester, new String[]{
                "Module 1", "Module 2", "Module 3", "Module 4", "Module 5"
        });
    }
}
