export default [
    {
        exact: true,
        path: "/",
        name: "主页",
        component: "@/pages/index"
    },
    {
        name: "父组件",
        path: "/parent",
        routes: [
            {
                path: "/parent/c1",
                name: "子组件",
            },
        ]
    },
    
    {
        exact: true,
        path: "/login",
        component: "@/pages/login"
    }
]