import React from "react";

export default [
	{
		path : '/signin',
		component : React.lazy(() => import('../views/Signin'))
	},
	{
		path : '/test',
		component : React.lazy(() => import('../views/Test'))
	},
	{
		path : '/home',
		component : React.lazy(() => import('../views/Home'))
	},
	{
		path : "/status/:id",
		component : React.lazy(() => import('../views/StatusDetail'))
	},
	{
		path : "/status",
		component : React.lazy(() => import('../views/Status'))
	},
	{
		path : "/profil",
		component : React.lazy(() => import('../views/Profil'))
	},
	{
		path : "/maintaince",
		component : React.lazy(() => import('../views/Maintaince'))
	},
	{
		path : '/',
		component : React.lazy(() => import('../views/Signin'))
	}
];