// React&NextJS
import React from 'react'
import Head from 'next/head'
// Data
import defaults from './defaults.json'

type IProps = {
    title?: string
    type: string
    seoTitle: string
    image: string
    url: string
    description: string
    children?: React.ReactNode
    systemTheme?: string
    keywords?: string
}

const Meta = ({
    title,
    seoTitle,
    type,
    image,
    url,
    description,
    keywords,
    children,
    systemTheme,
}: IProps) => {
    const usedSeoTitle = seoTitle || title
    return (
        <Head>
            {systemTheme !== 'dark' && (
                <>
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicons/favicon-32x32.png?v=M4KN2GElyG"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicons/favicon-16x16.png?v=M4KN2GElyG"
                    />
                    <link
                        rel="shortcut icon"
                        href="/favicons/favicon.ico?v=M4KN2GElyG"
                    />
                </>
            )}
            {systemTheme === 'dark' && (
                <>
                    <link
                        rel="icon"
                        type="image/svg"
                        sizes="32x32"
                        href="/favicons/minnin"
                    />
                    <link
                        rel="icon"
                        type="image/svg"
                        sizes="16x16"
                        href="/favicons/favicon-dark-16x16.png?v=M4KN2GElyG"
                    />
                    <link
                        rel="shortcut icon"
                        href="/favicons/favicon-dark.ico?v=M4KN2GElyG"
                    />
                </>
            )}
            <title>{seoTitle}</title>
            {/* <link rel="icon" href="/favicon.ico" key="favicon" /> */}

            <meta name="description" content={description} key="desc" />
            <meta name="type" content={type} key="type" />
            <meta name="url" content={url} key="url" />
            <meta name="keywords" content={keywords || ''} />

            {/* Open Graph */}
            {/* <meta property="og:title" content={usedSeoTitle} />
            <meta property="og:image" content={image || defaults.image} />
            <meta
                property="og:description"
                content="Description that will show in the preview"
            />
            <meta property="og:url" content="minningar.is" /> */}
            <meta
                property="og:title"
                content={seoTitle}
                // key="og:title"
            />
            <meta
                property="og:type"
                content={type}
                // key="og:type"
            />
            <meta
                property="og:description"
                content={description || defaults.description}
                // key="og:desc"
            />
            <meta
                property="og:url"
                content={url}
                // key="og:url"
            />
            {/* <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                // key="viewport"
            /> */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
            />
            <meta charSet="UTF-8" />
            <meta
                property="og:locale"
                content={defaults.locale}
                // key="og:locale"
            />

            <meta
                prefix="go: http://ogp.me/ns#"
                property="og:image"
                content={image || defaults.image}
                key="image"
            />
            <meta
                prefix="go: http://ogp.me/ns#"
                property="og:image:url"
                content={image}
                key="image:url"
            />
            <meta
                prefix="go: http://ogp.me/ns#"
                property="og:image:secure"
                content={image}
                key="image:secure"
            />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={usedSeoTitle} key="twtitle" />
            <meta
                name="twitter:description"
                content={description || defaults.description}
                key="twdescription"
            />
            <meta
                name="twitter:url"
                content={url || defaults.url}
                key="twurl"
            />
            <meta
                property="twitter:type"
                content={type || defaults.type}
                key="twitter:type"
            />
            <meta
                name="twitter:image"
                content={image || defaults.image}
                key="twimage"
            />
            <meta property="twitter:image:width" content="1024" />
            <meta property="twitter:image:height" content="512" />

            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
                key="apple-touch-icon"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
                key="apple-touch-icon"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
                key="favicon-32"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
                key="favicon-16"
            />
            {/* <link rel="manifest" href="/site.webmanifest" key="manifest" /> */}
            <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#004aa0"
                key="mask-icon"
            />
            <meta
                name="msapplication-TileColor"
                content="#004aa0"
                key="msapplication-TileColor"
            />
            <meta name="theme-color" content="#004aa0" key="theme-color" />
            <meta property="fb:app_id" content="396537331839985" />
            {children}
        </Head>
    )
}

export default Meta
