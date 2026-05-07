const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedTestData() {
    console.log('--- Seeding SuperAdmin Test Data ---');
    
    const testUsers = [
        {
            email: 'admin@techvault.io',
            full_name: 'Active SuperAdmin',
            password_hash: 'scrypt:placeholder:active',
            role: 'superadmin',
            is_active: true,
            failed_login_attempts: 0
        },
        {
            email: 'inactive@techvault.io',
            full_name: 'Inactive Admin',
            password_hash: 'scrypt:placeholder:inactive',
            role: 'admin',
            is_active: false,
            failed_login_attempts: 0
        },
        {
            email: 'locked@techvault.io',
            full_name: 'Locked Admin',
            password_hash: 'scrypt:placeholder:locked',
            role: 'admin',
            is_active: true,
            failed_login_attempts: 5,
            locked_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Locked for 24h
        }
    ];

    for (const user of testUsers) {
        console.log(`Inserting: ${user.email}...`);
        const { error } = await supabase
            .schema('TechVault')
            .from('superadmins')
            .upsert([user], { onConflict: 'email' });

        if (error) {
            console.error(`FAILED (${user.email}):`, error.message);
        } else {
            console.log(`SUCCESS (${user.email})`);
        }
    }

    console.log('------------------------------------');
    console.log('Seeding complete.');
}

seedTestData()
