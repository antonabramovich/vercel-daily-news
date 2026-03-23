import {join} from 'node:path';
import {readFile} from 'node:fs/promises';
import {ImageResponse} from 'next/og'

export const alt = 'Vercel Daily News';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const outfitLight = await readFile(join(process.cwd(), 'public/fonts/Outfit-Light.ttf'));
  const outfitMedium = await readFile(join(process.cwd(), 'public/fonts/Outfit-Medium.ttf'));
  const vercelSvg = await readFile(join(process.cwd(), 'public/vercel.svg'));
  const vercelSvgBase64 = `data:image/svg+xml;base64,${vercelSvg.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'Outfit',
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 60,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={vercelSvgBase64} alt="Vercel Daily News logo" width={80} height={69} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flex: 1,
            gap: 16
          }}
        >
          <span style={{ fontSize: 128, color: '#000000' }}>
            Vercel Daily News
          </span>
          <span style={{ fontWeight: 300, fontSize: 48, color: '#4a5565' }}>
            News and insights for modern web developers
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Outfit',
          data: outfitMedium,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Outfit',
          data: outfitLight,
          style: 'normal',
          weight: 300,
        },
      ],
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  )
}
