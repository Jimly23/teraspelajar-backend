import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateCertificatePDF = async (
    userName: string,
    courseTitle: string,
    score: number,
    credentialId: string,
    certificateNumber: string,
    issuedAt: Date,
    qrCodeBuffer?: Buffer
): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // Ensure public/certificates directory exists
            const publicDir = path.join(__dirname, "../../public");
            const certificatesDir = path.join(publicDir, "certificates");
            if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir);
            }
            if (!fs.existsSync(certificatesDir)) {
                fs.mkdirSync(certificatesDir);
            }

            const fileName = `${certificateNumber}.pdf`;
            const filePath = path.join(certificatesDir, fileName);
            const relativePath = `/certificates/${fileName}`;

            const doc = new PDFDocument({
                size: 'A4',
                layout: 'landscape',
                margin: 50
            });

            const writeStream = fs.createWriteStream(filePath);
            doc.pipe(writeStream);

            // Border
            doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();
            doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).stroke();

            // Content
            doc.moveDown(3);
            doc.font('Helvetica-Bold')
               .fontSize(40)
               .fillColor('#0f172a')
               .text('CERTIFICATE OF COMPLETION', { align: 'center' });
            
            doc.moveDown(2);
            doc.font('Helvetica')
               .fontSize(16)
               .fillColor('#64748b')
               .text('This is to certify that', { align: 'center' });
               
            doc.moveDown(1);
            doc.font('Helvetica-Bold')
               .fontSize(32)
               .fillColor('#3b82f6')
               .text(userName, { align: 'center' });

            doc.moveDown(1);
            doc.font('Helvetica')
               .fontSize(16)
               .fillColor('#64748b')
               .text('has successfully completed', { align: 'center' });

            doc.moveDown(1);
            doc.font('Helvetica-Bold')
               .fontSize(24)
               .fillColor('#0f172a')
               .text(courseTitle, { align: 'center' });

            doc.moveDown(2);
            
            // Stats Row
            const statsY = doc.y;
            doc.font('Helvetica-Bold').fontSize(14).fillColor('#0f172a')
               .text(`Final Score: ${score}/100`, 50, statsY, { align: 'left' });
            
            doc.font('Helvetica-Bold').fontSize(14).fillColor('#0f172a')
               .text(`Completed: ${issuedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, 0, statsY, { align: 'right' });

            doc.moveDown(2);
            const footerY = doc.y;

            // Footer info
            doc.font('Helvetica').fontSize(12).fillColor('#64748b')
               .text(`Credential ID: ${credentialId}`, 50, footerY, { align: 'left' });
            
            doc.font('Helvetica').fontSize(12).fillColor('#64748b')
               .text(`Certificate Number: ${certificateNumber}`, 0, footerY, { align: 'right' });

            // QR Code (if provided)
            if (qrCodeBuffer) {
                const qrSize = 60;
                const qrX = (doc.page.width - qrSize) / 2;
                const qrY = doc.page.height - 130;
                doc.image(qrCodeBuffer, qrX, qrY, { width: qrSize, height: qrSize });

                // QR label
                doc.font('Helvetica').fontSize(7).fillColor('#94a3b8')
                   .text('Scan to verify', qrX - 10, qrY + qrSize + 2, { width: qrSize + 20, align: 'center' });
            }

            // Brand
            doc.font('Helvetica-Bold').fontSize(20).fillColor('#3b82f6')
               .text('SafeLearn', 0, doc.page.height - 60, { align: 'center' });

            doc.end();

            writeStream.on('finish', () => {
                resolve(relativePath);
            });

            writeStream.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

