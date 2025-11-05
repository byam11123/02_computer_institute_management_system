import { supabase } from '../../lib/supabaseClient';
import type { Batch } from '../../types/batch';

// Batch Service
const batchService = {
  // Fetch all batches
  async getAllBatches() {
    const { data, error } = await supabase
      .from('batches')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Batch[];
  },

  // Fetch batch by ID
  async getBatchById(id: string) {
    const { data, error } = await supabase
      .from('batches')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Batch;
  },

  // Create new batch
  async createBatch(batchData: Omit<Batch, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('batches')
      .insert([{
        ...batchData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Batch;
  },

  // Update batch
  async updateBatch(id: string, batchData: Partial<Batch>) {
    const { data, error } = await supabase
      .from('batches')
      .update({
        ...batchData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Batch;
  },

  // Delete batch
  async deleteBatch(id: string) {
    const { error } = await supabase
      .from('batches')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Search batches
  async searchBatches(query: string) {
    const { data, error } = await supabase
      .from('batches')
      .select('*')
      .or(`name.ilike.%${query}%,course_id.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Batch[];
  }
};

export default batchService;