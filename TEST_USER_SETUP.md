# Test Customer Setup Guide

This guide explains how to create the **María González** test customer for the Customer Application.

## Test Customer Details

- **Name**: María González  
- **Email**: `maria.gonzalez@gmail.com`
- **Password**: `TestCustomer2025!`
- **Phone**: +1 809 555 0123

## Automatic Setup (Recommended)

### Prerequisites
1. Add the Supabase Service Role Key to your environment:
   ```bash
   # Add to .env.local
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

2. Run the setup script:
   ```bash
   cd Customer
   node scripts/create-test-user.js
   ```

The script will create:
- ✅ Authenticated user in Supabase Auth
- ✅ Complete user profile
- ✅ Sample booking history
- ✅ Sample favorites
- ✅ Email verification

## Manual Setup (Supabase Dashboard)

If you prefer to set up manually via the Supabase dashboard:

### 1. Create Auth User
In Supabase Dashboard → Authentication → Users:
- Click "Add User"
- Email: `maria.gonzalez@gmail.com`
- Password: `TestCustomer2025!`
- ✅ Mark as email confirmed
- Add user metadata:
  ```json
  {
    "name": "María González",
    "avatar_url": "https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=150&h=150&fit=crop&crop=face"
  }
  ```

### 2. Create Profile Record
In `profiles` table:
```sql
INSERT INTO profiles (
  id, 
  first_name, 
  last_name, 
  email, 
  phone,
  avatar_url,
  created_at,
  updated_at
) VALUES (
  'USER_ID_FROM_AUTH',
  'María',
  'González', 
  'maria.gonzalez@gmail.com',
  '+1 809 555 0123',
  'https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=150&h=150&fit=crop&crop=face',
  NOW(),
  NOW()
);
```

### 3. Add Sample Bookings
```sql
-- Upcoming confirmed booking
INSERT INTO bookings (customer_id, service_name, vendor_name, scheduled_date, total_amount, status, notes)
VALUES ('USER_ID', 'Manicure Gel Premium', 'Beauty Studio RD', NOW() + INTERVAL '7 days', 1200, 'confirmed', 'Primera cita con este salón');

-- Upcoming pending booking  
INSERT INTO bookings (customer_id, service_name, vendor_name, scheduled_date, total_amount, status, notes)
VALUES ('USER_ID', 'Tratamiento Facial', 'Spa Paradise', NOW() + INTERVAL '14 days', 3500, 'pending', 'Tratamiento recomendado por amiga');

-- Past completed booking
INSERT INTO bookings (customer_id, service_name, vendor_name, scheduled_date, total_amount, status, notes)
VALUES ('USER_ID', 'Pedicure Completo', 'Relax Nails', NOW() - INTERVAL '7 days', 1800, 'completed', 'Excelente servicio, muy recomendado');
```

## Testing the Login

1. Open the Customer Application
2. Click "Iniciar Sesión" or "Entrar"
3. You'll see the test credentials notice
4. Click "Usar Credenciales de Prueba" to auto-fill
5. Click "Iniciar Sesión" to authenticate

## Features to Test

With María González account, you can test:
- ✅ Login/logout flow
- ✅ Profile viewing/editing  
- ✅ Booking history
- ✅ Upcoming appointments
- ✅ Favorites management
- ✅ Service browsing
- ✅ New booking creation
- ✅ Chat functionality (if implemented)

## Troubleshooting

**Login fails?**
- Verify email is confirmed in Supabase Auth
- Check password matches exactly
- Ensure profile exists in profiles table

**Missing data?**
- Run the setup script to populate sample data
- Check table permissions in Supabase

**Need to reset?**
- Delete user from Auth and profiles table
- Re-run setup script

## Security Note

This is a **test account only**. The credentials are publicly visible for demo purposes. Never use these credentials or pattern for production users.