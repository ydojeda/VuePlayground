interface NavBarItemDataInterface {
  pathId: string
  name: string
  icon_code: string
}

export const NavBarItemData: NavBarItemDataInterface[] = [
  {
    pathId: '/',
    name: 'Shop List',
    icon_code: 'store'
  },
  {
    pathId: '/blogpost',
    name: 'To do',
    icon_code: 'list-check'
  }
]
