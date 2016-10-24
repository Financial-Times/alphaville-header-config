"use strict";

const _ = require('lodash');
const alphavilleTeamMembers = require('alphaville-team-members');

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
			url: "/uc_longroom"
		},
		{
			name: "Alphachat",
			url: "/alphachat"
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
			url: "/uc_longroom"
		}
	],
	meganavSections: [
		{
			title: "Top sections",
			meganavSectionItems: [
				{
					name: "FT.com",
					url: "http://www.ft.com"
				},
				{
					name: "Home",
					url: "/",
					expandable: true,
					id: 'the_blog',
					items: [
						{
							name: "Meet the Team",
							url: "/meet-the-team"
						},
						{
							name: "About FTAV",
							url: "/about"
						}
					]
				},
				{
					name: "Markets Live",
					url: "/marketslive",
					expandable: true,
					lozenge: true,
					items: [
						{
							name: "About Markets Live",
							url: "/marketslive/about"
						}
					]
				},
				{
					name: "Long Room",
					url: "/uc_longroom"
				},
				{
					name: "Alphachat",
					url: "/alphachat"
				}
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
			url: "http://registration.ft.com/registration/subscription-service/bpsp?segid=70152",
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
	alphavilleTeamMembers.getMemberNames().then((teamMemberNames) => {
		if (teamMemberNames && teamMemberNames.length) {
			cachedNavItems = _.cloneDeep(defaultNavItems);

			teamMemberNames.forEach((tm) => {
				cachedNavItems.meganavSections[0].meganavSectionItems[1].items.push({
					name: tm.name,
					url: `/author?q=${encodeURIComponent(tm.name)}`
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

			if (navItems && navItems.meganavSections) {
				navItems.meganavSections.forEach((section) => {
					if (section.meganavSectionItems) {
						section.meganavSectionItems.map((obj) => {
							if (obj.name.indexOf(navSelected) > -1) {
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
