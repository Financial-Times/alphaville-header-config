"use strict";

const _ = require('lodash');
const alphavilleTeamMembers = require('alphaville-team-members');

const esServiceUrl = 'http://' + process.env['AV_ES_SERVICE_URL'] + '/v1';
const qs = require('querystring');
const fetch = require('node-fetch');

const getAvEsServiceContent = (url) => {
	return fetch(url, {headers: {'X-API-KEY': process.env['AV_ES_SERVICE_KEY']}})
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
	});
};

const getPopularTopic = (options) => {
	options = options || {};
	let url = `${esServiceUrl}/popular-topic?${qs.stringify(_.omit(options, ['noCache']))}`;
	if (options && options.noCache === true) {
		url += '&_=' + new Date().getTime();
	}
	return getAvEsServiceContent(url);
};


const defaultNavItems = {
	navItems: [
		{
			name: "Home",
			url: "/"
		},
		{
			name: "Markets Live",
			url: "/marketslive",
			lozenge: true
		},
		{
			name: "Long Room",
			url: "/longroom/home"
		},
		{
			name: "Alphachat",
			url: "/series/Alphachat"
		}
	],
	mobileNavItems: [
		{
			name: "Home",
			url: "/"
		},
		{
			name: "Markets Live",
			url: "/marketslive",
			lozenge: true
		},
		{
			name: "Long Room",
			url: "/longroom/home"
		}
	],
	meganavSections: [
		{
			meganavSectionItems: [
				{
					name: "Back to FT.com",
					url: "http://www.ft.com"
				}
			]
		},
		{
			title: "Top sections",
			meganavSectionItems: [
				{
					name: "FTAV Home",
					url: "/",
					id: 'the_blog',
				},
				{
					name: "Markets Live",
					url: "/marketslive",
				},
				{
					name: "Long Room",
					url: "/longroom/home"
				},
				{
					name: "Alphachat",
					url: "/series/Alphachat"
				},
				{
					name: "Meet the Team",
					url: "/meet-the-team"
				},
				{
					name: "About FTAV",
					url: "/about"
				},
				{
					name: "About Markets Live",
					url: "/marketslive/about"
				},
				{
					name: "RSS service",
					url: "http://ftalphaville.ft.com/rss-feed/",
					attributes : " target=\"_blank\""
				},
				{
					name: "Get in touch",
					url: "mailto:alphaville@ft.com"
				}
			]
		},
		{
			title: "Filter by ...",
			meganavSectionItems: [
				{
					name: "Most popular",
					url: "/most-popular"
				},
				{
					name: "Most commented",
					url: "/most-commented"
				}
			]
		},
		{
			title: "Filter by topic",
			meganavSectionItems: [
			]
		},
		{
			title: "Filter by author",
			meganavSectionItems: [
			]
		}
	],
	userNav: [
		{
			name: "Sign In",
			url: "https://accounts.ft.com/login",
			liClass: "alphaville-logged-in-hidden",
			attributes: "data-alphaville-url-referrer=\"location\" data-alphaville-url-referrer-value=\"current_location\""
		},
		{
			name: "Subscribe",
			url: "https://www.ft.com/products?segID=70703&segmentID=190b4443-dc03-bd53-e79b-b4b6fbd04e64",
			liClass: "alphaville-logged-in-hidden",
			button: true
		},
		{
			name: "Sign out",
			url: "https://accounts.ft.com/logout",
			liClass: "alphaville-logged-out-hidden",
			attributes: "data-alphaville-url-referrer=\"location\" data-alphaville-url-referrer-value=\"home_location\""
		},
		{
			name: "My Account",
			url: "https://registration.ft.com/registration/selfcare/",
			liClass: "alphaville-logged-out-hidden"
		}
	]
};

let cachedNavItems = _.cloneDeep(defaultNavItems);
let navCachedBySelected = [];



function initCache () {

	getPopularTopic().then(topics => {
		if (topics) {
			const topicItems = [];
			topics.forEach(item => {
				topicItems.push({
					name: decodeURIComponent(item.pathname.replace('/topic/', '')),
					url: item.pathname
				})
			});
			defaultNavItems.meganavSections[3].meganavSectionItems = topicItems
		}
	}).catch(e => {
		console.log("header-config", "Error fetching popular topics", e);
		setTimeout(initCache, 10000);
	});

	alphavilleTeamMembers.getMemberNames().then((teamMemberNames) => {
		if (teamMemberNames && teamMemberNames.length) {
			cachedNavItems = _.cloneDeep(defaultNavItems);

			teamMemberNames.forEach((tm) => {
				cachedNavItems.meganavSections[4].meganavSectionItems.push({
					name: tm.name,
					url: `/author/${encodeURIComponent(tm.name)}`
				});
			});

			navCachedBySelected = [];
		} else {
			setTimeout(initCache, 10000);
		}
	}).catch((e) => {
		console.log("header-config", "Error fetching team members", e);
		setTimeout(initCache, 10000);
	});
}
initCache();


exports.get = function (navSelected) {
	if (navSelected) {
		if (navCachedBySelected[navSelected]) {
			return navCachedBySelected[navSelected];
		} else {
			const navItems = _.cloneDeep(cachedNavItems);

			if (navItems && navItems.navItems) {
				navItems.navItems.map((obj) => {
					if (obj.name.indexOf(navSelected) > -1) {
						obj.selected = true;
					}
					return obj;
				});
			}

			if (navItems && navItems.mobileNavItems) {
				navItems.mobileNavItems.map((obj) => {
					if (obj.name.indexOf(navSelected) > -1) {
						obj.selected = true;
					}
					return obj;
				});
			}

			if (navItems && navItems.meganavSections) {
				navItems.meganavSections.forEach((section) => {
					if (section.meganavSectionItems) {
						section.meganavSectionItems.map((obj) => {
							if (obj.name.indexOf(navSelected) === 0) {
								obj.selected = true;
							}
							return obj;
						});
					}
				});
			}

			navCachedBySelected[navSelected] = navItems;

			return navItems;
		}
	} else {
		return cachedNavItems;
	}
};
