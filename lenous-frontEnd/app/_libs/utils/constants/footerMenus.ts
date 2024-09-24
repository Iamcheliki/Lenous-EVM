// menuConstants.ts
interface SubMenu {
  title: string;
  link: string;
  iconName?: string;
}

interface MenuItem {
  title: string;
  submenu: SubMenu[];
}

export const menuItems: MenuItem[] = [
  {
    title: 'PRODUCTS',
    submenu: [
      { title: 'dApp', link: '/' },
      { title: 'Wallet', link: '#' },
      { title: 'Portfolio', link: '#' },
      { title: 'Swap Protocol', link: '#' },
      { title: 'Liquidity Protocol', link: '#' },
      { title: 'Lenous Protocol', link: '#' },
    ],
  },
  {
    title: 'GOVERNANCE',
    submenu: [
      { title: 'Proposals', link: '#' },
      { title: 'DAO', link: '#' },
      { title: 'Forum', link: '#' },
    ],
  },
  {
    title: 'DEVELOPMENT',
    submenu: [
      { title: 'Audit', link: '#' },
      { title: 'Github', link: '#' },
      { title: 'Bug Boinity', link: '#' },
      { title: 'Docs', link: '#' },
    ],
  },
  {
    title: 'ABOUT',
    submenu: [
      { title: 'Security', link: '#' },
      { title: 'Foundation', link: '#' },
      { title: 'Stakeholders', link: '#' },
    ],
  },
  {
    title: 'SUPPORT',
    submenu: [
      { title: 'Contact us', link: '#',},
      { title: 'Help Center', link: '#', },
      { title: 'Privacy Policies', link: '#', },
    ],
  },
];
