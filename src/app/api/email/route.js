export async function POST(request) {

  try {
    const PLUNK_SECRET_KEY = process.env.PLUNK_SECRET_KEY;
    const PLUNK_API_URL = process.env.PLUNK_API_URL || 'https://next-api.useplunk.com';
    const { nome, email, telefone } = await request.json();

    console.log('Tryig to create contact for:', email);

    if (!PLUNK_SECRET_KEY) {
      console.error('PLUNK_SECRET_KEY not found!');
      console.log('Check if .env.local file exists in the project root');
      console.log('Content must have: PLUNK_SECRET_KEY=your_key_here');

      return Response.json({
        success: false,
        message: 'Configuration error',
        note: 'Plunk key not configured'
      }, { status: 400 });
    }

    console.log('Key loaded (last 4):', '****' + PLUNK_SECRET_KEY.slice(-4));

    const plunkData = {
      email: email,
      subscribed: true,
      data: {
        nome: nome,
        telefone: telefone,
        origem: 'site_nobolso',
        data_cadastro: new Date().toISOString()
      }
    };

    console.log('Sending to Plunk API:', JSON.stringify(plunkData, null, 2));

    const response = await fetch(`${PLUNK_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PLUNK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plunkData)
    });

    console.log('Plunk response:');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);

    const responseText = await response.text();
    console.log('Content:', responseText);

    if (!response.ok) {
      console.error('Plunk rejected the request!');

      let errorDetail = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorDetail = JSON.stringify(errorJson, null, 2);
      } catch (e) {
      }

      return Response.json({
        success: false,
        message: 'Plunk rejected the request!',
        error: {
          status: response.status,
          statusText: response.statusText,
          detail: errorDetail
        },
        suggestion: 'Check: 1) Valid API key 2) Active account 3) Account limits'
      }, { status: 400 });
    }

    let result;
    try {
      result = JSON.parse(responseText);
      console.log('Contact created! ID:', result.id);
    } catch (e) {
      console.log('Response is not valid JSON:', responseText);
      result = { raw: responseText };
    }

    return Response.json({
      success: true,
      message: 'Contact received!',
      data: {
        nome,
        email,
        telefone,
        plunkResponse: result
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    console.error('Stack:', error.stack);

    return Response.json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}