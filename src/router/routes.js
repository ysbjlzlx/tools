const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../layouts/OldLayout"),
    children: [
      {
        path: "/",
        name: "Index",
        component: () => import("../pages/Index.vue")
      },
      {
        path: "/hash",
        name: "Hash",
        component: () => import("../pages/Hash.vue")
      },
      {
        path: "/color",
        name: "Color",
        component: () => import("../pages/Color.vue")
      },
      {
        path: "/json",
        name: "Json",
        component: () => import("../pages/Json.vue")
      },
      {
        path: "/datetime",
        name: "Datetime",
        component: () => import("../pages/Datetime.vue")
      },
      {
        path: "/encode/base64",
        name: "Base64",
        component: () => import("../pages/encode/Base64.vue")
      },
      {
        path: "/encode/urlencode",
        name: "URLEncode",
        component: () => import("../pages/encode/URLEncode.vue")
      },
      {
        path: "/image/placeholder",
        name: "ImagePlaceholder",
        component: () => import("../pages/image/Placeholder.vue")
      },
      {
        path: "/image/qrcode",
        name: "ImageQRCode",
        component: () => import("../pages/image/QRCode.vue")
      },
      {
        path: "/transform/json2yaml",
        name: "Json2yaml",
        component: () => import("../pages/transform/Json2yaml.vue")
      },
      {
        path: "/password/make",
        name: "PasswordMake",
        component: () => import("../pages/password/make.vue")
      },
      {
        path: "/password/otp",
        name: "PasswordOtp",
        component: () => import("../pages/Otp.vue")
      }
    ]
  },

  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
