const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const reportsDir = path.join(root, 'cypress', 'reports')
const junitDir = path.join(reportsDir, 'junit')
const outputDir = path.join(root, 'site')

fs.mkdirSync(outputDir, { recursive: true })

const files = fs.existsSync(junitDir)
  ? fs.readdirSync(junitDir).filter((file) => file.endsWith('.xml'))
  : []

const rows = files.length
  ? files
      .map((file) => {
        const xml = fs.readFileSync(path.join(junitDir, file), 'utf8')
        const testsMatch = xml.match(/tests="(\d+)"/)
        const failuresMatch = xml.match(/failures="(\d+)"/)
        const passing = testsMatch ? Number(testsMatch[1]) - (failuresMatch ? Number(failuresMatch[1]) : 0) : 0
        const failed = failuresMatch ? Number(failuresMatch[1]) : 0
        return `
          <tr>
            <td>${file}</td>
            <td>${testsMatch ? testsMatch[1] : 0}</td>
            <td>${passing}</td>
            <td>${failed}</td>
          </tr>`
      })
      .join('')
  : `
      <tr>
        <td colspan="4">Nenhum relatório gerado ainda.</td>
      </tr>`

const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Relatório Cypress - Módulo 22</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; background: #f4f7fb; color: #1f2937; }
      .container { max-width: 900px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
      h1 { margin-top: 0; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #dbe3ee; padding: 12px 16px; text-align: left; }
      th { background: #e5ecf8; }
      .success { color: #0f766e; font-weight: bold; }
      .danger { color: #b91c1c; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Relatório de testes Cypress</h1>
      <p>Projeto: EBAC Exercício Módulo 22</p>
      <table>
        <thead>
          <tr>
            <th>Arquivo</th>
            <th>Total</th>
            <th>Passaram</th>
            <th>Falharam</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </body>
</html>`

fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8')
console.log(`Relatório gerado em ${outputDir}/index.html`)
