import type{ NavItems } from './types'

export const NAV_ITEMS: NavItems = {
    home: {
        path: '/brag/',
        title: 'home'
    },
    blog: {
        path: '/brag/daily',
        title: 'daily'
    },
    tags: {
        path: '/brag/tags',
        title: 'tags'
    },
    media: {
        path: '/brag/media',
        title: 'media'
    },
    about: {
        path: '/brag/about',
        title: 'about'
    }
}

export const SITE = {
    name: 'William Boullé',
    title: 'WB\'s brag',
    description: 'For dailies and annual work reviews',
    url: 'https://astro-ink.vercel.app',
    githubUrl: 'https://github.com/one-aalam/astro-ink',
    listDrafts: true,
    image: 'https://raw.githubusercontent.com/one-aalam/astro-ink/main/public/astro-banner.png',
    // YT video channel Id (used in media.astro)
    ytChannelId: '',
    // Optional, user/author settings (example)
    // Author: name
    author: 'W. Boullé', // Example: Fred K. Schott
    // Author: Twitter handler
    authorTwitter: 'williamboulle', // Example: FredKSchott
    // Author: Image external source
    authorImage: '/brag/assets/wb-alpha.webp', // Example: https://pbs.twimg.com/profile_images/1272979356529221632/sxvncugt_400x400.jpg
}

// Ink - Theme configuration
export const PAGE_SIZE = 8
export const USE_POST_IMG_OVERLAY = false
