import { serverSupabaseClient } from '#supabase/server'
import { productsData } from '../../data/products'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  try {
    // 1. Opcional: borrar datos existentes para el demo (comentado por defecto)
    // await supabase.from('products').delete().neq('id', 0)

    // 2. Insertar productos del archivo local
    const { data, error } = await supabase
      .from('products')
      .upsert(productsData)
      .select()

    if (error) {
      console.error('Error seeding products:', error)
      return { success: false, error }
    }

    return { 
      success: true, 
      message: `${data.length} productos insertados/actualizados correctamente en Supabase.`,
      data 
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
})
