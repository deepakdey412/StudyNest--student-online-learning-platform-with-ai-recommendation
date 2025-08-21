package com.studyNest.service;


import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.studyNest.model.StudentResult;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ReportService {

    public ByteArrayInputStream generatePdfReport(List<StudentResult> students, String semester) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Pass Students Report - Semester " + semester, titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{1, 3, 3, 2, 2});

            // Table header
            Stream.of("S.No", "Name", "Roll No", "Semester","Avg Marks")
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                        header.setPhrase(new Phrase(headerTitle));
                        table.addCell(header);
                    });

            int seq = 1;
            for (StudentResult student : students) {
                table.addCell(String.valueOf(seq++));
                table.addCell(student.getStudentName());
                table.addCell(student.getRollNumber());
                table.addCell(String.valueOf(student.getModuleSemester()));
                table.addCell(String.valueOf(student.getAverageMarks()));
            }

            document.add(table);
            document.close();

        } catch (DocumentException ex) {
            ex.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}

