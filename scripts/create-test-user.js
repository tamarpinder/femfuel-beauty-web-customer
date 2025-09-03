// Script to create María González test customer in Supabase
// Run this script to set up the test customer with full access

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key needed for user creation

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing')
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Present' : 'Missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const testUser = {
  email: 'maria.gonzalez@gmail.com',
  password: 'TestCustomer2025!',
  profile: {
    first_name: 'María',
    last_name: 'González',
    phone: '+1 809 555 0123',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=150&h=150&fit=crop&crop=face',
    email_confirmed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}

async function createTestUser() {
  try {
    console.log('🚀 Creating María González test customer...')

    // 1. Create the auth user
    console.log('1. Creating auth user...')
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testUser.email,
      password: testUser.password,
      email_confirm: true,
      user_metadata: {
        name: `${testUser.profile.first_name} ${testUser.profile.last_name}`,
        avatar_url: testUser.profile.avatar_url
      }
    })

    if (authError) {
      console.error('❌ Error creating auth user:', authError.message)
      return
    }

    console.log('✅ Auth user created:', authData.user.id)
    const userId = authData.user.id

    // 2. Create/Update the profile
    console.log('2. Creating user profile...')
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...testUser.profile,
        email: testUser.email
      }, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
      .select()

    if (profileError) {
      console.error('❌ Error creating profile:', profileError.message)
    } else {
      console.log('✅ Profile created successfully')
    }

    // 3. Create sample bookings
    console.log('3. Creating sample bookings...')
    const sampleBookings = [
      {
        customer_id: userId,
        service_name: 'Manicure Gel Premium',
        vendor_name: 'Beauty Studio RD',
        scheduled_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        total_amount: 1200,
        status: 'confirmed',
        notes: 'Primera cita con este salón'
      },
      {
        customer_id: userId,
        service_name: 'Tratamiento Facial',
        vendor_name: 'Spa Paradise',
        scheduled_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
        total_amount: 3500,
        status: 'pending',
        notes: 'Tratamiento recomendado por amiga'
      },
      {
        customer_id: userId,
        service_name: 'Pedicure Completo',
        vendor_name: 'Relax Nails',
        scheduled_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        total_amount: 1800,
        status: 'completed',
        notes: 'Excelente servicio, muy recomendado'
      }
    ]

    for (let i = 0; i < sampleBookings.length; i++) {
      const booking = sampleBookings[i]
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert(booking)

      if (bookingError) {
        console.log(`⚠️  Booking ${i + 1} may already exist or bookings table structure differs`)
      } else {
        console.log(`✅ Sample booking ${i + 1} created`)
      }
    }

    // 4. Create sample favorites (if favorites table exists)
    console.log('4. Creating sample favorites...')
    const sampleFavorites = [
      { user_id: userId, vendor_name: 'Beauty Studio RD', service_type: 'Manicure' },
      { user_id: userId, vendor_name: 'Spa Paradise', service_type: 'Facial' },
      { user_id: userId, vendor_name: 'Glamour House', service_type: 'Maquillaje' }
    ]

    for (let favorite of sampleFavorites) {
      const { error: favoriteError } = await supabase
        .from('favorites')
        .insert(favorite)

      if (favoriteError) {
        console.log('⚠️  Favorites table may not exist or structure differs')
        break
      }
    }

    console.log('🎉 María González test customer created successfully!')
    console.log('')
    console.log('📋 Test Credentials:')
    console.log(`📧 Email: ${testUser.email}`)
    console.log(`🔒 Password: ${testUser.password}`)
    console.log('')
    console.log('✨ The user has:')
    console.log('  - Verified email address')
    console.log('  - Complete profile with avatar')
    console.log('  - Sample booking history')
    console.log('  - Sample favorites')
    console.log('  - Full access to customer features')

  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

// Run the script
createTestUser()