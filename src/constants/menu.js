import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart,Settings,Archive, LogIn
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Warehouse', icon: Box, type: 'sub', active: false, children: [
            {
                title: 'Physical', type: 'sub', active: false, children: [
                    { path: '/products/physical/product-list', title: 'Product List', type: 'link' },
                    { path: '/products/physical/add-product', title: 'Add Product', type: 'link' },
                ]
            }
        ]
    },
    {
        title: 'Sales', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', title: 'Orders', type: 'link' },
            { path: '/sales/transactions', title: 'Transactions', type: 'link' },
        ]
    },
    // {
    //     title: 'Users', icon: UserPlus, type: 'sub', active: false, children: [
    //         { path: '/users/list-user', title: 'User List', type: 'link' },
    //         { path: '/users/create-user', title: 'Create User', type: 'link' },
    //     ]
    // },
    {
        title: 'Settings', icon: Settings, type: 'sub', children: [
            { path: '/settings/profile', title: 'Profile', type: 'link' },
        ]
    },
    // {
    //     title: 'Invoice',path:'/invoice', icon: Archive, type: 'link', active: false
    // },
    {
        title: 'Login',path:'/auth/login', icon: LogIn, type: 'link', active: false
    }
]
