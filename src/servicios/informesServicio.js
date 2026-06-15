import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeServicio {
  reportePorEspecialidades = async (datos) => {
    const plantillaPath = path.join(
      __dirname,
      "../utiles/handlebars/turnosPorEspecialidad.hbs",
    );
    const plantillaHtml = fs.readFileSync(plantillaPath, "utf-8");

    const template = Handlebars.compile(plantillaHtml);

    const html = template({
      especialidades: datos,
      fecha: new Date().toLocaleDateString("es-AR"),
    });

    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });

    const pagina = await browser.newPage();

    await pagina.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdf = await pagina.pdf({
      format: "A4",
    });

    await browser.close();

    return pdf;
  };

  reportePacientesPorObraSocial = async (datos) => {
    const plantillaPath = path.join(
      __dirname,
      "../utiles/handlebars/pacientesPorObraSocial.hbs",
    );

    const plantillaHtml = fs.readFileSync(plantillaPath, "utf-8");

    const template = Handlebars.compile(plantillaHtml);

    const html = template({
      obrasSociales: datos,
      fecha: new Date().toLocaleDateString("es-AR"),
    });

    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });

    const pagina = await browser.newPage();

    await pagina.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdf = await pagina.pdf({
      format: "A4",
    });

    await browser.close();

    return pdf;
  };
}
