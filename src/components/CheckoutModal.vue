<template>
  <Transition name="fade">
    <div class="checkout-overlay" @click.self="$emit('close')">
      <div class="checkout-modal">
        <h2>Finalizar Compra</h2>
        
        <form v-if="step === 1" @submit.prevent="generatePDF" class="checkout-form">
          <h3>Datos del Cliente</h3>
          
          <div class="form-group">
            <label>Nombre completo *</label>
            <input 
              v-model="form.name" 
              type="text" 
              required
              placeholder="Nombre"
            />
          </div>

          <div class="form-group">
            <label>Email *</label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              placeholder="ejemplo@gmail.com"
            />
          </div>

          <div class="form-group">
            <label>Teléfono *</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              required
              placeholder="1234 5678"
            />
          </div>

          <div class="form-group">
            <label>Dirección de entrega *</label>
            <textarea 
              v-model="form.address" 
              required
              rows="3"
              placeholder="Calle, número, zona, ciudad"
            ></textarea>
          </div>

          <div class="form-group">
            <label>NIT (opcional)</label>
            <input 
              v-model="form.nit" 
              type="text"
              placeholder="1234567-8"
            />
          </div>

          <div class="order-summary">
            <h4>Resumen del Pedido</h4>
            <div v-for="item in cart" :key="item.id" class="summary-item">
              <span>{{ item.name }} x{{ item.qty }}</span>
              <span>Q{{ item.price * item.qty }}</span>
            </div>
            <div class="summary-total">
              <strong>Total:</strong>
              <strong>Q{{ total }}</strong>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="$emit('close')">
              Cancelar
            </button>
            <button type="submit" class="btn-primary" :disabled="generating">
              <span v-if="generating">Generando...</span>
              <span v-else>Descargar Factura PDF</span>
            </button>
          </div>
        </form>

        <div v-else class="success-step">
          <div class="success-icon"></div>
          <h3>¡Factura Generada!</h3>
          <p>Gracias por tu compra.</p>
          <button class="btn-primary" @click="$emit('complete')">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { jsPDF } from 'jspdf'

const props = defineProps<{
  cart: any[]
}>()

const emit = defineEmits(['close', 'complete'])

const step = ref(1)
const generating = ref(false)
const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  nit: ''
})

const total = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
)

const generatePDF = async () => {
  generating.value = true
  
  try {
    const doc = new jsPDF()
    const invoiceNumber = 'F-' + Date.now().toString().slice(-8)
    const date = new Date().toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Colores RGB individuales (sin spread operator)
    const darkBlueR = 13, darkBlueG = 24, darkBlueB = 33
    const mediumBlueR = 52, mediumBlueG = 73, mediumBlueB = 102
    const lightBlueR = 180, lightBlueG = 205, lightBlueB = 237
    const creamR = 240, creamG = 244, creamB = 239
    const sageR = 191, sageG = 204, sageB = 148

    // Header con fondo
    doc.setFillColor(darkBlueR, darkBlueG, darkBlueB)
    doc.rect(0, 0, 210, 40, 'F')
    
    // Logo/Título
    doc.setTextColor(creamR, creamG, creamB)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('ELECTRONICOS', 105, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('FACTURA ELECTRONICA', 105, 28, { align: 'center' })

    // Info de factura (caja derecha)
    doc.setFillColor(creamR, creamG, creamB)
    doc.rect(130, 45, 70, 30, 'F')
    doc.setDrawColor(mediumBlueR, mediumBlueG, mediumBlueB)
    doc.rect(130, 45, 70, 30, 'S')
    
    doc.setTextColor(darkBlueR, darkBlueG, darkBlueB)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('No. Factura:', 135, 55)
    doc.text('Fecha:', 135, 62)
    doc.text('NIT:', 135, 69)
    
    doc.setFont('helvetica', 'normal')
    doc.text(invoiceNumber, 175, 55)
    doc.text(date, 175, 62)
    doc.text(form.value.nit || 'CF', 175, 69)

    // Datos del cliente
    doc.setFillColor(sageR, sageG, sageB)
    doc.rect(10, 80, 190, 8, 'F')
    doc.setTextColor(darkBlueR, darkBlueG, darkBlueB)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('DATOS DEL CLIENTE', 15, 86)

    doc.setFillColor(creamR, creamG, creamB)
    doc.rect(10, 88, 190, 35, 'F')
    doc.setDrawColor(lightBlueR, lightBlueG, lightBlueB)
    doc.rect(10, 88, 190, 35, 'S')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('Nombre:', 15, 98)
    doc.text('Email:', 15, 105)
    doc.text('Telefono:', 15, 112)
    doc.text('Direccion:', 15, 119)

    doc.setFont('helvetica', 'normal')
    doc.text(form.value.name, 50, 98)
    doc.text(form.value.email, 50, 105)
    doc.text(form.value.phone, 50, 112)
    doc.text(form.value.address, 50, 119)

    // Tabla de productos
    let yPos = 135
    
    // Header de tabla
    doc.setFillColor(mediumBlueR, mediumBlueG, mediumBlueB)
    doc.rect(10, yPos, 190, 10, 'F')
    doc.setTextColor(creamR, creamG, creamB)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('PRODUCTO', 15, yPos + 7)
    doc.text('CANT.', 100, yPos + 7)
    doc.text('P. UNIT.', 130, yPos + 7)
    doc.text('SUBTOTAL', 165, yPos + 7)

    yPos += 10

    // Filas de productos
    props.cart.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250)
        doc.rect(10, yPos, 190, 12, 'F')
      }

      doc.setTextColor(darkBlueR, darkBlueG, darkBlueB)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      
      let productName = item.name
      if (productName.length > 35) {
        productName = productName.substring(0, 32) + '...'
      }
      doc.text(productName, 15, yPos + 8)
      
      doc.text(item.qty.toString(), 105, yPos + 8, { align: 'center' })
      doc.text('Q' + item.price.toFixed(2), 145, yPos + 8, { align: 'right' })
      doc.text('Q' + (item.price * item.qty).toFixed(2), 195, yPos + 8, { align: 'right' })

      yPos += 12
    })

    // Lineas de la tabla
    doc.setDrawColor(lightBlueR, lightBlueG, lightBlueB)
    doc.line(10, 135, 10, yPos)
    doc.line(200, 135, 200, yPos)
    doc.line(95, 135, 95, yPos)
    doc.line(115, 135, 115, yPos)
    doc.line(155, 135, 155, yPos)
    doc.line(10, yPos, 200, yPos)

    // Totales
    yPos += 10
    
    doc.setFillColor(sageR, sageG, sageB)
    doc.rect(130, yPos, 70, 25, 'F')
    doc.setDrawColor(mediumBlueR, mediumBlueG, mediumBlueB)
    doc.rect(130, yPos, 70, 25, 'S')

    doc.setTextColor(darkBlueR, darkBlueG, darkBlueB)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Subtotal:', 135, yPos + 10)
    doc.text('IVA (12%):', 135, yPos + 17)
    
    const subtotal = total.value / 1.12
    const iva = total.value - subtotal
    
    doc.text('Q' + subtotal.toFixed(2), 195, yPos + 10, { align: 'right' })
    doc.text('Q' + iva.toFixed(2), 195, yPos + 17, { align: 'right' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('TOTAL:', 135, yPos + 23)
    doc.text('Q' + total.value.toFixed(2), 195, yPos + 23, { align: 'right' })

    // Footer
    yPos += 40
    
    doc.setDrawColor(sageR, sageG, sageB)
    doc.setLineWidth(1)
    doc.line(10, yPos, 200, yPos)
    
    doc.setTextColor(mediumBlueR, mediumBlueG, mediumBlueB)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('Gracias por su compra', 105, yPos + 10, { align: 'center' })
    doc.text('factura electronica', 105, yPos + 15, { align: 'center' })
    doc.text('ELECTRONICOS', 105, yPos + 20, { align: 'center' })

    // Guardar PDF
    doc.save(`Factura-${invoiceNumber}.pdf`)
    
    step.value = 2
  } catch (error) {
    console.error('Error generando PDF:', error)
    alert('Hubo un error al generar el PDF. Intenta de nuevo.')
  } finally {
    generating.value = false
  }
}
</script>

<style scoped>
.checkout-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 24, 33, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.checkout-modal {
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.checkout-modal h2 {
  font-size: 1.75rem;
  color: #0D1821;
  margin-bottom: 30px;
  text-align: center;
}

.checkout-form h3 {
  font-size: 1.2rem;
  color: #344966;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #BFCC94;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #0D1821;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #B4CDED;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #F0F4EF;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #344966;
  background: #ffffff;
}

.order-summary {
  background: #F0F4EF;
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
}

.order-summary h4 {
  color: #0D1821;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: #344966;
  border-bottom: 1px dashed #B4CDED;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #344966;
  font-size: 1.3rem;
  color: #0D1821;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-secondary {
  background: #F0F4EF;
  color: #344966;
  border: 2px solid #B4CDED;
}

.btn-secondary:hover {
  background: #B4CDED;
}

.btn-primary {
  background: linear-gradient(135deg, #BFCC94 0%, #344966 100%);
  color: #0D1821;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(191, 204, 148, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-step {
  text-align: center;
  padding: 40px 20px;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.success-step h3 {
  font-size: 1.5rem;
  color: #0D1821;
  margin-bottom: 10px;
}

.success-step p {
  color: #344966;
  margin-bottom: 30px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>