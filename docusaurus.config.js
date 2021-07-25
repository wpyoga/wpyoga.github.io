/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "William's GitHub Pages",
  tagline: "Docusaurus' 5-minute tutorial is a LIE",
  url: 'https://wpyoga.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wpyoga',
  projectName: 'wpyoga.github.io',
  deploymentBranch: 'gh-pages',
  themeConfig: {
    navbar: {
      title: "William's GitHub Pages site",
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Tutorial',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: 'https://wpyoga.github.io/boto3-docs-reformat/html', label: 'Boto3 Docs', position: 'left' },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Social Media',
          items: [
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/william.poetra.yoga',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/williampoetra',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/user/wpyh',
            },
          ],
        },
        {
          title: 'Favourite Sites',
          items: [
            {
              label: 'YouTube',
              href: 'https://www.youtube.com',
            },
          ],
        },
        {
          title: 'My Websites',
          items: [
            {
              label: 'IP Address Check',
              href: 'https://ipaddr.my.id',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'My Old Blog',
              href: 'https://wpyoga.blogspot.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wpyoga/wpyoga.github.io',
            },
          ],
        },
      ],
      copyright: `Copyright © 2021 William Poetra Yoga / gmail: william dot poetra / gmail: wpyoga86`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/wpyoga/wpyoga.github.io/edit/master',
        },
        blog: {
          blogTitle: "William's Blog",
          blogDescription: 'Mostly tech, but just about anything at all',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All posts',
          showReadingTime: false,
          editUrl: 'https://github.com/wpyoga/wpyoga.github.io/edit/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
