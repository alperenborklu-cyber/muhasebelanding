import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source = "performans_gostergeleri_popup" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Geçerli bir e-posta adresi giriniz." },
        { status: 400 }
      );
    }

    const leadRecord = {
      email,
      source,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // Store lead record in data directory if possible
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "leads.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        const fileData = fs.readFileSync(leadsFile, "utf8");
        leads = JSON.parse(fileData);
      }
      leads.push(leadRecord);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf8");
    } catch (e) {
      console.warn("Could not write lead to data/leads.json, logging instead:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Talebiniz başarıyla alındı. Raporunuz e-posta adresinize gönderilmektedir.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Bir hata meydana geldi." },
      { status: 500 }
    );
  }
}
