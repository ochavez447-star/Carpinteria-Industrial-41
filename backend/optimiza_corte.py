import ezdxf
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from fpdf import FPDF
import csv
import os

class OptimizadorMecatronicoFinal:
    def __init__(self, ancho_hoja, largo_hoja, kerf, ruta_base):
        self.ancho_hoja = ancho_hoja
        self.largo_hoja = largo_hoja
        self.kerf = kerf
        self.ruta_base = ruta_base
        self.hojas = []
        
        if not os.path.exists(self.ruta_base):
            os.makedirs(self.ruta_base)

    def cargar_desde_lista(self, lista_piezas):
        """
        Carga piezas desde una lista de diccionarios en lugar de CSV
        Formato: [{'id': 1, 'w': 500, 'h': 300, 'qty': 2, 'desc': 'Lateral'}]
        """
        self.piezas_cargadas = []
        for p in lista_piezas:
            self.piezas_cargadas.append({
                'id': p.get('id', 0),
                'w': float(p['w']),
                'h': float(p['h']),
                'qty': int(p.get('qty', 1)),
                'desc': p.get('desc', '')
            })
        return self.piezas_cargadas

    def ejecutar_nesting(self, piezas=None):
        if piezas is None:
            piezas = self.piezas_cargadas
            
        inventario = []
        for p in piezas:
            for _ in range(p['qty']):
                inventario.append({
                    'id': p['id'],
                    'w': p['w'] + self.kerf,
                    'h': p['h'] + self.kerf,
                    'w_nom': p['w'],
                    'h_nom': p['h'],
                    'desc': p.get('desc', '')
                })

        inventario.sort(key=lambda x: x['h'], reverse=True)
        self.hojas = []
        hoja_actual = []
        x_cursor, y_cursor, altura_fila = 0, 0, 0

        for p in inventario:
            if x_cursor + p['w'] > self.ancho_hoja:
                x_cursor = 0
                y_cursor += altura_fila
                altura_fila = 0
            if y_cursor + p['h'] > self.largo_hoja:
                self.hojas.append(hoja_actual)
                hoja_actual = []
                x_cursor, y_cursor, altura_fila = 0, 0, 0
            p['x'], p['y'] = x_cursor, y_cursor
            hoja_actual.append(p)
            x_cursor += p['w']
            altura_fila = max(altura_fila, p['h'])
        if hoja_actual: self.hojas.append(hoja_actual)
        
        return len(self.hojas)
    
    def get_sheet_count(self):
        return len(self.hojas)

    def exportar_todo(self, prefix="proyecto"):
        files_generated = []
        pdf = FPDF()
        
        for i, hoja in enumerate(self.hojas):
            n = i + 1
            dxf_name = f"{prefix}_hoja_{n}.dxf"
            img_name = f"{prefix}_vista_{n}.png"
            dxf_p = os.path.join(self.ruta_base, dxf_name)
            img_p = os.path.join(self.ruta_base, img_name)
            
            files_generated.append(dxf_p)
            files_generated.append(img_p)
            
            # --- DXF ---
            doc = ezdxf.new('R2010')
            msp = doc.modelspace()
            # Borde material
            msp.add_lwpolyline([(0,0),(self.ancho_hoja,0),(self.ancho_hoja,self.largo_hoja),(0,self.largo_hoja),(0,0)])
            for p in hoja:
                pts = [(p['x'],p['y']),(p['x']+p['w_nom'],p['y']),(p['x']+p['w_nom'],p['y']+p['h_nom']),(p['x'],p['y']+p['h_nom']),(p['x'],p['y'])]
                msp.add_lwpolyline(pts)
            doc.saveas(dxf_p)

            # --- IMAGEN (Validación) ---
            plt.figure(figsize=(6, 8))
            ax = plt.gca()
            ax.set_xlim(0, self.ancho_hoja)
            ax.set_ylim(0, self.largo_hoja)
            for p in hoja:
                rect = patches.Rectangle((p['x'], p['y']), p['w_nom'], p['h_nom'], facecolor='skyblue', edgecolor='darkblue', alpha=0.6)
                ax.add_patch(rect)
                plt.text(p['x']+p['w_nom']/2, p['y']+p['h_nom']/2, str(p['id']), ha='center', va='center', fontsize=8)
            plt.title(f"Plan de Corte - Hoja {n}")
            plt.xlabel("Ancho (mm)")
            plt.ylabel("Largo (mm)")
            plt.savefig(img_p)
            plt.close()

            # --- PDF ---
            pdf.add_page()
            pdf.set_font("Arial", 'B', 14)
            pdf.cell(200, 10, f"Reporte de Corte - Hoja {n}", ln=True, align='C')
            pdf.ln(10)
            pdf.image(img_p, x=25, y=40, w=160)

        pdf_path = os.path.join(self.ruta_base, f"{prefix}_reporte.pdf")
        pdf.output(pdf_path)
        files_generated.append(pdf_path)
        
        return files_generated

# Remove auto-execution logic
if __name__ == "__main__":
    # Test execution
    RUTA = r'./output_test'
    if not os.path.exists(RUTA): os.makedirs(RUTA)
    proceso = OptimizadorMecatronicoFinal(1210, 2430, 12.7, RUTA)
    # Mock data
    pieces = [{'id':1, 'w':500, 'h':300, 'qty':5, 'desc':'Test'}]
    proceso.cargar_desde_lista(pieces)
    proceso.ejecutar_nesting()
    print(f"Sheets needed: {proceso.get_sheet_count()}")