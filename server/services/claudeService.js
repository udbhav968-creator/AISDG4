/**
 * Anthropic Claude 3.5 Sonnet Legal FIR & IPC Section Analysis Engine
 */

export async function generateLegalFirWithClaude(incidentDetails) {
  const CLAUDE_API_KEY = process.process?.env?.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (!CLAUDE_API_KEY) {
    // Graceful fallback simulation when API key is not set
    return {
      success: true,
      provider: 'Anthropic Claude 3.5 Sonnet (Simulated)',
      firDocumentNumber: `FIR-IPC-2026-${Date.now().toString().slice(-4)}`,
      applicableIpcSections: [
        'IPC Section 354D (Stalking & Route Pursuit)',
        'IPC Section 509 (Word/Gesture Intended to Insult Modesty of Women)',
        'IPC Section 341 (Wrongful Restraint in Transit)'
      ],
      legalDraft: `BEFORE THE OFFICER-IN-CHARGE, POLICE STATION CENTRAL DELHI\n\nSUBJECT: FIRST INFORMATION REPORT UNDER IPC 354D/509/341\n\nInformant: ${incidentDetails.user || 'Ananya Verma'}\nVehicle Reg: ${incidentDetails.vehicle || 'DL-3C-AZ-4921'}\nTime of Incident: ${incidentDetails.time || new Date().toISOString()}\nLocation: ${incidentDetails.addressName || 'Unlit Alley Segment #03'}\n\nSTATEMENT OF FACTS:\nThe victim was travelling via public transport when the vehicle strayed >300m off-route. Audio telemetry confirms distress. Immediate law enforcement intervention is requested.`
    };
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Generate an official law enforcement First Information Report (FIR) for an Indian Police Station based on this incident data:\n\n${JSON.stringify(incidentDetails, null, 2)}\n\nInclude relevant IPC sections.`
          }
        ]
      })
    });

    const data = await response.json();
    return {
      success: true,
      provider: 'Anthropic Claude 3.5 Sonnet',
      firDraft: data.content?.[0]?.text
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
