import { supabase } from './services/supabase.service';

/**
 * Quick script to verify the actual column names in the Customers table.
 */
async function verifySchema() {
    console.log('Fetching first customer from TechVault.Customers...');
    const { data, error } = await supabase
        .schema('TechVault')
        .from('Customers')
        .select('*')
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching customer:', error.message);
        return;
    }

    console.log('Keys found in the customer object:');
    console.log(Object.keys(data));
    console.log('Sample data:', data);
}

verifySchema();
