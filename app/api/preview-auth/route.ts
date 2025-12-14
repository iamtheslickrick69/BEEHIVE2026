import { NextRequest, NextResponse } from 'next/server'

const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD || 'beehive'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === PREVIEW_PASSWORD) {
      const response = NextResponse.json({ success: true })

      // Set auth cookie (valid for 7 days)
      response.cookies.set('preview-auth', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response
    }

    return NextResponse.json({ success: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
