import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Heading from '@theme/Heading'
import clsx from 'clsx'

const FeatureList = [
    {
        title: 'Lightweight Micro-Framework',
        description: (
            <>
                Twiggle is a micro-framework that gives you the flexibility to build your
                application your way. It's not a full-blown framework like Angular, so you have more
                control over your code.
            </>
        ),
    },
    {
        title: 'Reactive State Management',
        description: (
            <>
                Twiggle's reactivity model is simple and efficient. Use the `createState` function
                to create reactive state that automatically updates your UI when it changes.
            </>
        ),
    },
    {
        title: 'Server-Side Rendering',
        description: (
            <>
                Improve performance and SEO with Twiggle's built-in server-side rendering. Render
                your components to HTML on the server and send them to the client for faster initial
                page loads.
            </>
        ),
    },
]

function Feature({ title, description }) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    )
}

function HomepageFeatures() {
    return (
        <section style={{ padding: '2rem 0' }}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature
                            key={idx}
                            {...props}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default function Home() {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout>
            <header className={clsx('hero hero--primary')}>
                <div className="container">
                    <Heading
                        as="h1"
                        className="hero__title"
                    >
                        {siteConfig.title}
                    </Heading>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className="buttons">
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/intro"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    )
}
