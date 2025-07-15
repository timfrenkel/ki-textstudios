import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('🔍 Debug API started')
  
  try {
    // Schritt 1: Request parsing
    console.log('📥 Parsing request...')
    const body = await request.json()
    console.log('✅ Request parsed:', Object.keys(body))

    // Schritt 2: Environment Variables
    console.log('🔑 Checking environment variables...')
    const envCheck = {
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      OPENAI_KEY_START: process.env.OPENAI_API_KEY?.substring(0, 8) + '...',
      RESEND_KEY_START: process.env.RESEND_API_KEY?.substring(0, 8) + '...'
    }
    console.log('✅ Environment check:', envCheck)

    // Schritt 3: OpenAI import test
    console.log('🤖 Testing OpenAI import...')
    try {
      const { default: OpenAI } = await import('openai')
      console.log('✅ OpenAI imported successfully')
      
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      })
      console.log('✅ OpenAI client created')
    } catch (openaiError) {
      console.error('❌ OpenAI error:', openaiError)
      return NextResponse.json({ 
        error: 'OpenAI import/init failed', 
        details: openaiError instanceof Error ? openaiError.message : 'Unknown OpenAI error',
        envCheck 
      })
    }

    // Schritt 4: Resend import test
    console.log('📧 Testing Resend import...')
    try {
      const { Resend } = await import('resend')
      console.log('✅ Resend imported successfully')
      
      const resend = new Resend(process.env.RESEND_API_KEY!)
      console.log('✅ Resend client created')
    } catch (resendError) {
      console.error('❌ Resend error:', resendError)
      return NextResponse.json({ 
        error: 'Resend import/init failed', 
        details: resendError instanceof Error ? resendError.message : 'Unknown Resend error',
        envCheck 
      })
    }

    // Schritt 5: Erfolg
    console.log('🎉 All checks passed!')
    return NextResponse.json({
      success: true,
      message: 'Debug test successful - all systems working!',
      envCheck,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('💥 Debug API error:', error)
    return NextResponse.json({
      error: 'Debug test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    }, { status: 500 })
  }
} 