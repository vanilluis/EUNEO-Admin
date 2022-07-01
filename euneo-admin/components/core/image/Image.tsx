// React&NextJS
import React from 'react'
// 3rd party libraries
import { motion } from 'framer-motion'
import { storage } from '../../../firebase/initFirebase'

type Props = {
    src: string
    centerFace?: boolean
    layout?: boolean
    id?: string
    className?: string
    [key: string]: unknown
    height?: number
    width?: number
    srcSet?: string
}

const FallbackUrls = [
    'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Fa_bachinskaya-Hi7DALEsZMI-unsplash.jpeg?alt=media&token=134a9cc2-3df6-469d-b3bc-61d688c510da',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Fannie-spratt-hX_hf2lPpUU-unsplash%201.jpg?alt=media&token=15ac4c2b-0801-4549-8501-30419b1f0e4a',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Fchristina-deravedisian-EnEo2JM0juM-unsplash.jpeg?alt=media&token=4ca6c49b-266a-4884-a9c0-115c31b56429',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Fhasan-almasi-BIrL2bdlMa4-unsplash.jpeg?alt=media&token=e9cb978a-3f5c-4af2-989c-a3ecc052e4ce',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-1094567188.jpeg?alt=media&token=7fbdeefb-575a-4f5c-ba6b-9edd399058dc',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-1125637203.jpeg?alt=media&token=1ccb15db-56e5-452b-a20e-1ce6c21cd80c',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-1209104133.jpeg?alt=media&token=b5fba0b7-f33b-4a65-bb0e-e25a2158af48',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-1224321215.jpeg?alt=media&token=53ee7bd8-cd52-4ea4-9967-55581142ab4c',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-1253848832.jpeg?alt=media&token=8df3054a-fc3a-4724-a881-35f263dce32e',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-1287307447.jpeg?alt=media&token=9760b4a1-a2b2-40a7-bc38-01e19d6ddf55',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-526494097.jpeg?alt=media&token=4777898d-acd9-4540-8ee0-f06d2ea375a9',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-637929294.jpeg?alt=media&token=d6b98bf2-208a-48b4-a1c7-26a184b4b956',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-897108146.jpeg?alt=media&token=5fbef384-ea31-482f-b292-6b837335ff45',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2FiStock-961294088.jpeg?alt=media&token=e4c30fc5-c784-4f9f-b5e0-5e337aa90d62',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Fjarrod-reed-rjIDhjdKCCI-unsplash.jpeg?alt=media&token=fbe6a53f-856d-48de-b9a0-551a226d2dcd',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Fjocelyn-morales-th0b5nMt2MY-unsplash.jpeg?alt=media&token=fe96c63f-e5e3-4bf6-b93a-5d20acaf4ab0',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Fmichael-behrens-X6wp3u7dQUs-unsplash.jpeg?alt=media&token=d9fe9068-e31d-4955-8be0-714726b2cc07',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Froozbeh-eslami-O_sZqq6JD9k-unsplash.jpeg?alt=media&token=36238e03-67bf-4db0-ba73-b1c0a7711342',
    // 'https://firebasestorage.googleapis.com/v0/b/minning-f44b2.appspot.com/o/Fallback%2Fsigurdur-fjalar-jonsson-y2UrTPXoRgE-unsplash.jpeg?alt=media&token=503f4f42-1ffb-4952-8a33-71042cc80dbd',
]

export const Image = ({
    src,
    centerFace = false,
    layout = false,
    id,
    className,
    height,
    width,
    lazy = false,
    srcSet,
    ...props
}: Props) => {
    storage
    if (!src) {
        src = FallbackUrls[0]
    }

    let bool = src?.match(process.env.NEXT_PUBLIC_FB_STORAGE_URL)
    let gix = process.env.NEXT_PUBLIC_IMGKIT_URL + '/tr:'

    let wid = width as number

    let base = gix
    let base15x = gix
    let base2x = gix
    let base3x = gix
    let first = base

    if (centerFace) {
        console.log(height, wid)

        if (!height || !wid) {
            height = 306
            wid = 306
        }
    } else {
        if (!height) {
            height = 630
        }
    }

    base += 'h-' + height + (wid ? `,w-${wid}` : '')
    base15x += 'h-' + height * 1.5 + (wid ? `,w-${wid * 1.5}` : '')
    base2x += 'h-' + height * 2 + (wid ? `,w-${wid * 2}` : '')
    base3x += 'h-' + height * 3 + (wid ? `,w-${wid * 3}` : '')

    if (centerFace) {
        base += ',fo-face'
        base15x += ',fo-face'
        base2x += ',fo-face'
        base3x += ',fo-face'
    }

    const replacement = decodeURIComponent(
        src.replace(process.env.NEXT_PUBLIC_FB_STORAGE_URL, '').split('?')[0]
    )
    first += replacement
    base += replacement
    base15x += replacement
    base2x += replacement
    base3x += replacement

    return (
        <motion.img
            layout={layout}
            // src={bool ? base : src}
            style={{ backgroundColor: '#fafafa' }}
            loading={lazy ? 'lazy' : 'eager'}
            src={first}
            srcSet={
                srcSet
                    ? srcSet
                    : bool
                    ? base +
                      ' 1x, ' +
                      base15x +
                      ' 1.5x, ' +
                      base2x +
                      ' 2x, ' +
                      base3x +
                      ' 3x'
                    : src
            }
            // style={{ imageRendering: '-webkit-optimize-contrast' }}
            id={id}
            className={className}
            {...props}
            alt="no image"
        />
    )
}
