// React&NextJS
import { useEffect } from 'react'
import { Router } from 'next/router'
// 3rd party libraries
import { useAnimation } from 'framer-motion'

const UsePageTransition = () => {
    const controls = useAnimation()

    useEffect(() => {
        controls.start('mount')

        const handler = () => {
            controls.start('unmount')
        }
        Router.events.on('routeChangeStart', handler)

        return () => {
            Router.events.off('routeChangeStart', handler)
        }
    }, [])

    return { controls: controls }
}

export default UsePageTransition
