import { ToastCustom } from "./Message";

/**
 * Level Secutity: 
 * Public: 5
 * Private: [4, 3, 2, 1]
 */
const Menu = [
    {
        id: 1,
        title: " Home",
        option: "open_home",
        url: "/home",
        className: "nav-links",
        icon: "fa-solid fa-house-user nav-icon-i",
        security_level: {
            public: true,
            private: [0, 0, 0, 0, 0]
        }
    },
    {
        id: 2,
        title: " About We",
        option: "open_aboutwe",
        url: "/aboutwe",
        className: "nav-links",
        icon: "fa-solid fa-circle-info nav-icon-i",
        security_level: {
            public: true,
            private: [0, 0, 0, 0, 0]
        }
    },
    {
        id: 3,
        title: " Services",
        option: "open_service",
        url: "/services",
        className: "nav-links",
        icon: "fa-solid fa-briefcase nav-icon-i",
        security_level: {
            public: true,
            private: [0, 0, 0, 0, 0]
        }
    },
    {
        id: 4,
        title: " Contact",
        option: "open_contact",
        url: "/contact",
        className: "nav-links",
        icon: "fa-solid fa-address-book nav-icon-i",
        security_level: {
            public: true,
            private: [0, 0, 0, 0, 0]
        }
    },
    {
        id: 5,
        title: " Education",
        option: "open_terms",
        url: "/terms",
        className: "nav-links",
        icon: "fa-solid fa-graduation-cap nav-icon-i",
        security_level: {
            public: true,
            private: [0, 0, 0, 0, 0]
        }
    },
    {
        id: 7,
        title: " Users",
        option: "open_users",
        url: "/users",
        className: "nav-links",
        icon: "fa-solid fa-users nav-icon-i",
        security_level: {
            public: false,
            private: [5, 0, 0, 0, 0]
        }
    },
    {
        id: 8,
        title: "Skills",
        option: "skills",
        url: "/skills",
        className: "nav-links",
        icon: "fa-solid fa-bars-progress nav-icon-i",
        security_level: {
            public: true,
            private: [0, 0, 0, 0, 0]
        }
    },
    {
        id: 6,
        title: " Sign In",
        option: "open_login",
        url: "/",
        className: "nav-links-movile nav-icon-i",
        icon: "fa-solid fa-user",
        security_level: {
            public: true,
            private: [0, 0, 0, 0, 0]
        }
    }
]

const items_user = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                ToastCustom('success','Updated','Data Updated');
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                ToastCustom('success','Updated','Data Updated');
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                ToastCustom('success','Updated','Data Updated');
            }
        },
        {   label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                ToastCustom('success','Updated','Data Updated');
            }
        }
    ];

export  {
    Menu,
    items_user
}