
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { encryptPassword } from '@/lib/crypto';

export async function POST(request) {
    try {
        const { username, email, password, phone } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Encrypt password
        const encryptedPassword = encryptPassword(password);

        // Insert user into database
        const query = `
      INSERT INTO users (username, email, password, phone)
      VALUES (?, ?, ?, ?)
    `;

        // Check if user already exists
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 409 }
            );
        }

        await pool.query(query, [username, email, encryptedPassword, phone]);

        return NextResponse.json(
            { message: 'User registered successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
