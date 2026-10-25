import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromBuffer, parseResumeText } from '#/lib/parser/resume-parser';

export const runtime = 'nodejs';

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'No valid file provided. Please upload a PDF, DOCX, or TXT file.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit. Please upload a smaller resume file.' },
        { status: 400 }
      );
    }

    const filename = file instanceof File ? file.name : 'resume.txt';
    const mimeType = file.type;

    // Convert file Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from buffer (handles PDF, DOCX, TXT)
    const rawText = await extractTextFromBuffer(buffer, filename, mimeType);

    if (!rawText || !rawText.trim()) {
      return NextResponse.json(
        { error: 'Could not extract readable text from the document. Please check the file formatting.' },
        { status: 422 }
      );
    }

    // Parse evidence-backed entities
    const parseResult = parseResumeText(rawText);

    return NextResponse.json({
      success: true,
      filename,
      entities: parseResult.entities,
      skills: parseResult.skills,
      extractedLength: parseResult.rawTextLength,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to process resume file';
    return NextResponse.json(
      { error: `Resume processing error: ${message}` },
      { status: 500 }
    );
  }
}
