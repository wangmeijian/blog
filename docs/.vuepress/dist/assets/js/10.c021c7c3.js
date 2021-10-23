(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{383:function(o,e,t){"use strict";t.r(e);var i=t(46),_=Object(i.a)({},(function(){var o=this,e=o.$createElement,t=o._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[t("h1",{attrs:{id:"设置cookie属性防止csrf攻击"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置cookie属性防止csrf攻击"}},[o._v("#")]),o._v(" 设置Cookie属性防止CSRF攻击")]),o._v(" "),t("p",[o._v("互联网上很多数据不能公开访问，比如银行账户。要访问自己的银行账户，就需要账户密码，由于HTTP是无状态的，一次HTTP请求登录后，下次再向服务器请求数据，服务器不知道你是谁，上一次的登录状态没有被保存。为了解决认证持久化问题，发明了cookie。")]),o._v(" "),t("p",[o._v("举例：客户端登录银行账户后，服务器设置cookie到浏览器，在cookie过期之前，这个客户端向服务器发起的HTTP请求都会带上cookie，不管请求是在银行的站点发起的，还是在别的站点发起的，由于cookie是对的，银行服务器都会执行对应的操作。")]),o._v(" "),t("h2",{attrs:{id:"csrf"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#csrf"}},[o._v("#")]),o._v(" CSRF")]),o._v(" "),t("p",[o._v("如果用户刚刚登陆过银行账户，又访问了恶意网站，恶意网站修改了银行账户转账请求的部分参数，然后发起HTTP请求，服务器收到了正确的cookie，执行了转账操作，这就是跨站请求攻击。跨站请求攻击，简称为CSRF。")]),o._v(" "),t("blockquote",[t("p",[o._v("跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。\n—— 维基百科")])]),o._v(" "),t("p",[o._v("CSRF的防御，可以增加token或者检查Referer。")]),o._v(" "),t("h2",{attrs:{id:"samesite"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#samesite"}},[o._v("#")]),o._v(" SameSite")]),o._v(" "),t("p",[o._v("CSRF的根本原因是：cookie在不该发送的时候发送出去了。为了解决这个问题，cookie增加了SameSite属性。它有三个值：")]),o._v(" "),t("blockquote",[t("p",[o._v("Set-Cookie: promo_shown=1; SameSite=Strict"),t("br"),o._v("\nSet-Cookie: promo_shown=1; SameSite=Lax"),t("br"),o._v("\nSet-Cookie: promo_shown=1; SameSite=None")])]),o._v(" "),t("ul",[t("li",[t("p",[t("strong",[o._v("Strict 跨站时，不发送cookie")]),o._v("。就上面的例子来说，只有在Cookie的站点与浏览器URL栏中当前显示的站点匹配时，才会带上cookie。这有个问题，我们写博客经常会贴上Github链接，点击跳转后带上cookie会自动登录。如果SameSite设置为Strict，跳转到GitHub就不会自动登录。")])]),o._v(" "),t("li",[t("p",[o._v("Lax 默认值，"),t("strong",[o._v("部分跨站请求会发送cookie")]),o._v("。只有这些标签发出的跨站请求会发送cookie "),t("code",[o._v("<a>")]),o._v("、"),t("code",[o._v('<link rel="prerender">')]),o._v("、"),t("code",[o._v('<form method="get">')]),o._v("，它很大程度上避免了CSRF攻击")])]),o._v(" "),t("li",[t("p",[o._v("None "),t("strong",[o._v("无论是否跨站都发送cookie")]),o._v("。这跟SameSite出现之前默认行为一致")])])]),o._v(" "),t("p",[o._v("从chrome 80起")]),o._v(" "),t("blockquote",[t("p",[o._v("Set-Cookie: promo_shown=1;")])]),o._v(" "),t("p",[o._v("等同于")]),o._v(" "),t("blockquote",[t("p",[o._v("Set-Cookie: promo_shown=1; SameSite=Lax")])])])}),[],!1,null,null,null);e.default=_.exports}}]);