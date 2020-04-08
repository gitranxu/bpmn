export default {
    children: [

    ],
    siblings: [
        {
            path: "/test",
            component: resolve => require(["pages/test"], resolve),
            meta: { auth: true },
        },
        {
            path: "/viewer",
            component: resolve => require(["pages/viewer"], resolve),
            meta: { auth: true },
        },
    ],
};